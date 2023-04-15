import { Helios, xnet } from "../../src/helios.js";
import { getGPUTier } from 'detect-gpu';

// import {Helios,xnet} from "https://cdn.skypack.dev/helios-web?min";
import * as d3Chromatic from "d3-scale-chromatic"
import { scaleLinear as d3ScaleLinear, scaleOrdinal as d3ScaleOrdinal, scaleSequential as d3ScaleSequential, scaleDiverging as d3ScaleDiverging } from "d3-scale"
import { select as d3Select, selectAll as d3SelectAll } from "d3-selection"
import { rgb as d3rgb, hsl as d3hsl } from "d3-color"
import { default as extraColors } from "./extraColors"
import { default as autocomplete } from "./library/auto-complete_cache-control.js"
import { default as jsonQuery } from "json-query"
import { default as d3Legend } from "./library/d3_legends.js"
import { default as HeliosUI } from "./library/HeliosUI.js"

import { default as pako } from "pako"


let allColors = {}
Object.assign(allColors, d3Chromatic);
Object.assign(allColors, extraColors);
console.log(extraColors);
//sort colors by name
allColors = Object.keys(allColors).sort().reduce((r, k) => (r[k] = allColors[k], r), {});

// allColors["interpolateRedBlackBlue"] = d3ScaleLinear().domain([0,0.5,1.0]).range(["red","black", "blue"])
let ignoredProperties = new Set(["ID", "edges", "neighbors"]);



function throttle(cb, delay = 250) {
	let shouldWait = false

	return (...args) => {
		if (shouldWait) return

		cb(...args)
		shouldWait = true
		setTimeout(() => {
			shouldWait = false
		}, delay)
	}
}

let nodesOnScreen = [];
let categoriesOnScreen = [];


function throttleLast(func, wait, scope) {
	let timer = null;
	return function () {
		if (timer) clearTimeout(timer);
		let args = arguments;
		timer = setTimeout(function () {
			timer = null;
			func.apply(scope, args);
		}, wait);
	};
};

/*
 * Some auxiliary functions
*/
function sortByCount(anArray) {
	let map = anArray.reduce((p, c) => {
		p.set(c, (p.get(c) || 0) + 1);
		return p;
	}, new Map());

	let newArray = Array.from(map.keys()).sort((a, b) => map.get(b) - map.get(a));
	return newArray;
}

function downloadText(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}

function wrapText() {
	let width = 300;
	let padding = 10
	let self = d3Select(this),
		textLength = self.node().getComputedTextLength(),
		text = self.text();
	while (textLength > (width - 2 * padding) && text.length > 0) {
		text = text.slice(0, -1);
		self.text(text + '...');
		textLength = self.node().getComputedTextLength();
	}
}


/*
 * Reading all parameters from the URL
*/

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const startSettings = {};

startSettings.networkName = "WS_10000_10_001"
if (urlParams.has("network")) {
	startSettings.networkName = urlParams.get("network");
}

startSettings.use2D = false;
if (urlParams.has("use2d")) {
	startSettings.use2D = true;
}

if (urlParams.has("2d")) {
	startSettings.use2D = true;
}

startSettings.searchEnabled = true;
if (urlParams.has("nosearch")) {
	startSettings.searchEnabled = false;
}

startSettings.legendsEnabled = true;
if (urlParams.has("nolegends")) {
	startSettings.legendsEnabled = false;
}


startSettings.hyperbolic = false;
if (urlParams.has("hyperbolic")) {
	startSettings.hyperbolic = true;
}

startSettings.shaded = false;
if (urlParams.has("shaded")) {
	startSettings.shaded = true;
}

startSettings.advancedEdges = false;
if (urlParams.has("advanced")) {
	startSettings.advancedEdges = true;
}


startSettings.definedSize = null;
if (urlParams.has("size")) {
	startSettings.definedSize = +urlParams.get("size");
}


startSettings.definedOpacity = null;
if (urlParams.has("opacity")) {
	startSettings.definedOpacity = +urlParams.get("opacity");
}



startSettings.startZoomLevel = null;
if (urlParams.has("zoom")) {
	startSettings.startZoomLevel = +urlParams.get("zoom");
}

startSettings.autoStartLayout = null;
if (urlParams.has("layout")) {
	startSettings.autoStartLayout = ((+urlParams.get("layout")) != 0) ? true : false;
}

startSettings.darkBackground = false;
startSettings.backgroundColor = [1.0, 1.0, 1.0, 1.0]

if (urlParams.has("dark")) {
	startSettings.darkBackground = true;
	startSettings.backgroundColor = [0.0, 0.0, 0.0, 1.0]
}

startSettings.densityEnabled = false;
if (urlParams.has("density")) {
	startSettings.densityEnabled = true;
}

startSettings.additiveBlending = false;
if (urlParams.has("additive") && startSettings.darkBackground) {
	startSettings.additiveBlending = true;
}

startSettings.colorProperty = "index";
if (urlParams.has("colorProperty")) {
	startSettings.colorProperty = urlParams.get("colorProperty");
}


startSettings.densityProperty = "Uniform";
if (urlParams.has("densityProperty")) {
	startSettings.densityProperty = urlParams.get("densityProperty");
}


let visualizeNetwork = (networkName, settings = startSettings) => {
	xnet.loadXNETFile("networks/" + networkName + ".xnet").then(async network => {
		window.network = network;
		/*
		 * Defining default and initial parameters
		*/

		// Initial property used for coloring
		let colorProperty = startSettings.colorProperty;

		// Default visual properties
		let defaultNodeScale = 1.0;
		let defaultNodeOpacity = 1.0;
		let defaultOutlineColor = settings.backgroundColor;
		let defaultOutlineWidthFactor = 0.5;

		let updateNodeSize = node => node._originalSize;

		// shaded mode does not require any outline
		if (settings.shaded) {
			defaultOutlineWidthFactor = 0.0;
		}

		// Zoom level for the whole network
		let defaultZoomLevel = 0.75;
		let defaultZoomLevelBigNetworks = 0.35;

		// Zoom level for centered nodes
		let minCenteredNodeZoomLevel = 4.0;

		// Default node size and Edge Ooacity
		let currentGlobalNodeSizeScale = 1.0;
		let currentGlobalEdgeOpacityScale = 1.0;
		let currentBandwidth = 28.1;//35.0;
		let currentDensityWeight = 398.1071705534973;//2000.0;
		let chosenDensityProperty = startSettings.densityProperty;
		let densityDiverging = true;

		// Scale and Opacity of Highlighted nodes
		let highlightNodeScale = 1.5;
		let highlightNodeOpacityScale = 1e10;// as opaque as possible

		// Scale and Opacity of selected nodes
		let selectedNodeScale = 3.0;
		let selectedNodeOpacityScale = 1e10; // as opaque as possible
		let selectedOutlineColor = [0.9, 0.9, 0.0];

		let selectedNeighborNodeSizeScale = 2.0;
		let selectedNeighborNodeOpacityScale = 1.5;


		// Visual properties of non selected and non highlighted nodes
		let nonSelectedNodeOpacityScale = 1.0;
		let nonSelectedNodeSizeScale = 0.5;
		let nonSelectedDarkerColorFactor = 1.5;
		let nonSelectedBrighterColorFactor = 0.5;

		// Will make all colors darker or brither (depending on the background)
		// when highligthing nodes
		// can be super slow for large networks
		let onHighlightChangeColorsEnabled = false;
		// when selecting nodes (double clicking)
		let onSelectionChangeColorsEnabled = true;


		// Initializing other properties
		let sequencialColormap = "interpolateInferno";
		let densityColormap = "interpolateOrRd";
		if (settings.darkBackground) {
			densityColormap = "interpolateInferno";
		}
		let densityDivergingColormap = "interpolatePrinsenvlag";
		if (settings.darkBackground) {
			densityDivergingColormap = "interpolateRedshift";
		}
		let categoricalColormap = "schemeCategory10";
		let useCategoricalColormap = false;


		let highlightedNodes = [];

		/*
		 * Initializing the network
		*/

		let nodeCount = network.nodesCount;
		let bigNetwork = nodeCount > 100000;

		console.log(network)

		let nodes = {};
		let edges = [];
		for (let index = 0; index < nodeCount; index++) {
			nodes["" + index] = {
				ID: "" + index,
				// position: [0,0,0],//network.verticesProperties["Position"][index],
				// color:[0.0,0.0,0.0]//[network.verticesProperties["Color"][index]],
				// size:1
			};
			if (network.labels) {
				nodes["" + index].label = network.labels[index];
			}
		}
		for (const [key, value] of Object.entries(network.verticesProperties)) {
			for (let index = 0; index < nodeCount; index++) {
				nodes["" + index][key.toLowerCase()] = value[index];
			}
		}

		for (let index = 0; index < network.edges.length; index++) {
			let fromIndex, toIndex;

			edges.push({
				"source": "" + network.edges[index][0],
				"target": "" + network.edges[index][1],
				// directed?
			});
		}

		// console.log(Object.entries(d3Chromatic));
		// autostartlayout is not null
		if (settings.autoStartLayout === null) {
			// only starts if the network is not too big
			settings.autoStartLayout = !bigNetwork;
		}

		const gpuTier = await getGPUTier();

		const isHighSpeed = !gpuTier.isMobile && gpuTier.tier > 2;
		console.log(gpuTier.tier,gpuTier.isMobile,isHighSpeed)
		let helios = new Helios({
			elementID: "netviz",
			// densityElementID: "densityRegion",
			density: settings.densityEnabled,
			nodes: nodes,
			edges: edges,
			use2D: settings.use2D,
			hyperbolic: settings.hyperbolic,
			fastEdges: !settings.advancedEdges && bigNetwork,
			forceSupersample: isHighSpeed,
			autoStartLayout: false,
		});

		let ToBase64 = function (u8) {
			return btoa(String.fromCharCode.apply(null, u8));
		}

		let FromBase64 = function (str) {
			return atob(str).split('').map(function (c) { return c.charCodeAt(0); });
		}

		// console.log(JSON.parse(pako.inflate(FromBase64(ToBase64(pako.deflate(JSON.stringify(helios)))), { to: 'string' })))


		// .edgesColorsFromNodes(false)
		// .edgeColor((edgeIndex,fromNode,toNode)=>{
		// 	if (edges[edgeIndex].weight>5000){
		// 	   return [1,0,0,1]; //red
		// 	}else{
		// 	   return [0,0,1,1]; //blue
		// 	}
		// }).update();

		// Calculating node degree so that 

		for (let [key, node] of Object.entries(helios.network.nodes)) {
			let nodeDegree = node.edges.length;
			node._originalSize = defaultNodeScale * (1.0 + Math.log10(nodeDegree + 1.0));
		}

		let updateNodeSelectionStyle = (node) => {
			// Hovering
			if ((typeof node._highlighted === 'undefined')) {
				node._highlighted = false;
			}
			if ((typeof node._filtered === 'undefined')) {
				node._filtered = false;
			}
			// After double click
			if ((typeof node._selected === 'undefined')) {
				node._selected = false;
			}
			// After double click
			if ((typeof node._selectedNeighbor === 'undefined')) {
				node._selectedNeighbor = false;
			}

			let nodeSize = node._originalSize;
			let nodeOutlineWidth = defaultOutlineWidthFactor;
			let nodeOpacity = defaultNodeOpacity;

			if (node._selected) {
				nodeSize *= selectedNodeScale;
				nodeOpacity *= selectedNodeOpacityScale;
				node.outlineColor = selectedOutlineColor;
				nodeOutlineWidth *= selectedNodeScale;
			} else if (node._selectedNeighbor) {
				nodeSize *= selectedNeighborNodeSizeScale;
				nodeOpacity *= selectedNeighborNodeOpacityScale;
				node.outlineColor = defaultOutlineColor;
				nodeOutlineWidth *= selectedNeighborNodeSizeScale;
			} else {
				node.outlineColor = defaultOutlineColor;
			}

			if (node._highlighted) {
				nodeSize *= highlightNodeScale;
				nodeOpacity *= highlightNodeOpacityScale;
				nodeOutlineWidth *= highlightNodeScale;
			}

			if (node._filtered) {
				nodeSize *= 0.05;
				nodeOpacity *= 1.0;
				nodeOutlineWidth *= 0.1;
			}


			node.size = nodeSize;
			node.opacity = nodeOpacity;
			node.outlineWidth = nodeOutlineWidth;

		};

		let nodesHighlight = (nodes, shallHighlight, shallUpdate = true) => {

			nodes.forEach(node => {
				node._highlighted = shallHighlight;
				updateNodeSelectionStyle(node);
			});

			if (onHighlightChangeColorsEnabled) {
				if ((nodes?.length) && shallHighlight) {
					updateNodeSelectionOrHighlightedColors(true);
				} else {
					updateNodeSelectionOrHighlightedColors();
				}
			}

			highlightedNodes = nodes.filter(node => node._highlighted);
			if (shallUpdate) {
				helios.update();
				helios.render();
			}
		};

		let nodesFiltered = (nodes, shallFilter, shallUpdate = true) => {

			nodes.forEach(node => {
				node._filtered = shallFilter;
				updateNodeSelectionStyle(node);
			});

			// if(onHighlightChangeColorsEnabled){
			// 	if((nodes?.length) && shallFilter){
			// 		updateNodeSelectionOrHighlightedColors(true);
			// 	}else{
			// 		updateNodeSelectionOrHighlightedColors();
			// 	}
			// }

			if (shallUpdate) {
				helios.update();
				helios.render();
			}
		};

		let nodesSelect = (nodes, shallSelect, shallUpdate = true) => {
			nodes.forEach(node => {
				node._selected = shallSelect;
				node._selectedNeighbor = shallSelect;
				node.neighbors.forEach(neighNode => {
					neighNode._selectedNeighbor = shallSelect;
					updateNodeSelectionStyle(neighNode);
				});
				updateNodeSelectionStyle(node);
			})

			if ((nodes?.length) && shallSelect) {
				updateNodeSelectionGlobalStyle(true);
				if (onSelectionChangeColorsEnabled) {
					updateNodeSelectionOrHighlightedColors(true);
				}
			} else {
				updateNodeSelectionGlobalStyle();
				if (onSelectionChangeColorsEnabled) {
					updateNodeSelectionOrHighlightedColors();
				}
			}

			if (shallUpdate) {
				helios.update();
				helios.render();
			}
		};

		let centerOnNodes = (nodes) => {
			if (!nodes || nodes.length > 0) {
				if (helios.zoomFactor() < minCenteredNodeZoomLevel) {
					helios.zoomFactor(minCenteredNodeZoomLevel, 500);
				}
				// resetting node selection
				nodesSelect(helios.centeredNodes(), false, false);
				// set selection
				nodesSelect(nodes, true, false);
				helios.centerOnNodes(nodes, 500);
				let pickableSet = new Set();
				nodes.forEach(node => {
					helios.pickeableEdges(node.edges);
				});
				helios.update();
				helios.render();
			} else { // Reset
				nodesSelect(helios.centeredNodes(), false, false);
				helios.zoomFactor(defaultZoomLevel, 500);
				helios.centerOnNodes([], 500);
				helios.pickeableEdges([]);
				helios.update();
				helios.render();
			}
		}

		let getLabelStyleColorAndOutline = (color) => {
			let colorRGB = d3rgb(color[0] * 255, color[1] * 255, color[2] * 255);
			let colorHSL = d3hsl(colorRGB);
			let outlineWidth;
			let outlineColor;
			let textColor;

			if (colorHSL.l > 0.40) {
				textColor = colorRGB.brighter(0.25).formatRgb();
				outlineColor = "rgba(0,0,0,1.0)";
				outlineWidth = 1.0;

			} else {
				textColor = colorRGB.darker(0.25).formatRgb();
				outlineColor = "rgba(200,200,200,1.0)";
				outlineWidth = 1.5;
			}
			return { fill: colorRGB.darker(0.25).formatRgb(), stroke: outlineColor, strokeWidth: outlineWidth };
		}

		let stylizeLabel = (element, color) => {
			let colorResult = getLabelStyleColorAndOutline(color);
			let outlineColor = colorResult.stroke;
			let outlineWidth = colorResult.strokeWidth;
			element.style.color = colorResult.fill;
			element.style["text-shadow"] = `-${outlineWidth}px -${outlineWidth}px 1.0px ${outlineColor}, ${outlineWidth}px -${outlineWidth}px 1.0px ${outlineColor}, -${outlineWidth}px ${outlineWidth}px 1.0px ${outlineColor}, ${outlineWidth}px ${outlineWidth}px 1.0px ${outlineColor}`;
		}

		let stylizeTooltip = (label, color, x, y, isnew) => {
			if (label) {
				// tooltipElement.style.left = x + "px";
				// tooltipElement.style.top = y + "px";
				if (typeof x !== 'undefined' && typeof y !== 'undefined') {
					tooltipElement.group.style.transform = `translate(${x}px, ${y}px)`;
					// tooltipElement.setAttribute('x', x);
					// tooltipElement.setAttribute('y', y);
				}

				if (isnew) {
					// tooltipElement.style.display = "block";
					let styleData = getLabelStyleColorAndOutline(color);
					tooltipElement.fillText.setAttribute("fill", styleData.fill);
					tooltipElement.outlineText.setAttribute("stroke", styleData.stroke);
					tooltipElement.outlineText.setAttribute("stroke-width", styleData.strokeWidth * 3.0);
					tooltipElement.group.setAttribute("visibility", "visible");
				}
				// set text of the SVG element
				tooltipElement.fillText.textContent = label;
				tooltipElement.outlineText.textContent = label;
			} else {
				tooltipElement.group.setAttribute("visibility", "hidden");
			}
		}

		let showTooltipForNode = (node, x, y, isNew) => {
			if (node) {
				let label = node.label ?? node.title ?? node.ID;
				stylizeTooltip(label, node.color, x, y, isNew);
				// nodesHighlight([node],true);
			} else {
				stylizeTooltip(null);
			}
		}

		let showTooltipForEdge = (edge, x, y, isNew) => {
			if (edge) {
				let fromLabel = edge.source.label ?? edge.source.title ?? edge.source.ID;
				let toLabel = edge.target.label ?? edge.target.title ?? edge.target.ID;
				let label = fromLabel + " - " + toLabel;
				stylizeTooltip(label, edge.source.color, x, y, isNew);
				// nodesHighlight([edge.source,edge.target],true);
			} else {
				stylizeTooltip(null);
			}
		}


		let updateNodeSelectionGlobalStyle = (hasSelection) => {
			// hasSelection not set 
			if (typeof hasSelection === 'undefined') {
				hasSelection = helios.network.index2Node.some(node => node._selected);
			}
			if (hasSelection) {
				helios.nodesGlobalOpacityScale(nonSelectedNodeOpacityScale);
				helios.nodesGlobalSizeScale(nonSelectedNodeSizeScale * currentGlobalNodeSizeScale);
				helios.nodesGlobalOutlineWidthScale(nonSelectedNodeSizeScale * currentGlobalNodeSizeScale);
				helios.edgesGlobalOpacityScale(currentGlobalEdgeOpacityScale * nonSelectedNodeOpacityScale);
			} else {
				helios.nodesGlobalOpacityScale(defaultNodeOpacity);
				helios.nodesGlobalSizeScale(currentGlobalNodeSizeScale);
				helios.nodesGlobalOutlineWidthScale(currentGlobalNodeSizeScale);
				helios.edgesGlobalOpacityScale(currentGlobalEdgeOpacityScale);
			}
		}

		let updateNodeSelectionOrHighlightedColors = (hasSelection) => {
			// hasSelection not set 
			if (typeof hasSelection === 'undefined') {
				hasSelection = helios.network.index2Node.some(node => node._selected || node._highlighted || node._selectedNeighbor);
			}
			if (hasSelection) {
				helios.nodeColor(node => {
					// console.log(""+[color.r,color.g,color.b])
					if (node._selected || node._highlighted || node._selectedNeighbor) {
						return node._originalColor;
					} else {
						return settings.darkBackground ? node._darkerColor : node._brighterColor;
					}
				});
			} else {
				helios.nodeColor(node => {
					return node._originalColor;
				});
			}
		}




		let logK = Math.log10(helios.network.indexedEdges.length / helios.network.index2Node.length);
		let logN = Math.log10(helios.network.index2Node.length);
		let logDensity = Math.log10(2.0 * helios.network.indexedEdges.length / helios.network.index2Node.length / (helios.network.index2Node.length - 1.0));

		// let estimatedZoom = Math.pow(10,1.3400+0.2144*logK+-0.3623*logN+0.0000*logDensity)
		// let estimatedOpacity = Math.pow(10,1.8854+-0.6344*logK+-0.4964*logN+0.0000*logDensity)
		// // estimatedSize = Math.pow(10,-0.4027+-0.0007*logK+0.0335*logN+0.0000*logDensity)
		// let logZoom =  Math.log10(estimatedZoom);
		// let estimatedSize = Math.pow(10,0.6432+0.1667*logK+-0.2493*logN+-0.7805*logZoom+0.0000*logDensity)

		let estimatedZoom = Math.pow(10, 1.2601 + 0.2488 * logK + -0.3631 * logN + 0.0000 * logDensity)
		let estimatedOpacity = Math.pow(10, 1.9968 + -0.6822 * logK + -0.4954 * logN + 0.0000 * logDensity)

		// Not using estimated zoom
		if (!bigNetwork) {
			estimatedZoom = defaultZoomLevel;
		} else {
			estimatedZoom = defaultZoomLevelBigNetworks;
		}

		let logZoom = Math.log10(estimatedZoom);
		// let estimatedSize = Math.pow(10,-0.2833+-0.0520*logK+0.0347*logN+0.0000*logDensity)

		let estimatedSize = Math.pow(10, 0.8744 + 0.1766 * logK + -0.2989 * logN + -0.9187 * logZoom + 0.0000 * logDensity) * 0.75;

		// estimatedZoom = Math.pow(10,1.2771+0.2415*logK+-0.3629*logN+0.0000*logDensity)
		// estimatedOpacity = Math.pow(10,1.8780+-0.6312*logK+-0.4965*logN+0.0000*logDensity)
		// estimatedSize = Math.pow(10,-0.3259+-0.0337*logK+0.0343*logN+0.0000*logDensity)
		// estimatedSize3 = Math.pow(10,0.7583+0.1713*logK+-0.2738*logN+-0.8489*logZoom+0.0000*logDensity)

		if (settings.definedSize) {
			currentGlobalNodeSizeScale = settings.definedSize;
		} else {
			currentGlobalNodeSizeScale = estimatedSize;
		}

		if (settings.definedOpacity) {
			currentGlobalEdgeOpacityScale = settings.definedOpacity;
		} else {
			currentGlobalEdgeOpacityScale = estimatedOpacity;
		}

		defaultZoomLevel = estimatedZoom;

		helios.onNodeHoverStart((node, event) => {
			showTooltipForNode(node, event?.clientX, event?.clientY, true);
			nodesHighlight([node], true);
			// console.log(`Start: ${node.ID}`);
		});

		helios.onNodeHoverMove((node, event) => {
			showTooltipForNode(node, event?.clientX, event?.clientY, false);
		});

		helios.onNodeHoverEnd((node, event) => {
			if (node) {
				nodesHighlight([node], false);
			}
			showTooltipForNode(null);
			// console.log(`Hover ended: ${node.ID}`);
		});

		helios.onNodeClick((node, event) => {
			if (node) {
				console.log(`Clicked: ${node.ID}`);
			} else {
				console.log(`Clicked on background`);
			}
		});

		helios.onNodeDoubleClick((node, event) => {
			if (node) {
				console.log(`Double Clicked: ${node.ID}`);
				centerOnNodes([node]);
				// Special function for dealing with MAG/Openalex Citation networks
				if ("mag id" in node) {
					window.open(`https://explore.openalex.org/works/W${node["mag id"]}`, "helios_mag");
				}
			} else {
				console.log(`Double clicked on background`);
				centerOnNodes([]); //Reset centers

			}
		});

		helios.onEdgeHoverStart((edge, event) => {
			showTooltipForEdge(edge, event?.clientX, event?.clientY, true);
			if (edge) {
				// Only the non selected endpoints are highlighted
				nodesHighlight([edge.source, edge.target].filter(node => !node._selected), true);
			}
		});

		helios.onEdgeHoverMove((edge, event) => {
			showTooltipForEdge(edge, event?.clientX, event?.clientY, false);
		});

		helios.onEdgeHoverEnd((edge, event) => {
			if (edge) {
				// Only the non selected endpoints were highlighted
				nodesHighlight([edge.source, edge.target].filter(node => !node._selected), false);
			}
			showTooltipForEdge(null);
		});

		helios.onEdgeClick((edge, event) => {
			console.log("Edge clicked");
			console.log(edge);
		});

		helios.onLayoutStart(() => {
			console.log("Layout start");
			d3Select("#loading").style("display", "block");
			d3Select("#message").style("display", "none");
		});

		helios.onLayoutStop(() => {
			console.log("Layout end");
			d3Select("#loading").style("display", "none");
			d3Select("#message").style("display", "block");
		});

		helios.backgroundColor(settings.backgroundColor) // set background color
			// .nodeColor(node=>{ // Example on how to define colors
			// 	let color = d3rgb(colorScale(node.ID));
			// 	// console.log(""+[color.r,color.g,color.b])
			// 	return [color.r/255,color.g/255,color.b/255];
			// })
			// .nodeSize(node=>{ // Example on how to define size
			// 	return Math.random()*5+1.0;
			// })
			.edgesGlobalOpacityScale(1.0) // set edges intensity);
			.nodeSize(updateNodeSize)
			.nodeOutlineWidth(defaultOutlineWidthFactor)
			.nodeOutlineColor(settings.backgroundColor)
			.additiveBlending(settings.additiveBlending)
			.shadedNodes(settings.shaded);


		let buttonInformation = {
			"Export": {
				name: "⬇︎",
				mapColor: "#B1C3B6",
				color: "#008758",
				action: (selection, d, event) => {
					if (event.shiftKey) {
						let pos = helios.network.positions;
						let postext = "";
						for (let i = 0; i < pos.length; i += 3) {
							postext += `${pos[i]} ${pos[i + 1]} ${pos[i + 2]}\n`;
						}
						downloadText(networkName + "_positions.txt", postext);
					} else {
						console.log("Action!");
						let dpr = window.devicePixelRatio || 1;
						helios.exportFigure(networkName + ".svg", {
							scale: dpr,
							// width: 2048,
							// height: 2048,
							supersampleFactor: 2.0,
							backgroundColor: settings.backgroundColor,
						});
					}
				},
				extra: selection => {

				}
			},
			"Size": {
				name: "Size",
				mapColor: "#AFB9C9",
				color: "#1E6099",
				action: null,
				extra: selection => {
					selection.append("input")
						.attr("type", "range")
						.attr("min", "-1")
						.attr("max", "1")
						.attr("step", "0.1")
						.attr("value", "" + Math.log10(currentGlobalNodeSizeScale))
						.attr("id", "nodeSizeSlider")
						.classed("slider", true)
						.style("min-width", "60px")
						.on("input", (event, d) => {
							currentGlobalNodeSizeScale = Math.pow(10, parseFloat(d3Select("#nodeSizeSlider").property("value")));
							// helios.nodesGlobalSizeScale(currentGlobalNodeSizeScale);
							// helios.nodesGlobalOutlineWidthScale(currentGlobalNodeSizeScale);
							updateNodeSelectionGlobalStyle();
							// helios.update();
							helios.render();
							event.stopPropagation();
						});
				}
			},
			"Color": {
				name: "Color",
				mapColor: "#AFB9C9",
				color: "#1E6099",
				action: null,
				extra: selection => {
					selection.append("select")
						.attr("id", "colorSelector")
						.classed("selector", true)
						.style("min-width", "60px")
						.on("change", (event, d) => {
							updateColorSelection();
						})
						.selectAll("option")
						.data(Object.entries(helios.network.index2Node[0]))
						.enter()
						.filter(d => !d[0].startsWith("_"))
						.filter(d => !ignoredProperties.has(d[0]) && !d[0].startsWith("_"))
						.append("option")
						.attr("value", d => d[0])
						.property("selected", d => d[0] == colorProperty)
						.text(d => d[0]);

					selection.append("select")
						.attr("id", "colormapSelector")
						.classed("selector", true)
						.style("min-width", "60px");
					// .classed("slider",true)
					// 
					// .on("input", (event,d)=>{
					// 	helios.edgesOpacity(Math.pow(10,parseFloat(d3Select("#edgeOpacitySlider").property("value"))));
					// 	helios.update();
					// 	helios.render();
					// 	event.stopPropagation();
					// });
				}
			},
			"Edges": {
				name: "Edges",
				mapColor: "#B1A58C",
				color: "#903C22",
				action: null,
				extra: selection => {
					console.log("CALLED");
					selection.append("input")
						.attr("type", "range")
						.attr("min", "0")
						.attr("max", "1")
						.attr("step", (1 / 255) + "")
						.attr("value", "" + (Math.round(255 * currentGlobalEdgeOpacityScale) / 255))
						.attr("id", "edgeOpacitySlider")
						.classed("slider", true)
						.style("min-width", "60px")
						.on("input", (event, d) => {
							// helios.edgesOpacity(Math.pow(10,parseFloat(d3Select("#edgeOpacitySlider").property("value"))));
							currentGlobalEdgeOpacityScale = parseFloat(d3Select("#edgeOpacitySlider").property("value"))

							helios.edgesGlobalOpacityScale(currentGlobalEdgeOpacityScale);
							// helios.update();
							helios.render();
							event.stopPropagation();
						});
				}
			},
			"Density": {
				name: "Density",
				mapColor: "#A1A152",
				color: "#505005",
				action: null,
				extra: selection => {
					selection.append("select")
						.attr("id", "densitySelector")
						.classed("selector", true)
						.style("min-width", "60px")
						.on("change", (event, d) => {
							// updateColorSelection();
							updateDensityAttributes();
							event.stopPropagation();
						})
						.selectAll("option")
						.data(Object.entries(helios.network.index2Node[0]).concat([["Uniform", 0], ["Degree", 0]]))
						.enter()
						.filter(d => !d[0].startsWith("_"))
						.filter(d => !ignoredProperties.has(d[0]) && !d[0].startsWith("_"))
						.filter(d => d[0] != "index")
						.filter(d => Number.isFinite(d[1]))
						.append("option")
						.attr("value", d => d[0])
						.property("selected", d => d[0] == chosenDensityProperty)
						.text(d => d[0]);
				}
			},
			"Bandwidth": {
				name: "Bandwidth",
				mapColor: "#A1A152",
				color: "#505005",
				action: null,
				extra: selection => {
					selection.append("input")
						.attr("type", "range")
						.attr("min", "-0.9")
						.attr("max", "2.5")
						.attr("step", 0.05 + "")
						.attr("value", "" + Math.log10(currentBandwidth))
						.attr("id", "densityBandwidthSlider")
						.classed("slider", true)
						.style("min-width", "60px")
						.on("input", (event, d) => {
							// helios.edgesOpacity(Math.pow(10,parseFloat(d3Select("#edgeOpacitySlider").property("value"))));
							currentBandwidth = Math.pow(10, parseFloat(d3Select("#densityBandwidthSlider").property("value")))
							helios.densityMap?.setBandwidth(currentBandwidth);
							// helios.update();
							// helios.redrawDensityMap();
							helios.redraw();
							event.stopPropagation();
						});
					helios.densityMap?.setBandwidth(currentBandwidth);
				}
			},
			"Weight": {
				name: "Weight",
				mapColor: "#A1A152",
				color: "#505005",
				action: null,
				extra: selection => {
					selection.append("input")
						.attr("type", "range")
						.attr("min", "0")
						.attr("max", "10")
						.attr("step", 0.1 + "")
						.attr("value", "" + Math.log10(currentDensityWeight))
						.attr("id", "densityWeightSlider")
						.classed("slider", true)
						.style("min-width", "60px")
						.on("input", (event, d) => {
							// helios.edgesOpacity(Math.pow(10,parseFloat(d3Select("#edgeOpacitySlider").property("value"))));
							currentDensityWeight = Math.pow(10, parseFloat(d3Select("#densityWeightSlider").property("value")))
							helios.densityMap?.setKernelWeightScale(currentDensityWeight);
							// helios.update();
							// helios.redrawDensityMap();
							helios.redraw();
							event.stopPropagation();
						});
					helios.densityMap?.setKernelWeightScale(currentDensityWeight);
				}
			},
			"Map": {
				name: "Map",
				mapColor: "#A1A152",
				color: "#505005",
				action: null,
				extra: selection => {
					selection.append("select")
						.attr("id", "densityColormapSelector")
						.classed("selector", true)
						.style("min-width", "60px")
						.on("change", (event, d) => {
							updateDensityColors();
						});
					updateDensityColorsList();
				}
			},
		}

		// let legendView = d3Select(helios.overlay).append("svg")
		// 	.attr("id", "legendView")
		// 	.style("position", "absolute")
		// 	.style("left", "10px")
		// 	.style("top", "10px")
		// 	.style("pointer-events", "none")

		// let densityLegendView = d3Select(helios.overlay).append("svg")
		// 	.style("position", "absolute")
		// 	.attr("id", "densityLegendView")
		// 	.style("right", "10px")
		// 	.style("bottom", "25px")
		// 	.style("top", "auto")
		// 	.style("left", "auto")
		// 	.style("pointer-events", "none")

		// now using this.svgLayer instead of overlay and svg creation
		// svgLayer is already an svg, need to use g instead


		let tooltipElement = {
			group: helios.svgLayer.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'g'))
			// .attr("id", "tooltips")
		};

		tooltipElement.group.setAttribute("id", "tooltips");
		tooltipElement.outlineText = tooltipElement.group.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'text'))
		tooltipElement.fillText = tooltipElement.group.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'text'))


		let legendView = d3Select(helios.svgLayer).append("g")
			.attr("transform", "translate(10,10)")
			.attr("id", "legendView");

		let densityLegendView = d3Select(helios.svgLayer).append("g")
			.attr("id", "densityLegendView");

		let updateDensityLegendsPosition = () => {
			densityLegendView.attr("transform", "translate(" + (helios.svgLayer.clientWidth - 170) + " " + (helios.svgLayer.clientHeight - 75) + ")")
		}

		// Update densityLegendView position with observer when svgLayer is resized
		let densityLegendViewObserver = new ResizeObserver(entries => {
			for (let entry of entries) {
				updateDensityLegendsPosition();
			}
		});

		densityLegendViewObserver.observe(helios.svgLayer);
		updateDensityLegendsPosition();


		let updateLegendCategorical = (property2color) => {
			legendView.selectAll("*").remove();
			let legendItems = legendView.selectAll(".legend").data(property2color.keys());

			legendView
				.style("width", 350 + 'px')
				.style("height", (property2color.size + 1) * 20 + 'px');

			let legendEnter = legendItems.enter().append("g")
				.classed("legend", true)
				.attr("transform", (d, i) => ("translate(0," + (i * 20) + ")"));

			legendEnter.append("rect");
			legendEnter.append("g").append("text");
			legendItems = legendItems.merge(legendEnter)

			legendItems.select("rect")
				.attr("x", 0)
				.attr("y", 0)
				.attr("width", 30)
				.attr("height", 15)
				.attr("fill", d => property2color.get(d));

			legendItems.select("g")
				.attr("transform", (d) => (`translate(${35},${15 / 2})`))
				.select("text")
				.style("font-size", "12px")
				.append('tspan')
				.attr("dy", "0.33em")
				.text(d => d)
				.attr("fill", settings.darkBackground ? "white" : "black")
				.each(wrapText)
		}

		let updateLegendSequencial = (scale, title) => {
			legendView.selectAll("*").remove();
			if (settings.legendsEnabled) {
				d3Legend(scale, {
					svg: legendView,
					title: title,
					orientation: "vertical",
					themeColors: [settings.darkBackground ? "white" : "black", settings.darkBackground ? "black" : "white"]
				});
			}
		}

		let updateDensityDiverging = (useDiverging) => {
			if (useDiverging != densityDiverging) {
				densityDiverging = useDiverging;
				//set densityColormapSelector to the right colormap
				let newColormap = densityDiverging ? densityDivergingColormap : densityColormap;
				d3Select("#densityColormapSelector").property("value", newColormap);
				updateDensityColors();
			}

		}

		densityDiverging = false;
		let updateLegendDensity = () => {
			let scheme = allColors[densityColormap];
			if (densityDiverging) {
				scheme = allColors[densityDivergingColormap];
			}
			let densityScale = d3ScaleSequential(scheme).domain([0, 1])

			if (densityDiverging) {
				densityScale = d3ScaleDiverging(scheme).domain([-1, 0, 1])
			}
			densityLegendView.selectAll("*").remove();
			if (settings.legendsEnabled) {
				d3Legend(densityScale, {
					svg: densityLegendView,
					title: chosenDensityProperty,
					titleAlignment: "end",
					width: 150,
					// ticks:[0,1],
					tickValues: densityDiverging ? [-1, 0, 1] : [0, 1],
					tickFormat: densityDiverging ? d => ["-", "0", "+"][d + 1] : d => ["0", "+"][d],
					themeColors: [settings.darkBackground ? "white" : "black", settings.darkBackground ? "black" : "white"]
				});
			}
		}


		function updateCategoricalColors() {
			let propertyArray = [];
			for (let [key, node] of Object.entries(helios.network.nodes)) {
				propertyArray.push(node[colorProperty]);
			}
			let sortedItems = sortByCount(propertyArray);
			// console.log(sortedItems);
			let scheme = allColors[categoricalColormap];
			// console.log("Scheme",scheme);
			let arraysCount = scheme.filter(Array.isArray).length;

			if (arraysCount > 0) {
				let firstIndex = scheme.findIndex(d => (typeof d !== "undefined"));
				if (typeof scheme[sortedItems.length - 1] !== "undefined") {
					scheme = scheme[sortedItems.length];
				} else {
					if (sortedItems.length - 1 < firstIndex) {
						scheme = scheme[firstIndex];
					} else {
						scheme = scheme[scheme.length - 1];
					}
				}
			}
			// let maxColors = const [lastItem] = arr.slice(-1)
			// console.log(scheme)
			let colorMap = d3ScaleOrdinal(scheme);
			let property2color = new Map();
			let categoricalMap = new Map();
			sortedItems.forEach((d, i) => {
				if (i < scheme.length) {
					property2color.set(d, colorMap(d));
					categoricalMap.set(d, scheme[i]);
				} else {
					property2color.set(d, "#bbbbbb");;
				}
			});
			if (categoricalMap.size < sortedItems.length) {
				categoricalMap.set("Other", "#bbbbbb")
			}
			for (let [key, node] of Object.entries(helios.network.nodes)) {
				let color = d3rgb(property2color.get(node[colorProperty]));
				let darkerColor = color.darker(nonSelectedDarkerColorFactor);
				let brighterColor = color.brighter(nonSelectedBrighterColorFactor);

				node._originalColor = [color.r / 255, color.g / 255, color.b / 255];
				node._darkerColor = [darkerColor.r / 255, darkerColor.g / 255, darkerColor.b / 255];
				node._brighterColor = [brighterColor.r / 255, brighterColor.g / 255, brighterColor.b / 255];
			}
			updateNodeSelectionOrHighlightedColors();
			helios.update();
			helios.render();
			updateLegendCategorical(categoricalMap)
		}


		function updateSequencialColors() {
			// updateLegendCategorical(new Map());
			let propertyArray = [];
			let maxValue = -Infinity;
			let minValue = Infinity;
			for (let [key, node] of Object.entries(helios.network.nodes)) {
				propertyArray.push(node[colorProperty]);
				maxValue = Math.max(maxValue, node[colorProperty]);
				minValue = Math.min(minValue, node[colorProperty]);
			}
			let scheme = allColors[sequencialColormap];
			let cScale = d3ScaleSequential(scheme)
				.domain([minValue, maxValue]);

			for (let [key, node] of Object.entries(helios.network.nodes)) {
				let color = d3rgb(cScale(node[colorProperty]));
				let darkerColor = color.darker(nonSelectedDarkerColorFactor);
				let brighterColor = color.brighter(nonSelectedBrighterColorFactor);

				node._originalColor = [color.r / 255, color.g / 255, color.b / 255];
				node._darkerColor = [darkerColor.r / 255, darkerColor.g / 255, darkerColor.b / 255];
				node._brighterColor = [brighterColor.r / 255, brighterColor.g / 255, brighterColor.b / 255];
			}

			updateLegendSequencial(cScale, colorProperty);
			updateNodeSelectionOrHighlightedColors();
			helios.update();
			helios.render();
		}

		function updateDensityColorsList() {
			let colormapSelector = d3Select("#densityColormapSelector")
				.classed("selector", true)
				.style("min-width", "60px")
				.on("change", (event, d) => {
					updateDensityColors();
				})
				.selectAll("option")
				.data(Object.entries(allColors).filter(d => d[0].startsWith("interpolate")))
				.join("option")
				.attr("value", d => d[0])
				.property("selected", d => d[0] == (densityDiverging ? densityDivergingColormap : densityColormap))
				.text(d => d[0].replace("interpolate", "").replace("scheme", ""));
		}

		function updateDensityColors() {
			if (densityDiverging) {
				densityDivergingColormap = d3Select("#densityColormapSelector").property("value");
			} else {
				densityColormap = d3Select("#densityColormapSelector").property("value");
			}
			let colormapName = densityDiverging ? densityDivergingColormap : densityColormap;

			console.log(colormapName)
			let scheme = allColors[colormapName];
			helios.densityMap.setColormap(scheme);

			updateLegendDensity();
			helios.render();
		}

		let updateColormapSelection = () => {
			if (useCategoricalColormap) {
				categoricalColormap = d3Select("#colormapSelector").property("value");
				updateCategoricalColors();
			} else {
				sequencialColormap = d3Select("#colormapSelector").property("value");
				updateSequencialColors();
			}
		}

		let updateColorSelection = () => {
			colorProperty = d3Select("#colorSelector").property("value");
			let categorical = false;
			for (let [key, node] of Object.entries(helios.network.nodes)) {
				if (typeof node[colorProperty] !== 'number') {
					categorical = true;
					// console.log(colorProperty,node);
					break;
				}
			}
			useCategoricalColormap = categorical;
			console.log(categorical ? "categorical" : "continuous");
			let colormapSelector = d3Select("#colormapSelector")
				.classed("selector", true)
				.style("min-width", "60px")
				.on("change", (event, d) => {
					updateColormapSelection();
				})
				.selectAll("option")
				.data(Object.entries(allColors).filter(d => d[0].startsWith(categorical ? "scheme" : "interpolate")))
				.join("option")
				.attr("value", d => d[0])
				.property("selected", d => d[0] == (categorical ? categoricalColormap : sequencialColormap))
				.text(d => d[0].replace("interpolate", "").replace("scheme", ""));
			updateColormapSelection();
		}

		function updateDensityAttributes(shallRedraw = true) {
			if (helios.densityMap) {
				let maxValue = -Infinity;
				let minValue = Infinity;
				chosenDensityProperty = d3Select("#densitySelector").property("value");
				if (chosenDensityProperty == "Uniform") {
					for (let index = 0; index < helios.densityWeights.length; index++) {
						helios.densityWeights[index] = 1.0;
					}
					console.log("Uniform");
				} else if (chosenDensityProperty == "Degree") {
					for (let [key, node] of Object.entries(helios.network.nodes)) {
						let value = node["edges"].length;
						helios.densityWeights[node.index] = value;
						maxValue = Math.max(maxValue, value);
						minValue = Math.min(minValue, value);
					}
					console.log("Degree");
					for (let index = 0; index < helios.densityWeights.length; index++) {
						helios.densityWeights[index] = (helios.densityWeights[index] - minValue) / (maxValue - minValue);
					}
				} else {
					for (let [key, node] of Object.entries(helios.network.nodes)) {
						let value = node[chosenDensityProperty];
						helios.densityWeights[node.index] = value;
						// maxValue = Math.max(maxValue, value);
						// minValue = Math.min(minValue, value);
					}
					// for (let index = 0; index < helios.densityWeights.length; index++) {
					// 	helios.densityWeights[index] = (helios.densityWeights[index] - minValue) / (maxValue - minValue);
					// }
				}
				// if all values in helios.densityWeights are positive
				// then we can use the density map as a filter
				// otherwise we can only use it as a color map
				let totalWeight = 0;
				let totalPositive = 0;
				let totalNegative = 0;
				for (let [key, node] of Object.entries(helios.network.nodes)) {
					let value = node._filtered ? 0.0 : 1.0;
					helios.densityWeights[node.index] *= value;
					let densityWeight = helios.densityWeights[node.index];
					totalWeight += Math.abs(densityWeight);
					if (densityWeight < 0) {
						totalNegative += densityWeight;
					} else {
						totalPositive += densityWeight;
					}
				}
				if (totalWeight > 0 && totalNegative == 0) {
					for (let [key, node] of Object.entries(helios.network.nodes)) {
						helios.densityWeights[node.index] /= totalWeight;
					}
					helios?.densityMap?.divergingColormap(false);
					updateDensityDiverging(false);
				} else {
					for (let [key, node] of Object.entries(helios.network.nodes)) {
						let densityWeight = helios.densityWeights[node.index];
						let totalMax = Math.max(Math.abs(totalNegative), Math.abs(totalPositive));
						if (densityWeight < 0 && totalNegative < 0) {
							helios.densityWeights[node.index] = densityWeight / totalMax;
						} else if (densityWeight > 0 && totalPositive > 0) {
							helios.densityWeights[node.index] = densityWeight / totalMax;
						}
						// helios.densityWeights[node.index] /= totalWeight;
					}
					helios?.densityMap?.divergingColormap(true);
					updateDensityDiverging(true);
				}

				updateLegendDensity();
				helios.updateDensityMap();
				// helios.redrawDensityMap();
				if (shallRedraw) {
					helios.redraw();
				}
			}
		}


		let buttonOrder = ["Export", "Size", "Color", "Edges"];
		if (settings.densityEnabled) {
			// Add these ["Density","Bandwidth","Weight","Map"] to the buttonOrder
			buttonOrder = buttonOrder.concat(["Density", "Bandwidth", "Weight", "Map"]);
		}

		d3Select("#selectionmenu")
			.selectAll("span.menuEntry")
			.data(buttonOrder)
			.enter()
			.append("span")
			.classed("menuEntry", true)
			.style("--color", d => buttonInformation[d].color)
			.text(d => buttonInformation[d].name)
			.each(function (d) {
				d3Select(this).call(buttonInformation[d].extra);
			});
		d3Select("#selectionmenu")
			.selectAll("span.menuEntry")
			.filter(d => buttonInformation[d].action != null)
			.on("click", (event, d) => {
				if (buttonInformation[d].action) {
					buttonInformation[d].action(d3Select(this), d, event);
				}
			})
			.classed("hasAction", true);


		document.addEventListener('keypress', event => {
			if ((event.target.nodeName.toLowerCase() !== 'input')) {
				if (event.code === 'Space') {
					if (helios.layoutWorker.isRunning()) {
						helios.pauseLayout();
					} else {
						helios.resumeLayout();
					}
				}
			}
		});

		if (settings.startZoomLevel) {
			defaultZoomLevel = settings.startZoomLevel;
			helios.zoomFactor(defaultZoomLevel);
		} else {
			if (bigNetwork) {
				//no animation
				helios.zoomFactor(defaultZoomLevel);
				// helios.zoomFactor(0.35);
			} else {
				//animating initial zoom in to the network
				helios.zoomFactor(0.05);
				helios.zoomFactor(defaultZoomLevel, 1000);
			}
		}

		helios.nodesGlobalSizeScale(currentGlobalNodeSizeScale);
		helios.nodesGlobalOutlineWidthScale(currentGlobalNodeSizeScale);
		helios.edgesGlobalOpacityScale(currentGlobalEdgeOpacityScale);


		if (settings.densityEnabled) {
			helios.densityMap.setColormap(allColors[densityDiverging ? densityDivergingColormap : densityColormap]);

		}




		let minScreenProportion = 0.00015;
		let visibleScreenProportion = 0.0003;
		let maxLabels = 25;
		let screenLabelsSmoothness = 0.80;


		let categoricalLabelsGroup = d3Select(helios.svgLayer).append("g")
			.attr("id", "categoricalLabelsGroup")
			.style("text-anchor", "middle")
			// .style("dominant-baseline", "central")
			.style("font-size", 12 + "px")
			.attr("stroke-linejoin", "round")
			.style("font-family", "HelveticaNeue,Roboto,Helvetica,Arial,sans-serif")
			.attr("pointer-events", "none");

		let labelsGroup = d3Select(helios.svgLayer).append("g")
			.attr("id", "labelsGroup")
			.style("text-anchor", "middle")
			// .style("dominant-baseline", "central")
			.style("font-size", 12 + "px")
			.attr("stroke-linejoin", "round")
			.style("font-family", "HelveticaNeue,Roboto,Helvetica,Arial,sans-serif")
			.attr("pointer-events", "none");



		let interpolateProportion = (proportion) => {
			let a = (proportion - minScreenProportion) / (visibleScreenProportion - minScreenProportion);
			return Math.max(0, Math.min(1, a));
		}

		let updateLabelsInScreen = () => {
			// Create and update labels for nodes in screen
			labelsGroup.selectAll(".label")
				.data(nodesOnScreen, nodeIDsProportion => +nodeIDsProportion[0])
				.join(
					enter => {
						let labelGroup = enter.append("g")
							.classed("label", true);
						labelGroup.append("text").classed("labelOutline", true).attr("dy", "0.25em")
						.attr("stroke-linejoin", "round");
						labelGroup.append("text").classed("labelFill", true).attr("dy", "0.25em");
						return labelGroup;
					},
					update => {
						// stylizeLabel(update.node(),update);
						return update;
					},
					exit => exit.remove(),
				)
				.style("opacity", nodeIDsProportion => {
					return interpolateProportion(nodeIDsProportion[1]);
				})

				.attr("transform", nodeIDsProportion => {
					let projectedNode = helios.getProjectedPositions([+nodeIDsProportion[0]]);
					// if projectedNode[2] is negative, the node is behind the camera
					if (projectedNode[2] < 0 && !helios._use2D) {
						return null;
					}
					let newScale = interpolateProportion(nodeIDsProportion[1]);
					return `translate(${projectedNode[0]} ${projectedNode[1]}) scale(${newScale})`;
				})
				.each(function (nodeIDsProportion) {
					let node = helios.network.index2Node[+nodeIDsProportion[0]];
					// stylizeLabel(this, node.color);
					let labelSelect = d3Select(this);
					let labelFillNode = labelSelect.select(".labelFill").node();
					let labelOutlineNode = labelSelect.select(".labelOutline").node();
					let styleData = getLabelStyleColorAndOutline(node.color);
					labelFillNode.style.fill = styleData.fill;
					labelOutlineNode.style.stroke = styleData.stroke;
					labelOutlineNode.style.strokeWidth = styleData.strokeWidth * 3.0;

					let labelText = node.label ?? node.title ?? node.ID;
					labelFillNode.textContent = labelText;
					labelOutlineNode.textContent = labelText;
				});

		}



		let updateCategoricalGroups = () => {
			// Create and update labels for nodes in screen
			categoricalLabelsGroup.selectAll(".categoryLabel")
				.data(categoriesOnScreen, nodeIDsProportion => +nodeIDsProportion[0])
				.join(
					enter => {
						let labelGroup = enter.append("g")
							.classed("categoryLabel", true);
							labelGroup.append("text").classed("labelOutline", true).attr("dy", "0.25em");
							labelGroup.append("text").classed("labelFill", true).attr("dy", "0.25em");
						return labelGroup;
					},
					update => {
						// stylizeLabel(update.node(),update);
						return update;
					},
					exit => exit.remove(),
				)
				// .style("opacity", nodeIDsProportion => {
				// 	return interpolateProportion(nodeIDsProportion[1]);
				// })

				.attr("transform", nodeIDsProportion => {
					let projectedNode = [nodeIDsProportion[2],nodeIDsProportion[3]]
					// if projectedNode[2] is negative, the node is behind the camera
					let newScale = 1.0;//interpolateProportion(nodeIDsProportion[1]);
					return `translate(${projectedNode[0]} ${projectedNode[1]}) scale(${newScale})`;
				})
				.each(function (nodeIDsProportion) {
					let category = nodeIDsProportion[0];
					// stylizeLabel(this, node.color);
					let labelSelect = d3Select(this);

					let labelFillNode = labelSelect.select(".labelFill").node();
					let labelOutlineNode = labelSelect.select(".labelOutline").node();
					// let styleData = getLabelStyleColorAndOutline(node.color);
					
					labelFillNode.style.fill = "black";
					labelOutlineNode.style.stroke = "white";
					labelOutlineNode.style.strokeWidth = 3.0;

					labelFillNode.textContent = category;
					labelOutlineNode.textContent = category;
				});

		}



		let heliosUI = new HeliosUI(helios,{
			collapsed:true,
		});
		
		helios.onReady(() => {
			
			helios.trackAttribute("indexTracker", "index", {
				minProportion: minScreenProportion,
				smoothness: screenLabelsSmoothness,
				maxLabels: maxLabels,
				onTrack: (indices, tracker) => {
					nodesOnScreen = indices;
					updateLabelsInScreen();
				}
			});

			// helios.trackAttribute("category", "main category", {
			// 	maxLabels: maxLabels,
			// 	calculateCentroid:true,
			// 	minProportion: 0.01,
			// 	smoothness: 0.999,
			// 	maxLabels: 5,
			// 	onTrack: (categoriesData, tracker) => {
			// 		// tracker.
			// 		categoriesOnScreen = categoriesData;
			// 		// console.log(categoriesData);
			// 		updateCategoricalGroups();
			// 	}
			// });

			// helios.scheduler.schedule({
			// 	name: "9.0.labelsUpdate",
			// 	callback: (elapsedTime, task) => {

			// 		nodesInScreen = helios.nodesInScreen(minScreenProportion, maxLabels, screenLabelsSmoothness);
			// 		updateLabelsInScreen();
			// 	},
			// 	delay: 0,
			// 	repeatInterval: 20,
			// 	repeat: true,
			// 	synchronized: true,
			// 	immediateUpdates: false,
			// 	redraw: false,
			// 	updateNodesGeometry: false,
			// 	updateEdgesGeometry: false,
			// });
			// helios.onDraw(() => {
			// 	nodesInScreen = helios.nodesInScreen(minScreenProportion, maxLabels, screenLabelsSmoothness);
			// 	updateLabelsInScreen()
			// });

			d3Select("#centerloading").style("display", "none");
			if (settings.searchEnabled) {
				d3Select("#filterPanel").style("display", null);
			}

			if (settings.autoStartLayout) {
				helios.resumeLayout();
			}
			updateDensityAttributes(false);
			updateColorSelection();
		});



		let updateFilteredNodes = throttleLast(() => {
			let searchTerm = d3Select("#searchSelector").property("value").toLowerCase();
			let allNodes = helios.network.index2Node;
			nodesFiltered(allNodes, true, false);
			console.log("searching for " + searchTerm)
			// if query
			if (!searchTerm.startsWith("*")) {
				if (searchTerm.length > 0) {
					nodesFiltered(allNodes.filter(d => d.label.toLowerCase().includes(searchTerm)), false, false);
				} else {
					nodesFiltered(allNodes, false, false);
				}
			} else {
				let query = "node[*" + searchTerm.substring(1) + "]";
				let matched = jsonQuery(query, {
					data: { node: allNodes },
					allowRegexp: true
				});
				console.log(matched);
				nodesFiltered(matched.value, false, false);
			}
			updateDensityAttributes(false);
			helios.update();
			helios.render();
		}, 250);

		d3Select("#searchSelector").on("input", (event, d) => {
			updateFilteredNodes()
		})


		// Temporarily for debugging
		window.helios = helios;

	});
}

visualizeNetwork(startSettings.networkName, startSettings);
