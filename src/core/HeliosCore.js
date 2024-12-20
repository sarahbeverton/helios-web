
import * as d3Ease from "d3-ease";
import { select as d3Select } from "d3-selection";
import { zoom as d3Zoom, zoomIdentity as d3ZoomIdentity } from "d3-zoom";
import * as glm from "gl-matrix";
import * as glUtils from "../utilities/webgl.js";
import { Network } from "./Network.js";
import { HeliosScheduler } from "./Scheduler.js";
// import { drag as d3Drag } from "d3-drag";
// import { default as createGraph } from "ngraph.graph"
// import { default as createLayout } from "ngraph.forcelayout"
import { default as Pica } from "pica";
import { layoutWorker as d3ForceLayoutWorker } from "../layouts/d3force3dLayoutWorker.js";
import * as edgesShaders from "../shaders/edges.js";
import * as nodesShaders from "../shaders/nodes.js";
import { DensityGL } from "../utilities/densityGL.js";
import { SortedValueMap } from "../utilities/SortedMap.js";


let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

// throttle function
function _throttle(cb, delay = 250) {
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

/**
 * Helios object controls the network visualization visual parameters and layout
 */
export class Helios {
	// the class constructor
	/**
	 * constructor description
	 * @param {Object} config - The configuration object
	 * @param {string} [config.elementID="helios"] - The ID of the element to attach the canvas to
	 * @param {boolean} [config.density=false] - Whether to display the density
	 * @param {Object} [config.nodes={}] - The nodes object. should be a dictionary of node IDs and node attributes.
	 * 		@see {@link Network#addNodes}
	 * @param {Object[]} [config.edges=[]] - The edges array of objects. Each object should have source and target attributes.
	 * 		@see {@link Network#addEdges}
	 * @param {Network} [network=null] - Alternavely, a network object can be passed directly. If this is the case, the nodes and edges parameters are ignored.
	 * 		@see {@link Network}
	 * @param {boolean} [config.use2D=false] - Whether to use 2D mode
	 * @param {boolean} [config.orthographic=false] - Whether to use orthographic projection instead of perspective
	 * @param {boolean} [config.hyperbolic=false] - Whether to use hyperbolic mode
	 * @param {boolean} [config.fastEdges=false] - Whether to use fast edges (edges have always 1 pixel width)
	 * @param {boolean} [config.forceSupersample=false] - Whether to force supersampling (improves quality of the render even for high density displays)
	 * @param {boolean} [config.autoStartLayout=true] - Whether to start the layout automatically
	 * @param {boolean} [config.autoCleanup=true] - Whether to automatically cleanup helios if canvas or element is removed (useful for react and vue)
	 * @param {Object} [config.webglOptions=defaults] - The webgl options object. See {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext|getContext} for more information.
	 * Defaults to 
	 * 
	 * 	{
	 * 		antialias: true,
	 * 		powerPreference: "high-performance",
	 * 		desynchronized: true,
	 * 	}
	 * 
	 * 
	 * @example <caption>Example usage of the constructor.</caption>
	 * // create a new helios object
	 * let helios = new Helios({
	 * 	elementID: "helios",
	 * 	nodes: {
	 * 		"0": {label: "Node 0"},
	 * 		"1": {label: "Node 1"},
	 * 		"2": {label: "Node 2"},
	 * 		"3": {label: "Node 3"},
	 * 	},
	 * 	edges: [
	 * 		{source: "0", target: "1"},
	 * 		{source: "1", target: "2"},
	 * 		{source: "2", target: "3"},
	 * 		{source: "3", target: "0"},
	 * 	],
	 * });
	 * 
	*/
	constructor({
		element = null,
		elementID = null,
		density = false,
		nodes = {},
		edges = [],
		network = null,
		use2D = false,
		orthographic = false,
		hyperbolic = false,
		fastEdges = false,
		tracking = true,
		fieldOfView = 70,
		forceSupersample = false,
		autoStartLayout = true,
		autoCleanup = true, // cleanup helios if canvas or element is removed
		webglOptions = {},
	}) {

		/** @readonly */
		this.element = null
		if (element == null) {
			this.element = document.getElementById(elementID);
		} else {
			this.element = element;
		}
		this.element.innerHTML = '';
		const containerPosition = getComputedStyle(this.element).position;

		if (containerPosition === 'static') {
			this.container.style.position = 'relative';
		}

		/** @readonly */
		this.canvasElement = document.createElement("canvas");
		// make the canvas element fill the parent element
		this.canvasElement.style.position = 'absolute';
		this.canvasElement.style.width = '100%';
		this.canvasElement.style.height = '100%';
		this.canvasElement.style.display = 'block';
		this.canvasElement.style.boxSizing = 'border-box';
		this.element.appendChild(this.canvasElement);

		this.svgLayer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		//SVG that takes the entire space of the canvas
		this.svgLayer.style.position = 'absolute';
		this.svgLayer.style.width = '100%';
		this.svgLayer.style.height = '100%';
		this.svgLayer.style.display = 'block';
		this.svgLayer.style.boxSizing = 'border-box';
		this.svgLayer.style.pointerEvents = 'none';
		// Do I need to setup the svg bounds?
		this.element.appendChild(this.svgLayer);

		this._canvasMargins = {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
		}

		this.overlay = document.createElement("div");
		this.overlay.style.position = 'absolute';
		this.overlay.style.width = '100%';
		this.overlay.style.height = '100%';
		this.overlay.style.display = 'block';
		this.overlay.style.boxSizing = 'border-box';
		this.overlay.style.pointerEvents = 'none';
		this.element.appendChild(this.overlay);

		
		/**
		 * @public 
		 * @readonly
		 * @type {Network}
		 * @description The network object
		 * @example<caption>Example usage of the network object.</caption>
		 * // get the network object
		 * let network = helios.network;
		 * 
		 */
		if(network == null) {
			this.network = new Network(nodes, edges);
		} else {
			this.network = network;
		}

		this._autoCleanup = autoCleanup;
		this._hasCleanup = false;

		this.rotationMatrix = glm.mat4.create();

		this.translatePosition = glm.vec3.create();
		this.lastTranslatePosition = glm.vec3.create();
		this.targetTranslatePosition = glm.vec3.create();

		this.lastPanX = 0;
		this.lastPanY = 0;
		this.panX = 0;
		this.panY = 0;
		this._fieldOfView = fieldOfView;
		this.targetPanX = 0;
		this.targetPanY = 0;

		this.translateTime = 0;
		this.translateDuration = 0;
		this.mouseDown = false;
		this.lastMouseX = null;
		this.lastMouseY = null;
		this.redrawingFromMouseWheelEvent = false;
		this.fastEdges = fastEdges;
		this.animate = false;
		this.useShadedNodes = false;
		this.forceSupersample = forceSupersample;
		this.cameraDistance = 500;
		this.interacting = false;
		this.rotateLinearX = 0;
		this.rotateLinearY = 0;


		this.saveResolutionRatio = 1.0;
		this.pickingResolutionRatio = 0.25;
		this._trackingMaxPixels = 20000;
		this._trackingBufferEnabled = tracking;
		this._trackingBuffer = null;
		this._trackingBufferTexture = null;
		this._trackingBufferPixels = null;
		this._attributeTrackers = {};
		this._trackingNodeDataMinimumUpdateInterval = 200;
		this._trackingNodeMinimumUpdateInterval = 1000 / 30;


		this._updateTrackerNodesDataThrottle = _throttle(() => {
			this._updateTrackerNodesData();
		}, this._trackingNodeDataMinimumUpdateInterval);

		this._lastCanvasDimensions = [this.canvasElement.clientWidth, this.canvasElement.clientHeight];

		this._zoomFactor = 1;
		this._semanticZoomExponent = 0.25;
		this._nodesGlobalOpacityScale = 1.0;
		this._nodesGlobalOpacityBase = 0.0;

		this._nodesGlobalSizeScale = 1.0;
		this._nodesGlobalSizeBase = 0.0;

		this._edgesGlobalOpacityScale = 1.0;
		this._edgesGlobalOpacityBase = 0.0;

		this._edgesGlobalWidthScale = 0.25;
		this._edgesGlobalWidthBase = 0.0;

		this._nodesGlobalOutlineWidthScale = 1.0;
		this._nodesGlobalOutlineWidthBase = 0.0;

		this._edgesColorsFromNodes = true;
		this._edgesWidthFromNodes = true;

		this._backgroundColor = [0.5, 0.5, 0.5, 1.0];

		this._use2D = use2D || hyperbolic;
		this._orthographic = orthographic || use2D;
		this._hyperbolic = hyperbolic;
		this._autoStartLayout = autoStartLayout;
		this.useAdditiveBlending = false;
		this._pickeableEdges = new Set();
		this.scheduler = new HeliosScheduler(this, { throttle: false });
		this._webglOptions = webglOptions;

		if (this._use2D) {
			for (let vertexIndex = 0; vertexIndex < this.network.positions.length; vertexIndex++) {
				this.network.positions[vertexIndex * 3 + 2] = 0;
			}
		}

		this._edgeIndicesUpdate = true;

		glm.mat4.identity(this.rotationMatrix);
		this.gl = glUtils.createWebGLContext(this.canvasElement, this._webglOptions);

		if (density) {
			this.densityMap = new DensityGL(this.gl, this.canvasElement.clientWidth, this.canvasElement.clientHeight);
			this.densityMap.setBandwidth(10);
			this.densityMap.setKernelWeightScale(0.01);
			this.densityPlot = true;
		}

		this._centerNodes = [];
		this._centerNodesTransition = null;


		this.onNodeClickCallback = null;
		this.onNodeDoubleClickCallback = null;
		this.onNodeHoverStartCallback = null;
		this.onNodeHoverMoveCallback = null;
		this.onNodeHoverEndCallback = null;

		this.onEdgeClickCallback = null;
		this.onEdgeDoubleClickCallback = null;
		this.onEdgeHoverStartCallback = null;
		this.onEdgeHoverMoveCallback = null;
		this.onEdgeHoverEndCallback = null;


		this.onZoomCallback = null;
		this.onRotationCallback = null;
		this.onResizeCallback = null;
		this.onLayoutStartCallback = null;
		this.onLayoutStopCallback = null;
		this.onDrawCallback = null;
		this.onReadyCallback = null;
		this.onCleanupCallback = null;
		this._isReady = false;



		this._onresizeEvent = (entries) => {
			if (this.canvasElement) {
				for (let entry of entries) {
					this._willResizeEvent(entry);
				}
			}
		}

		this.resizeObserver = new ResizeObserver(this._onresizeEvent);
		this.resizeObserver.observe(this.canvasElement);


		this._initialize();
	}


	// d3-like function Set/Get
	//zoom()
	//rotate()
	//pan()
	//highlightNodes()
	//centerNode()


	/** Initialize the webgl context 
	 * @private
	 * @method _initialize
	 * @memberof Helios
	 * @instance
	 * 
	*/
	_initialize() {
		this._setupDensity();
		this._setupShaders();
		this._buildNodesGeometry();
		this._buildPickingBuffers();
		this._buildTrackingBuffers();
		this._buildEdgesGeometry();
		this._willResizeEvent(0);

		this._setupCamera();
		this._setupEvents();
		this._setupLayout();
		this.scheduler.start();
		this.onReadyCallback?.(this);
		// this.redraw();
		this.onReadyCallback = null;

		this._isReady = true;
	}

	/** Setup the layout worker
	 * @private
	 * @method _setupLayout
	 * @memberof Helios
	 * @instance
	 */
	_setupLayout() {
		this._layoutLastUpdate = null;
		this._alpha = 0.001;
		// this.layoutWorker = new Worker(new URL('../layouts/ngraphLayoutWorker.js', import.meta.url));
		// this.layoutWorker = new Worker(new URL('../layouts/d3force3dLayoutWorker.js', import.meta.url));
		this.newPositions = this.network.positions.slice(0);
		let onlayoutUpdate = (data) => {
			this.newPositions = data.positions;
			if (!this._layoutLastUpdate) {
				this._layoutLastUpdate = performance.now();
			}
			let layoutElapsedTime = performance.now() - this._layoutLastUpdate;
			if (layoutElapsedTime < 200) {
				layoutElapsedTime = 200;
			} else if (layoutElapsedTime > 2500) {
				layoutElapsedTime = 2500;
			}

			this._alpha = 1.0 / layoutElapsedTime;

			let interpolatorTask = {
				name: "1.1.positionInterpolator",
				callback: (elapsedTime, task) => {
					let maxDisplacement = 0;
					const alpha = this._alpha;
					const positionsLength = this.network.positions.length;
					const newPositions = this.newPositions;
					const previousPositions = this.network.positions;
					for (let index = 0; index < positionsLength; index++) {
						const displacement = newPositions[index] - previousPositions[index];

						previousPositions[index] += alpha * (displacement) * elapsedTime;

						maxDisplacement = Math.max(Math.abs(displacement), maxDisplacement);
					};

					this._updateCenterNodesPosition();
					this._updateCameraInterpolation(true);
					// console.log(this.scheduler._averageFPS);

					if (maxDisplacement < 1) {
						this.scheduler.unschedule("1.1.positionInterpolator");
					}
				},
				delay: 0,
				repeat: true,
				synchronized: true,
				immediateUpdates: false,
				redraw: true,
				updateNodesGeometry: true,
				updateEdgesGeometry: true,
			}
			this.scheduler.schedule({
				name: "1.0.positionChange",
				callback: (elapsedTime, task) => {
					// let maxDisplacement = 0;
					// for (let index = 0; index < this.network.positions.length; index++) {
					// 	let displacement = this.newPositions[index] - this.network.positions[index];
					// 	maxDisplacement = Math.max(Math.abs(displacement), maxDisplacement);
					// };
					this.scheduler.schedule(interpolatorTask);
					// console.log(this.scheduler._averageFPS);
				},
				delay: 0,
				repeat: false,
				synchronized: true,
				immediateUpdates: false,
				redraw: false,
				updateNodesGeometry: false,
				updateEdgesGeometry: false,
			});
		};

		let onLayoutStop = () => {
			this.onLayoutStopCallback?.();
		}

		let onLayoutStart = () => {
			this._layoutLastUpdate = null;
			this.onLayoutStartCallback?.();
		}


		this.layoutWorker = new d3ForceLayoutWorker({
			network: this.network,
			onUpdate: onlayoutUpdate,
			onStop: onLayoutStop,
			onStart: onLayoutStart,
			use2D: this._use2D
		});
		console.log("Set layout worker",this.layoutWorker)

		if (this._autoStartLayout) {
			this.layoutWorker.start();
			console.log("Start",this.layoutWorker)
		}



	}

	/** Setup the density map
	 * @private
	 * @method _setupDensity
	 * @memberof Helios
	 * @instance
	 * 
	 */
	_setupDensity() {

		if (this.densityMap) {
			this.densityWeights = new Float32Array(this.network.nodeCount);
			let maxDegree = 1
			for (let i = 0; i < this.network.nodeCount; i++) {
				let degree = this.network.nodes[i].edges.length
				this.densityWeights[i] = degree;
				maxDegree = Math.max(maxDegree, degree);
			}
			for (let i = 0; i < this.network.nodeCount; i++) {
				this.densityWeights[i] /= maxDegree;
			}
		}
	}


	/**
	 * Pauses the layout computation of the network visualization.
	 * @public
	 * @method pauseLayout
	 * @memberof Helios
	 * @instance
	 * @chainable
	 * @returns {this} Returns the current Helios instance for chaining
	 * 
	 */
	pauseLayout() {
		this.layoutWorker.pause();
		console.log("Pause",this.layoutWorker)
		return this;
	}

	/**
	 * Resumes the layout computation of the network visualization after it has been paused.
	 * @public
	 * @method resumeLayout
	 * @memberof Helios
	 * @instance
	 * @chainable
	 * @returns {this} Returns the current Helios instance for chaining
	 * 
	 */
	resumeLayout() {
		this.layoutWorker.resume();
		console.log("Resume",this.layoutWorker)
		return this;
	}

	/**
	 * Calls the appropriate event callback based on the given pickID, eventType, and event.
	 * @private
	 * @method _callEventFromPickID
	 * @memberof Helios
	 * @instance
	 * @param {number} pickID - The unique identifier for the picked node or edge.
	 * @param {string} eventType - The type of event to be triggered (e.g., click, doubleClick, hoverStart, hoverMove, hoverEnd).
	 * @param {Event} event - The original DOM event associated with the interaction.
	 * 
	 */
	_callEventFromPickID(pickID, eventType, event) {
        let pickObject = null;
        let isNode = true;
        if (pickID >= 0) {
            let nodePick = null;
            // first check for nodes
            if (pickID < this.network.nodeCount) {
                isNode = true;
                nodePick = this.network.index2Node[pickID];
            }
            
            // only select edge if there is not a node
            if (!nodePick && pickID >= this.network.nodeCount) {
                let edgeIndex = pickID - this.network.nodeCount;
                if (edgeIndex < this.network.indexedEdges.length / 2) {
                    let edge = {
                        "source": this.network.index2Node[this.network.indexedEdges[2 * edgeIndex]],
                        "target": this.network.index2Node[this.network.indexedEdges[2 * edgeIndex + 1]],
                        "index": edgeIndex
                    }
                    isNode = false;
                    pickObject = edge;
                }
            }

            if (nodePick) {
                isNode = true;
                pickObject = nodePick;
            }
		}
		// if(eventType!="hoverMove"){
		// 	console.log({
		// 		isNode: isNode,
		// 		eventType: eventType,
		// 		pickObject: pickObject,
		// 	})
		// }
		if (pickObject) {
			switch (eventType) {
				case "click": {
					if (isNode) {
						this.onNodeClickCallback?.(pickObject, event);
					} else {
						this.onEdgeClickCallback?.(pickObject, event);
					}
					break;
				}
				case "doubleClick": {
					if (isNode) {
						this.onNodeDoubleClickCallback?.(pickObject, event);
					} else {
						this.onEdgeDoubleClickCallback?.(pickObject, event);
					}
					break;
				}
				case "hoverStart": {
					if (isNode) {
						this.onNodeHoverStartCallback?.(pickObject, event);
					} else {
						this.onEdgeHoverStartCallback?.(pickObject, event);
					}
					break;
				}
				case "hoverMove": {
					if (isNode) {
						this.onNodeHoverMoveCallback?.(pickObject, event);
					} else {
						this.onEdgeHoverMoveCallback?.(pickObject, event);
					}
					break;
				}
				case "hoverEnd": {
					if (isNode) {
						this.onNodeHoverEndCallback?.(pickObject, event);
					} else {
						this.onEdgeHoverEndCallback?.(pickObject, event);
					}
					break;
				}
				default:
					break;
			}
		}
	}

	/**
	 * Sets up event listeners for user interactions such as click, double-click, and hover events.
	 * @private
	 * @method _setupEvents
	 * @memberof Helios
	 * @instance
	 * 
	 */
	_setupEvents() {
		this.lastMouseX = -1;
		this.lastMouseY = -1;

		this.currentHoverIndex = -1;

		if (this._autoCleanup) {
			this._mutationObserver = new MutationObserver((events) => {
				for (let index = 0; index < events.length; index++) {
					let event = events[index];
					if (event.type == "childList") {
						if (event.removedNodes.length > 0) {
							for (let index = 0; index < event.removedNodes.length; index++) {
								let element = event.removedNodes[index];
								if (element == this.canvasElement || element == this.element) {
									this._mutationObserver.disconnect();
									this.cleanup();
									return;
								}
							}
						}
					}
				}

				// if (element.removedNodes.length > 0) {
				// 	console.log("Element removed");
				// 	this._mutationObserver.disconnect();
				// 	this.cleanup();
				// }
			});

			this._mutationObserver.observe(this.element, { childList: true });
			this._mutationObserver.observe(this.element.parentNode, { childList: true });
		}

		//Event listeners
		this._clickEventListener = (event) => {
			const rect = this.canvasElement.getBoundingClientRect();

			this.lastMouseX = event.clientX;
			this.lastMouseY = event.clientY;
			const pickID = this.pickPoint(this.lastMouseX - rect.left, this.lastMouseY - rect.top);
			if (pickID >= 0) {
				this._callEventFromPickID(pickID, "click", event);
			} else {
				this.onNodeClickCallback?.(null, event);
				this.onEdgeClickCallback?.(null, event);
			}
		};

		this._doubleClickEventListener = (event) => {
			const rect = this.canvasElement.getBoundingClientRect();

			this.lastMouseX = event.clientX;
			this.lastMouseY = event.clientY;
			const pickID = this.pickPoint(this.lastMouseX - rect.left, this.lastMouseY - rect.top);
			if (pickID >= 0) {
				this._callEventFromPickID(pickID, "doubleClick", event);
			} else {
				this.onNodeDoubleClickCallback?.(null, event);
				this.onEdgeDoubleClickCallback?.(null, event);
			}
		};

		this._hoverMoveEventListener = (event) => {
			this.lastMouseX = event.clientX;
			this.lastMouseY = event.clientY;
		
			const rect = this.canvasElement.getBoundingClientRect();
			const pickID = this.pickPoint(this.lastMouseX - rect.left, this.lastMouseY - rect.top);
		
			// Prioritize nodes for hover events
			if (pickID >= 0) {
				this._callEventFromPickID(pickID, "hoverMove", event);
			} else {
				// If no node or edge is found, trigger hover events with null
				this.onNodeHoverMoveCallback?.(null, event);
				this.onEdgeHoverMoveCallback?.(null, event);
			}
		};
		

		this._hoverLeaveEventListener = (event) => {
			if (this.currentHoverIndex >= 0) {
				this._callEventFromPickID(this.currentHoverIndex, "hoverEnd", event);
				this.currentHoverIndex = -1;
				this.lastMouseX = -1;
				this.lastMouseY = -1;
			}
		};

		this._hoverLeaveWindowEventListener = (event) => {
			if (!event.relatedTarget && !event.toElement) {
				if (this.currentHoverIndex >= 0) {
					this._callEventFromPickID(this.currentHoverIndex, "hoverEnd", event);
					this.currentHoverIndex = -1;
					this.lastMouseX = -1;
					this.lastMouseY = -1;
				}
			}
		};

		// this.canvasElement.onclick = this._clickEventListener;
		// this.canvasElement.ondblclick = this._doubleClickEventListener;

		this.canvasElement.addEventListener("click", this._clickEventListener);
		this.canvasElement.addEventListener("dblclick", this._doubleClickEventListener);

		this.canvasElement.addEventListener("mousemove", this._hoverMoveEventListener);
		this.canvasElement.addEventListener("mouseleave", this._hoverLeaveEventListener);
		document.body.addEventListener("mouseout", this._hoverLeaveWindowEventListener);
	}

	/**
	 * Downloads the image data as a file with the specified filename, supersampling factor, and file format.
	 * @private
	 * @method _downloadImageData
	 * @memberof Helios
	 * @instance
	 * @param {ImageData} imageData - The image data to be downloaded.
	 * @param {string} filename - The name of the file to be downloaded.
	 * @param {number} supersampleFactor - The supersampling factor for resizing the image.
	 * @returns {Promise<void>} A Promise that resolves when the download is complete.
	 */
	async _downloadImageData(imageData, filename, supersampleFactor, scale = 1.0) {
		// let canvas = document.getElementById('SUPERCANVAS');
		let pica = new Pica({
			// features:["all"],
		})
		let canvas = document.createElement('canvas');
		let canvasFullSize = document.createElement('canvas');
		let ctx = canvas.getContext('2d');
		let ctxFullSize = canvasFullSize.getContext('2d');
		canvasFullSize.width = imageData.width;
		canvasFullSize.height = imageData.height;
		console.log(imageData.width, imageData.height, supersampleFactor, scale);
		canvas.width = imageData.width / supersampleFactor;
		canvas.height = imageData.height / supersampleFactor;
		ctx.imageSmoothingEnabled = true;
		ctxFullSize.imageSmoothingEnabled = true;
		if (typeof ctx.imageSmoothingQuality !== 'undefined') {
			ctx.imageSmoothingQuality = 'high';
		}
		if (typeof ctxFullSize.imageSmoothingQuality !== 'undefined') {
			ctxFullSize.imageSmoothingQuality = 'high';
		}

		// let dpr = window.devicePixelRatio || 1;
		// canvas.style.width =  canvas.width/dpr/10 + "px";
		// canvas.style.height = canvas.height/dpr/10 + "px";


		ctxFullSize.putImageData(imageData, 0, 0);
		ctxFullSize.transform(1, 0, 0, -1, 0, canvasFullSize.height)
		ctxFullSize.globalCompositeOperation = "copy"; // if you have transparent pixels
		ctxFullSize.drawImage(ctxFullSize.canvas, 0, 0);
		ctxFullSize.globalCompositeOperation = "source-over"; // reset to default

		await pica.resize(canvasFullSize, canvas, {
			alpha: true,
		});

		// ctxFullSize.drawImage(canvasFullSize, 0, 0,canvasFullSize.width*0.5,canvasFullSize.height*0.5,0,0,
		// 	imagedata.width/supersampleFactor,
		// 	imagedata.height/supersampleFactor);
		// ctx.drawImage(canvasFullSize, 0, 0,canvasFullSize.width,canvasFullSize.height,0,0,
		// 	imagedata.width/supersampleFactor,
		// 	imagedata.height/supersampleFactor);


		// let image = new Image();
		// let imageSRC = canvas.toDataURL()
		// image.src = imageSRC;
		let downloadLink = document.createElement('a');
		// console.log(["CANVAS",imageSRC]);


		if (isSafari) {
			// BUG in Safari
			// console.log("Workaround safari bug...");
			canvas.toDataURL();
		}

		downloadLink.setAttribute('download', filename);
		let blob = await pica.toBlob(canvas, "image/png");
		if (blob) {
			if (filename.endsWith("svg")) {
				//Create offscreen
				// let svgText = `
				// <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
				// width="${canvas.width/scale}" height="${canvas.height/scale}"
				// >
				// <image
				// 		width="${canvas.width/scale}" height="${canvas.height/scale}"
				// 		xlink:href="${canvas.toDataURL()}"
				// 		/>
				// `;
				// generate this svg using code
				let svgText =
					`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ` +
					` width="${canvas.width / scale}" height="${canvas.height / scale}"` +
					` viewBox="0 0 ${canvas.width / scale} ${canvas.height / scale}"` +
					` >` +
					`<image width="${canvas.width / scale}" height="${canvas.height / scale}" xlink:href="${canvas.toDataURL()}" />`;

				let svgLayerContent = this.svgLayer.innerHTML;
				svgText += svgLayerContent;

				svgText += `</svg>`;
				downloadLink.setAttribute('download', filename);
				let blobSVG = new Blob([svgText], { type: 'image/svg+xml' });
				let url = URL.createObjectURL(blobSVG);
				downloadLink.setAttribute('href', url);
				downloadLink.click();

			} else {
				let url = URL.createObjectURL(blob);
				downloadLink.setAttribute('href', url);
				downloadLink.click();
			}
		} else {
			window.alert(`An error occured while trying to download the image. Please try again. (Error: blob is null.)`);
			// console.log("BLOB IS NULL");
		}

		// if (filename.endsWith("svg")) {
		// 	let svgText = `
		// 	<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
		// 	width="${canvas.width}" height="${canvas.width}"
		// 	>
		// 	<image
		// 			width="${canvas.width}" height="${canvas.width}"
		// 			xlink:href="${canvas.toDataURL()}"
		// 			/>

		// 	`;
		// 	// add contents of svgLayer to svgText without the svg tag
		// 	let svgLayerContent = this.svgLayer.innerHTML;
		// 	svgLayerContent = svgLayerContent.replace(/<svg[^>]*>/, "");
		// 	svgLayerContent = svgLayerContent.replace(/<\/svg>/, "");
		// 	svgText += svgLayerContent;

		// 	svgText+=`</svg>`;
		// 	downloadLink.setAttribute('download', filename);
		// 	let blob = new Blob([svgText], { type: 'image/svg+xml' });
		// 	let url = URL.createObjectURL(blob);
		// 	downloadLink.setAttribute('href', url);
		// 	downloadLink.click();
		// } else if (false) {
		// 	downloadLink.setAttribute('download', filename);
		// 	downloadLink.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
		// 	downloadLink.click();
		// } else {

		// 	// canvas.toBlob(function(blob) {
		// 	// 	console.log(["CANVAS",blob]);
		// 	// 	let trials = 3;
		// 	// 	let success = false;
		// 	// 	let lastError = null;
		// 	// 	while(trials>0 && !success){
		// 	// 		// FIXME: Safari BUG
		// 	// 		try {
		// 	// 			let url = URL.createObjectURL(blob);
		// 	// 			downloadLink.setAttribute('href', url);
		// 	// 			downloadLink.click();
		// 	// 			success=true;
		// 	// 		} catch (error) {
		// 	// 			lastError = error;
		// 	// 		}
		// 	// 		trials--;
		// 	// 	}
		// 	// 	if(!success){
		// 	// 		window.alert(`An error occured while trying to download the image. Please try again. (Error: ${lastError})`)
		// 	// 	}
		// 	// });
		// }
	}


	/**
	 * Returns the image data from the specified framebuffer.
	 * @private
	 * @method _framebufferImage
	 * @memberof Helios
	 * @instance
	 * @param {WebGLFramebuffer} framebuffer - The WebGLFramebuffer from which to read the image data.
	 * @returns {ImageData} An ImageData object containing the image data from the framebuffer.
	 */
	_framebufferImage(framebuffer) {
		const fbWidth = framebuffer.size.width;
		const fbHeight = framebuffer.size.height;
		const data = new Uint8ClampedArray(4 * fbWidth * fbHeight);
		const gl = this.gl;
		gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
		gl.readPixels(
			0,            // x
			0,            // y
			fbWidth,                 // width
			fbHeight,                 // height
			gl.RGBA,           // format
			gl.UNSIGNED_BYTE,  // type
			data);             // typed array to hold result

		return new ImageData(data, fbWidth, fbHeight);
	}

	/**
	 * Exports the current figure to an image file.
	 * @method exportFigure
	 * @memberof Helios
	 * @instance
	 * @param {string} filename - The filename for the exported image, including the extension (e.g., "image.png").
	 * @param {Object} options - An object containing export options.
	 * @param {number} [options.scale=1.0] - The scale factor for the exported image.
	 * @param {number} [options.supersampleFactor=4.0] - The supersampling factor for the exported image.
	 * @param {number|null} [options.width=null] - The width of the exported image. If null, the current canvas width is used.
	 * @param {number|null} [options.height=null] - The height of the exported image. If null, the current canvas height is used.
	 * @param {string|null} [options.backgroundColor=null] - The background color of the exported image. If null, the current background color is used.
	 * @example
	 * helios.exportFigure("figure.png", {
	 *   scale: 1.0,
	 *   supersampleFactor: 4.0,
	 *   width: 800,
	 *   height: 600,
	 *   backgroundColor: "#FFFFFF",
	 * });
	 */
	exportFigure(filename, {
		scale,
		supersampleFactor,
		width = null,
		height = null,
		backgroundColor = null,
	}) {
		if (typeof (scale) === 'undefined') {
			scale = 1.0;
		}
		if (typeof (supersampleFactor) === 'undefined') {
			supersampleFactor = 2.0;
		}
		let framebuffer = this._createOffscreenFramebuffer();
		if (width == null && height == null) {
			width = this.canvasElement.clientWidth;
			height = this.canvasElement.clientHeight;
		} else if (!width) {
			width = Math.round(height * this.canvasElement.width / this.canvasElement.height);
		} else if (!height) {
			height = Math.round(width * this.canvasElement.height / this.canvasElement.width);
		}
		if (!backgroundColor) {
			backgroundColor = this.backgroundColor;
		}
		framebuffer.setSize(width * scale * supersampleFactor, height * scale * supersampleFactor);
		framebuffer.backgroundColor = backgroundColor;
		this._redrawAll(framebuffer);
		let image = this._framebufferImage(framebuffer);
		this._downloadImageData(image, filename, supersampleFactor, scale);

		framebuffer.discard();
	}

	/**
	 * Forces triggering hover events based on the current mouse position.
	 * @method triggerHoverEvents
	 * @memberof Helios
	 * @instance
	 * @param {Event} event - The MouseEvent object associated with the triggering event (e.g., mousemove, touchmove).
	 * @param {boolean} shallCancel - If true, the method returns immediately without triggering any events.
	 * @example
	 * helios.triggerHoverEvents(event, false);
	 */
	triggerHoverEvents(event, shallCancel) {
		if (!this._isReady) {
			return;
		}
		if (this.lastMouseX == -1 || this.lastMouseY == -1) {
			return;
		}

		let pickID = -1;
		if (!this.interacting) {
			const rect = this.canvasElement.getBoundingClientRect();
			pickID = this.pickPoint(this.lastMouseX - rect.left, this.lastMouseY - rect.top);
		}
		// let nodesCount = 
		if (pickID >= 0 && this.currentHoverIndex == -1) {
			this.currentHoverIndex = pickID;
			this._callEventFromPickID(pickID, "hoverStart", event);
		} else if (pickID >= 0 && this.currentHoverIndex == pickID) {
			// console.log("mouse: ",this.lastMouseX,this.lastMouseY)
			this._callEventFromPickID(pickID, "hoverMove", event);
		} else if (pickID >= 0 && this.currentHoverIndex != pickID) {
			this._callEventFromPickID(this.currentHoverIndex, "hoverEnd", event);
			this.currentHoverIndex = pickID;
			this._callEventFromPickID(pickID, "hoverStart", event);
		} else if (pickID == -1 && this.currentHoverIndex != pickID) {
			this._callEventFromPickID(this.currentHoverIndex, "hoverEnd", event);
			this.currentHoverIndex = -1;
		}
	}


	/**
	 * Initializes the shader programs used for rendering nodes and edges.
	 * @method _setupShaders
	 * @memberof Helios
	 * @instance
	 * @private
	 */
	_setupShaders() {
		const gl = this.gl;

		this.edgesShaderProgram = new glUtils.ShaderProgram(
			glUtils.getShaderFromString(gl, this._hyperbolic ? edgesShaders.vertexHyperbolicShader : edgesShaders.vertexShader, gl.VERTEX_SHADER),
			glUtils.getShaderFromString(gl, edgesShaders.fragmentShader, gl.FRAGMENT_SHADER),
			["viewMatrix", "projectionMatrix", "nearFar",
				"globalOpacityScale", "globalWidthScale", "globalSizeScale", "globalOpacityBase", "globalWidthBase", "globalSizeBase"],
			["fromVertex", "toVertex", "vertexType", "fromColor", "toColor", "fromSize", "toSize", "encodedIndex"],
			this.gl);

		this.edgesFastShaderProgram = new glUtils.ShaderProgram(
			glUtils.getShaderFromString(gl, this._hyperbolic ? edgesShaders.fastVertexHyperbolicShader : edgesShaders.fastVertexShader, gl.VERTEX_SHADER),
			glUtils.getShaderFromString(gl, edgesShaders.fastFragmentShader, gl.FRAGMENT_SHADER),
			["projectionViewMatrix", "nearFar", "globalOpacityScale", "globalOpacityBase"],
			["vertex", "color"],
			this.gl);

		this.edgesPickingShaderProgram = new glUtils.ShaderProgram(
			glUtils.getShaderFromString(gl, this._hyperbolic ? edgesShaders.vertexHyperbolicShader : edgesShaders.vertexShader, gl.VERTEX_SHADER),
			glUtils.getShaderFromString(gl, edgesShaders.pickingShader, gl.FRAGMENT_SHADER),
			["viewMatrix", "projectionMatrix", "nearFar",
				"globalOpacityScale", "globalWidthScale", "globalSizeScale", "globalOpacityBase", "globalWidthBase", "globalSizeBase"],
			["fromVertex", "toVertex", "vertexType", "fromColor", "toColor", "fromSize", "toSize", "encodedIndex"],
			this.gl);


		this.nodesShaderProgram = new glUtils.ShaderProgram(
			glUtils.getShaderFromString(gl, this._hyperbolic ? nodesShaders.vertexHyperbolicShader : nodesShaders.vertexShader, gl.VERTEX_SHADER),
			glUtils.getShaderFromString(gl, nodesShaders.fragmentShader, gl.FRAGMENT_SHADER),
			["viewMatrix", "projectionMatrix", "normalMatrix",
				"globalOpacityScale", "globalSizeScale", "globalOutlineWidthScale", "globalOpacityBase", "globalSizeBase", "globalOutlineWidthBase"],
			["vertex", "position", "color", "size", "outlineWidth", "outlineColor", "encodedIndex"], this.gl);

		this.nodesFastShaderProgram = new glUtils.ShaderProgram(
			glUtils.getShaderFromString(gl, this._hyperbolic ? nodesShaders.vertexHyperbolicShader : nodesShaders.vertexShader, gl.VERTEX_SHADER),
			glUtils.getShaderFromString(gl, nodesShaders.fastFragmentShader, gl.FRAGMENT_SHADER),
			["viewMatrix", "projectionMatrix", "normalMatrix",
				"globalOpacityScale", "globalSizeScale", "globalOutlineWidthScale", "globalOpacityBase", "globalSizeBase", "globalOutlineWidthBase"],
			["vertex", "position", "color", "size", "outlineWidth", "outlineColor", "encodedIndex"], this.gl);

		this.nodesPickingShaderProgram = new glUtils.ShaderProgram(
			glUtils.getShaderFromString(gl, this._hyperbolic ? nodesShaders.vertexHyperbolicShader : nodesShaders.vertexShader, gl.VERTEX_SHADER),
			glUtils.getShaderFromString(gl, nodesShaders.pickingShader, gl.FRAGMENT_SHADER),
			["viewMatrix", "projectionMatrix", "normalMatrix",
				"globalOpacityScale", "globalSizeScale", "globalOutlineWidthScale", "globalOpacityBase", "globalSizeBase", "globalOutlineWidthBase"],
			["vertex", "position", "color", "size", "outlineWidth", "outlineColor", "encodedIndex"], this.gl);
	}


	/**
	 * Initializes the picking framebuffer used for object selection.
	 * @method _buildPickingBuffers
	 * @memberof Helios
	 * @instance
	 * @private
	 */
	_buildPickingBuffers() {
		const gl = this.gl;
		this.pickingFramebuffer = this._createOffscreenFramebuffer();
	}

	/**
	 * Initializes the tracking framebuffer used for getting the displayed objects.
	 * @method _buildTrackingBuffers
	 * @memberof Helios
	 * @instance
	 * @private
	 */
	_buildTrackingBuffers() {
		const gl = this.gl;
		if (this._trackingBufferEnabled) {
			this._trackingFramebuffer = this._createOffscreenFramebuffer();
		}
	}


	/**
	 * Creates and initializes an offscreen framebuffer for rendering operations.
	 * @method createOffscreenFramebuffer
	 * @memberof Helios
	 * @instance
	 * @returns {WebGLFramebuffer} An offscreen framebuffer with associated texture and depth buffer.
	 * @private
	 */
	_createOffscreenFramebuffer() {
		const gl = this.gl;
		let framebuffer = gl.createFramebuffer();
		framebuffer.texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, framebuffer.texture);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

		framebuffer.depthBuffer = gl.createRenderbuffer();
		gl.bindRenderbuffer(gl.RENDERBUFFER, framebuffer.depthBuffer);

		// Create and bind the framebuffer
		gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
		framebuffer.size = {
			width: 0,
			height: 0,
		};

		framebuffer.setSize = (width, height) => {
			gl.bindTexture(gl.TEXTURE_2D, framebuffer.texture);
			// define size and format of level 0
			const level = 0;
			const internalFormat = gl.RGBA;
			const border = 0;
			const format = gl.RGBA;
			const type = gl.UNSIGNED_BYTE;
			const data = null;
			const fbWidth = width;
			const fbHeight = height;
			gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
				fbWidth, fbHeight, border, format, type, data);
			gl.bindRenderbuffer(gl.RENDERBUFFER, framebuffer.depthBuffer);
			gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, fbWidth, fbHeight);
			framebuffer.size.width = width;
			framebuffer.size.height = height;
		};

		framebuffer.discard = () => {
			gl.deleteRenderbuffer(framebuffer.depthBuffer);
			gl.deleteTexture(framebuffer.texture);
			gl.deleteFramebuffer(framebuffer);
		}
		// attach the texture as the first color attachment
		const attachmentPoint = gl.COLOR_ATTACHMENT0;
		const level = 0;
		gl.framebufferTexture2D(gl.FRAMEBUFFER, attachmentPoint, gl.TEXTURE_2D, framebuffer.texture, level);

		// make a depth buffer and the same size as the targetTexture
		gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, framebuffer.depthBuffer);
		return framebuffer;
	}

	/**
	 * Builds the nodes geometry and creates related WebGL buffers.
	 * @method _buildNodesGeometry
	 * @memberof Helios
	 * @instance
	 * @private
	 */
	_buildNodesGeometry() {
		const gl = this.gl;
		let sphereQuality = 20;
		// this.nodesGeometry = glUtils.makeSphere(gl, 1.0, sphereQuality, sphereQuality);
		this.nodesGeometry = glUtils.makePlane(gl, false, false);
		// //vertexShape = makeBox(gl);



		this.nodesPositionBuffer = gl.createBuffer();
		this.nodesColorBuffer = gl.createBuffer();
		this.nodesSizeBuffer = gl.createBuffer();
		this.nodesOutlineWidthBuffer = gl.createBuffer();
		this.nodesOutlineColorBuffer = gl.createBuffer();
		this.nodesIndexBuffer = gl.createBuffer();

		//encodedIndex
		this.nodesIndexArray = new Float32Array(this.network.index2Node.length * 4);
		for (let ID = 0; ID < this.network.index2Node.length; ID++) {
			this.nodesIndexArray[4 * ID] = (((ID + 1) >> 0) & 0xFF) / 0xFF;
			this.nodesIndexArray[4 * ID + 1] = (((ID + 1) >> 8) & 0xFF) / 0xFF;
			this.nodesIndexArray[4 * ID + 2] = (((ID + 1) >> 16) & 0xFF) / 0xFF;
			this.nodesIndexArray[4 * ID + 3] = (((ID + 1) >> 24) & 0xFF) / 0xFF;
		}

		gl.bindBuffer(gl.ARRAY_BUFFER, this.nodesIndexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, this.nodesIndexArray, gl.STATIC_DRAW);
		// console.log(this.nodesIndexArray)

		this.updateNodesGeometry();
	}

	/** Updates the density map with the current node positions.
	 * @method updateDensityMap
	 * @memberof Helios
	 * @instance
	 * @chainable
	 * @example<caption>Update the density map</caption>
	 * helios.updateDensityMap();
	 * @example<caption>Update the density map and render the scene</caption>
	 * helios.updateDensityMap().render();
	 * @returns {this} Returns the current Helios instance for chaining.
	 */
	updateDensityMap() {
		let positions = this.network.positions;
		this.densityMap?.setData(positions);
		this.densityMap?.setWeights(this.densityWeights);
		return this;
	}


	/** Force update of Nodes Geometry.
	 * @method updateNodesGeometry
	 * @memberof Helios
	 * @instance
	 * @chainable
	 * @example<caption>Update the nodes geometry</caption>
	 * helios.updateNodesGeometry();
	 * @example<caption>Update the nodes geometry and render the scene</caption>
	 * helios.updateNodesGeometry().render();
	 * @returns {this} Returns the current Helios instance for chaining.
	 */
	updateNodesGeometry() {

		const gl = this.gl;

		let positions = this.network.positions;

		this.updateDensityMap();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.nodesPositionBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);

		let colors = this.network.colors;
		gl.bindBuffer(gl.ARRAY_BUFFER, this.nodesColorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

		let sizes = this.network.sizes;
		gl.bindBuffer(gl.ARRAY_BUFFER, this.nodesSizeBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);

		let outlineWidths = this.network.outlineWidths;
		gl.bindBuffer(gl.ARRAY_BUFFER, this.nodesOutlineWidthBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, outlineWidths, gl.STATIC_DRAW);

		let outlineColors = this.network.outlineColors;
		gl.bindBuffer(gl.ARRAY_BUFFER, this.nodesOutlineColorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, outlineColors, gl.STATIC_DRAW);


		// //Depth test is essential for the desired effects

		// gl.disable(gl.CULL_FACE);
		// gl.frontFace(gl.CCW);
		return this;
	}


	/** Initializes the geometry and buffers used for rendering edges.
	 * @method _buildFastEdgesGeometry
	 * @memberof Helios
	 * @instance
	 * @private
	 */
	_buildFastEdgesGeometry() {
		const gl = this.gl;
		let edges = this.network.indexedEdges;
		let positions = this.network.positions;
		let colors = this.network.colors;

		let indicesArray;
		this.fastEdgesGeometry = null;
		this.fastEdgesIndicesArray = null;
		let newGeometry = new Object();
		//FIXME: If num of vertices > 65k, we need to store the geometry in two different indices objects
		if (positions.length < 65535) {
			indicesArray = new Uint16Array(edges);
			newGeometry.indexType = gl.UNSIGNED_SHORT;
		} else {
			var uints_for_indices = gl.getExtension("OES_element_index_uint");
			if (uints_for_indices == null) {
				indicesArray = new Uint16Array(edges);
				newGeometry.indexType = gl.UNSIGNED_SHORT;
			} else {
				indicesArray = new Uint32Array(edges);
				newGeometry.indexType = gl.UNSIGNED_INT;
			}
		}

		// create the lines buffer 2 vertices per geometry.
		newGeometry.vertexObject = gl.createBuffer();
		newGeometry.colorObject = gl.createBuffer();
		newGeometry.numIndices = indicesArray.length;
		newGeometry.indexObject = gl.createBuffer();

		this.fastEdgesGeometry = newGeometry;
		this.fastEdgesIndicesArray = indicesArray;

	}

	/** Initializes the geometry and buffers used for advanced rendering edges.
	 * @method _buildAdvancedEdgesGeometry
	 * @memberof Helios
	 * @instance
	 * @private
	 */
	_buildAdvancedEdgesGeometry() {
		const gl = this.gl;
		let edgeVertexTypeArray = [
			0, 1,
			0, 0,
			1, 1,
			1, 0,
		];
		let newGeometry = new Object();
		newGeometry.edgeVertexTypeBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, newGeometry.edgeVertexTypeBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(edgeVertexTypeArray), gl.STATIC_DRAW);

		newGeometry.verticesBuffer = gl.createBuffer();
		newGeometry.colorBuffer = gl.createBuffer();
		newGeometry.sizeBuffer = gl.createBuffer();
		// this.nodesOutlineWidthBuffer = gl.createBuffer();
		// this.nodesOutlineColorBuffer = gl.createBuffer();
		newGeometry.indexBuffer = gl.createBuffer();

		this.edgesGeometry = newGeometry;
		this.edgesGeometry.count = this.network.indexedEdges.length / 2;

		//encodedIndex
		this.edgesGeometry.edgesIndexArray = new Float32Array(this.network.indexedEdges.length * 4 / 2);
		this._edgeIndicesUpdate = true;
		// console.log(this.nodesIndexArray)
	}

	/** Initializes the geometry and buffers used for rendering edges.
	 * @method _buildEdgesGeometry
	 * @memberof Helios
	 * @instance
	 * @private
	 */
	_buildEdgesGeometry() {
		if (this.fastEdges) {
			this._buildFastEdgesGeometry();
		} else {
			this._buildAdvancedEdgesGeometry();
		}
		this.updateEdgesGeometry()
	}


	/** Updates the indices used for picking edges.
	 * @method _updateEdgeIndices
	 * @memberof Helios
	 * @instance
	 * @private
	 */
	_updateEdgeIndices() {
		if (this._edgeIndicesUpdate) {
			const gl = this.gl;
			for (let ID = 0; ID < this.network.indexedEdges.length / 2; ID++) {
				let edgeID = this.network.index2Node.length + ID;
				if (this._pickeableEdges.has(ID)) {
					this.edgesGeometry.edgesIndexArray[4 * ID] = (((edgeID + 1) >> 0) & 0xFF) / 0xFF;
					this.edgesGeometry.edgesIndexArray[4 * ID + 1] = (((edgeID + 1) >> 8) & 0xFF) / 0xFF;
					this.edgesGeometry.edgesIndexArray[4 * ID + 2] = (((edgeID + 1) >> 16) & 0xFF) / 0xFF;
					this.edgesGeometry.edgesIndexArray[4 * ID + 3] = (((edgeID + 1) >> 24) & 0xFF) / 0xFF;
				} else {
					this.edgesGeometry.edgesIndexArray[4 * ID] = 0;
					this.edgesGeometry.edgesIndexArray[4 * ID + 1] = 0;
					this.edgesGeometry.edgesIndexArray[4 * ID + 2] = 0;
					this.edgesGeometry.edgesIndexArray[4 * ID + 3] = 0;
				}
			}
			gl.bindBuffer(gl.ARRAY_BUFFER, this.edgesGeometry.indexBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, this.edgesGeometry.edgesIndexArray, gl.DYNAMIC_DRAW);
			this._edgeIndicesUpdate = false;
		}
	}


	/** Updates the geometry and buffers used for rendering edges.
	 * @method updateEdgesGeometry
	 * @memberof Helios
	 * @instance
	 * @chainable
	 * @param {boolean} [force=false] - Forces the update of the geometry and buffers.
	 * @returns {this} Returns the current Helios instance for chaining.
	 */
	updateEdgesGeometry() {
		const gl = this.gl;
		let edges = this.network.indexedEdges;
		let positions = this.network.positions;
		let colors = this.network.colors;
		if (this.fastEdges) {
			if (!this.fastEdgesGeometry) {
				this._buildEdgesGeometry();
			}
			gl.bindBuffer(gl.ARRAY_BUFFER, this.fastEdgesGeometry.vertexObject);
			gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STREAM_DRAW);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.fastEdgesGeometry.colorObject);
			gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.fastEdgesGeometry.indexObject);
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.fastEdgesIndicesArray, gl.STREAM_DRAW);
		} else {

			const gl = this.gl;
			this.network.updateEdgePositions();
			if (this._edgesColorsFromNodes) {
				this.network.updateEdgeColors();
			}
			if (this._edgesWidthFromNodes) {
				this.network.updateEdgeSizes();
			}
			this._updateEdgeIndices();

			let edgePositions = this.network.positions;
			gl.bindBuffer(gl.ARRAY_BUFFER, this.edgesGeometry.verticesBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, this.network.edgePositions, gl.DYNAMIC_DRAW);

			gl.bindBuffer(gl.ARRAY_BUFFER, this.edgesGeometry.colorBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, this.network.edgeColors, gl.DYNAMIC_DRAW);

			// gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.edgesGeometry.indexBuffer);
			// gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.edgesGeometry.edgesIndexArray, gl.DYNAMIC_DRAW);

			gl.bindBuffer(gl.ARRAY_BUFFER, this.edgesGeometry.sizeBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, this.network.edgeSizes, gl.DYNAMIC_DRAW);
		}
		return this;
	}


	/** Updates the all the framebuffers
	 * @method _updatePickingFramebufferSize
	 * @memberof Helios
	 * @instance
	 * @private
	 * @param {number} newWidth - The new width of the framebuffers.
	 * @param {number} newHeight - The new height of the framebuffers.
	 * @returns {this} Returns the current Helios instance for chaining.
	 */
	_resizeGL(newWidth, newHeight) {
		this.canvasElement.width = newWidth;
		this.canvasElement.height = newHeight;
		this.pickingFramebuffer.setSize(Math.round(newWidth * this.pickingResolutionRatio), Math.round(newHeight * this.pickingResolutionRatio));
		this._lastCanvasDimensions = [this.canvasElement.clientWidth, this.canvasElement.clientHeight];
		// distribute at most this.trackingMaxPixels across the screen (width * height), keeping the aspect ratio
		let aspectRatio = newWidth / newHeight;
		if (this._trackingBufferEnabled) {
			let trackingWidth, trackingHeight;

			if (aspectRatio > 1) {
				trackingWidth = Math.sqrt(this._trackingMaxPixels * aspectRatio);
				trackingHeight = this._trackingMaxPixels / trackingWidth;
			} else {
				trackingHeight = Math.sqrt(this._trackingMaxPixels / aspectRatio);
				trackingWidth = this._trackingMaxPixels / trackingHeight;
			}
			this._trackingFramebuffer.setSize(Math.round(trackingWidth), Math.round(trackingHeight));
			let totalTrackingPixels = this._trackingFramebuffer.size.width * this._trackingFramebuffer.size.height;
			this._pixelXYOnScreen = Array(totalTrackingPixels);
			this._trackingBufferPixels = new Uint8Array(4 * totalTrackingPixels);
			this._nodesOnScreen = Array(totalTrackingPixels);
			this._nodesOnScreen.fill(-1);

			for (let i = 0; i < this._pixelXYOnScreen.length; i++) {
				let x = (i % this._trackingFramebuffer.size.width) / this._trackingFramebuffer.size.width * this.canvasElement.clientWidth;
				let y = (Math.floor(i / this._trackingFramebuffer.size.width)) / this._trackingFramebuffer.size.height * this.canvasElement.clientHeight;
				this._pixelXYOnScreen[i] = [x, y];
			}
		}

		if (this.densityPlot) {
			this.densityMap.resize(newWidth, newHeight);
		}
		this.render(true);
		return this;
	}



	/** Setup the camera data.
	 * @method _setupCamera
	 * @memberof Helios
	 * @instance
	 * @private
	 */
	_setupCamera() {
		// this.canvasElement.onmousedown = event=>this.handleMouseDown(event);
		// document.onmouseup = event=>this.handleMouseUp(event);
		// document.onmousemove = event=>this.handleMouseMove(event);
		// document.onclick = void(0);


		this.zoom = d3Zoom()
			.on("zoom", event => {
				this.interacting = true;
				this._zoomFactor = event.transform.k;
				this.triggerHoverEvents(event);
				// check if prevX is undefined
				if (this.prevK === undefined) {
					this.prevK = event.transform.k;
				}
				let dx = 0;
				let dy = 0;
				if (this.prevK == event.transform.k || this._use2D) {
					if (this.prevX === undefined || this._use2D) {
						if (this._use2D) {
							dx = event.transform.x - this.canvasElement.clientWidth / 2;
							dy = event.transform.y - this.canvasElement.clientHeight / 2;
						} else {
							dx = event.transform.x;
							dy = event.transform.y;
						}
					} else {
						dx = event.transform.x - this.prevX * this._zoomFactor;
						dy = event.transform.y - this.prevY * this._zoomFactor;
					}
				} else {
				}

				if (!this._use2D) {
					this.prevX = event.transform.x / this._zoomFactor;
					this.prevY = event.transform.y / this._zoomFactor;
				}
				this.prevK = event.transform.k;
				// 	if (!this.positionInterpolator) {
				// 		this.update();
				// 		this.render();
				// 	}
				// 	// event => event.preventDefault();
				// })
				// // this.drag = d3Drag().on("drag", event => {
				// // 	let dx = event.dx;
				// // 	let dy = event.dy;

				// this.zoom2 = d3Zoom().scaleExtent([1.0,1.0]).on("zoom", event => {
				// 	console.log("ZOOM 2")
				// 	// let dx = event.dx;
				// 	// let dy = event.dy;
				// let dx = 0;
				// let dy = 0;
				// if(this.prevX=== undefined){
				// 	dx = event.transform.x;
				// 	dy = event.transform.y;
				// }else{
				// 	dx = event.transform.x - this.prevX;
				// 	dy = event.transform.y - this.prevY;
				// }

				let newRotationMatrix = glm.mat4.create();
				// console.log(event.sourceEvent.shiftKey)
				if (this._use2D || event.sourceEvent?.shiftKey) {
					const panelHeight = this.canvasElement.clientHeight;
					const fovy = Math.PI * 2 / 360 * this._fieldOfView;
					// FIXME: Maybe use the distance to the objects instead of the camera distance
					// For the 3D case. The 2D case is fine.
					const finalCameraDistance = this.cameraDistance / this._zoomFactor;
					const displacementFactor = 2 * finalCameraDistance * Math.tan(fovy / 2) / panelHeight;
					if (this._centerNodes.length == 0) {
						if (this._use2D) {

							this.panX = dx * displacementFactor;
							this.panY = -dy * displacementFactor;
						} else {
							this.panX = this.panX + dx * displacementFactor;
							this.panY = this.panY - dy * displacementFactor;
						}
					}
				} else {//pan
					glm.mat4.identity(newRotationMatrix);
					glm.mat4.rotate(newRotationMatrix, newRotationMatrix, glUtils.degToRad(dx / 2), [0, 1, 0]);
					glm.mat4.rotate(newRotationMatrix, newRotationMatrix, glUtils.degToRad(dy / 2), [1, 0, 0]);

					glm.mat4.multiply(this.rotationMatrix, newRotationMatrix, this.rotationMatrix);
				}

				this.update();
				this.render();
				// this.triggerHoverEvents(event);
				event?.sourceEvent?.preventDefault();
				event?.sourceEvent?.stopPropagation();
			})
			.on("end", event => {
				this.interacting = false;
				event?.sourceEvent?.preventDefault();
				event?.sourceEvent?.stopPropagation();
			});

		d3Select(this.canvasElement)//
			// .call(d3ZoomTransform, d3ZoomIdentity.translate(0, 0).scale(this.cameraDistance))
			// .call(this.drag)
			.call(this.zoom)
			// .on("mousedown.drag", null)
			// .on("touchstart.drag", null)
			// .on("touchmove.drag", null)
			// .on("touchend.drag", null)
			.on("dblclick.zoom", null);


		// this.zoomFactor(0.05)
		// this.zoomFactor(1.0,500);
	}

	/** Set the zoom factor.
	 * @method zoomFactor
	 * @memberof Helios
	 * @instance
	 * @chainable
	 * @param {number} zoomFactor - The zoom factor.
	 * @param {number} [duration] - The duration of the zoom animation in milliseconds.
	 * @returns {this | number} Returns this for chaining if zoomFactor is defined, otherwise returns the current zoom factor.
	 * @example
	 * // Set the zoom factor to 0.5
	 * helios.zoomFactor(0.5);
	 * @example
	 * // Set the zoom factor to 0.5 with an animation duration of 500 milliseconds
	 * helios.zoomFactor(0.5, 500);
	 * @example
	 * // Get the current zoom factor
	 * let zoomFactor = helios.zoomFactor();
	 */
	zoomFactor(zoomFactor, duration) {
		if (zoomFactor !== undefined) {
			if (duration === undefined) {
				if (this._use2D) {
					d3Select(this.canvasElement).call(this.zoom.transform,
						d3ZoomIdentity.translate(this.canvasElement.clientWidth / 2, this.canvasElement.clientHeight / 2).scale(zoomFactor))
				} else {
					d3Select(this.canvasElement).call(this.zoom.transform, d3ZoomIdentity.translate(0, 0).scale(zoomFactor))
				}
			} else {
				if (this._use2D) {
					d3Select(this.canvasElement).transition().ease(d3Ease.easeLinear).duration(duration)
						.call(this.zoom.transform, d3ZoomIdentity.translate(this.canvasElement.clientWidth / 2, this.canvasElement.clientHeight / 2).scale(zoomFactor))

				} else {
					d3Select(this.canvasElement).transition().ease(d3Ease.easeLinear).duration(duration).call(this.zoom.transform, d3ZoomIdentity.translate(0, 0).scale(zoomFactor))
				}
			}
			return this;
		} else {
			return this._zoomFactor;
		}
	}

	/** Set the semantic zoom exponent.
	 * @method semanticZoomExponent
	 * @memberof Helios
	 * @instance
	 * @chainable
	 * @param {number} semanticZoomExponent - The semantic zoom exponent.
	 * @returns {this | number} Returns this for chaining if semanticZoomExponent is defined, otherwise returns the current semantic zoom exponent.
	 * @example
	 * // Set the semantic zoom exponent to 0.5
	 * helios.semanticZoomExponent(0.5);
	 * @example
	 * // Get the current semantic zoom exponent
	 * let semanticZoomExponent = helios.semanticZoomExponent();
	 */
	semanticZoomExponent(semanticZoomExponent) {
		if (semanticZoomExponent !== undefined) {
			this._semanticZoomExponent = semanticZoomExponent;
			return this;
		} else {
			return this._semanticZoomExponent;
		}
	}


	/** Will resize event helper function
	 * @method _willResizeEvent
	 * @memberof Helios
	 * @instance
	 * @private
	 * @param {Event} event - The resize event.
	 */
	_willResizeEvent(event) {
		//requestAnimFrame(function(){
		let dpr = window.devicePixelRatio || 1;
		if (dpr < 2.0 || this.forceSupersample) {
			dpr = dpr * 2.0;
		}
		// dpr = 2.0;

		// this.canvasElement.style.width = this.element.clientWidth + "px";
		// this.canvasElement.style.height = this.element.clientHeight + "px";
		// Update margins:

		let newFrameworkWidth = dpr * this.canvasElement.clientWidth;
		let newFrameworkHeight = dpr * this.canvasElement.clientHeight;

		console.log(newFrameworkWidth,newFrameworkHeight);

		requestAnimationFrame(() => {
			this._resizeGL(newFrameworkWidth, newFrameworkHeight);
		});

		this._updateCameraInteraction();

		this.onResizeCallback?.(event);
		//});
	}

	/** Update Camera Interaction.
	 * @method _updateCameraInteraction
	 * @memberof Helios
	 * @instance
	 * @private
	 * @chainable
	 * @returns {this} Returns this for chaining.
	 */
	_updateCameraInteraction() {
		if (this.zoom && this._use2D) {
			const panelHeight = this.canvasElement.clientHeight;
			const fovy = Math.PI * 2 / 360 * this._fieldOfView;
			// FIXME: Maybe use the distance to the objects instead of the camera distance
			// For the 3D case. The 2D case is fine.
			const finalCameraDistance = this.cameraDistance / this._zoomFactor;
			const displacementFactor = 2 * finalCameraDistance * Math.tan(fovy / 2) / panelHeight;
			d3Select(this.canvasElement).property("__zoom",
				d3ZoomIdentity.translate(
					this.panX / displacementFactor + this._lastCanvasDimensions[0] / 2,
					-this.panY / displacementFactor + this._lastCanvasDimensions[1] / 2
				).scale(this._zoomFactor));
		}
	}

	/** Will hint force Helios to redraw the network.
	 * @method redraw
	 * @memberof Helios
	 * @instance
	 * @chainable
	 * @returns {this} Returns this for chaining.
	 * @fires Helios#redraw
	 * @fires Helios#draw
	 * @fires Helios#HoverEvent
	 * @example
	 * // Redraw the network
	 * helios.redraw();
	 * @example
	 * // Update geometry and redraw the network
	 * helios.update().redraw();
	 */
	redraw() {
		this._redrawAll(null, "normal"); // Normal
		this._redrawAll(this.pickingFramebuffer, "picking"); // Picking
		if (this._trackingBufferEnabled) {
			this._redrawAll(this._trackingFramebuffer, "tracking"); // Labels buffer
		}
		// this.redrawDensityMap();
		this.triggerHoverEvents(null);
		this._updateTrackerNodesDataThrottle();
		this.onDrawCallback?.();
		return this;
	}


	/** Will hint or force Helios to update the network geometry.
	 * this method needs to be called after any changes to the network data
	 * or visual properties.
	 * @method update
	 * @memberof Helios
	 * @instance
	 * @chainable
	 * @param {boolean} [immediate=false] - If true, the update will be performed immediately, otherwise it will be scheduled.
	 * @param {boolean} [nodes=true] - If true, the node geometry will be updated.
	 * @param {boolean} [edges=true] - If true, the edge geometry will be updated.
	 * @returns {this} Returns this for chaining.
	 * @example
	 * // Update the network geometry
	 * helios.update();
	 * @example
	 * // Update the network geometry immediately
	 * helios.update(true);
	 */
	update(immediate = false, nodes = true, edges = true) {
		this.scheduler.schedule({
			name: "9.0.update",
			callback: null,
			delay: 0,
			repeat: false,
			synchronized: true,
			immediateUpdates: immediate,
			// redraw: true,
			updateNodesGeometry: nodes,
			updateEdgesGeometry: edges,
		});
		return this;
	}

	/** Will hint or force Helios to render the network.
	 * @method render
	 * @memberof Helios
	 * @instance
	 * @chainable
	 * @param {boolean} [immediate=false] - If true, the render will be performed immediately, otherwise it will be scheduled.
	 * @returns {this} Returns this for chaining.
	 * @example
	 * // Render the network
	 * helios.render();
	 * @example
	 * // Update geometry and render the network
	 * helios.update().render();
	 */
	render(immediate = false) {
		// if (!this.positionInterpolator) {
		// 	window.requestAnimationFrame(() => this.redraw());
		// }

		this.scheduler.schedule({
			name: "9.1.render",
			callback: null,
			delay: 0,
			repeat: false,
			synchronized: true,
			immediateUpdates: immediate,
			redraw: true,
			// updateNodesGeometry: true,
			// updateEdgesGeometry: true,
		});
		return this;
	}

	/** Helper method to prepare drawing framebuffers
	 * @method _redrawPrepare
	 * @memberof Helios
	 * @instance
	 * @private
	 * @param {WebGLFramebuffer} destination - The destination framebuffer.
	 * @param {boolean} isPicking - If true, the framebuffer is used for picking.
	 * @param {Object} viewport - The viewport to use.
	 */
	_redrawPrepare(destination, framebufferType, viewport) {
		// if framebufferType is undefined, set it to "normal"
		if (typeof framebufferType === "undefined") {
			framebufferType = "normal";
		}
		const gl = this.gl;

		const fbWidth = destination?.size.width || this.canvasElement.width;
		const fbHeight = destination?.size.height || this.canvasElement.height;
		// let orthogonalScaleFactor = 1.0;
		// orthogonalScaleFactor = Math.max(this.canvasElement.clientWidth/this.canvasElement.width, this.canvasElement.clientHeight/this.canvasElement.height);
		if (destination == null) {
			gl.bindFramebuffer(gl.FRAMEBUFFER, null);
			gl.clearColor(...this._backgroundColor);
		} else if (framebufferType != "normal") {
			gl.bindFramebuffer(gl.FRAMEBUFFER, destination);
			gl.clearColor(0.0, 0.0, 0.0, 0.0);
		} else {
			gl.bindFramebuffer(gl.FRAMEBUFFER, destination);
			if (typeof destination.backgroundColor === "undefined") {
				gl.clearColor(...this._backgroundColor);
			} else {
				gl.clearColor(...destination.backgroundColor);
			}
		}

		if (typeof viewport === "undefined") {
			gl.viewport(0, 0, fbWidth, fbHeight);
		} else {
			gl.viewport(...viewport);
		}

		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.depthFunc(gl.LEQUAL);

		this.projectionMatrix = glm.mat4.create();
		this.viewMatrix = glm.mat4.create();
		this.projectionViewMatrix = glm.mat4.create();

		// 
		let fovy = Math.PI * 2 / 360 * this._fieldOfView;
		let aspectRatio = fbWidth / fbHeight;
		if (this._use2D || this._orthographic) {
			const finalCameraDistance = this.cameraDistance / this._zoomFactor;
			const orthoHeight = 2 * finalCameraDistance * Math.tan(fovy / 2);
			const orthoWidth = orthoHeight * aspectRatio;
			const left = -orthoWidth / 2;
			const right = orthoWidth / 2;
			const bottom = -orthoHeight / 2;
			const top = orthoHeight / 2;
			// orthogonalScaleFactor = 1.0;
			// console.log("Scale Factor:",orthogonalScaleFactor);

			glm.mat4.ortho(this.projectionMatrix,
				left,
				right,
				bottom,
				top,
				-100 + finalCameraDistance, 10000.0 + finalCameraDistance);

			// glm.mat4.ortho(this.projectionMatrix,
			// 	-fbWidth / this._zoomFactor / orthoRescaleFactor * scaleFactor*orthogonalScaleFactor/ scaleHeight,
			// 	fbWidth / this._zoomFactor / orthoRescaleFactor * scaleFactor*orthogonalScaleFactor / scaleHeight,
			// 	-fbHeight / this._zoomFactor / orthoRescaleFactor * scaleFactor*orthogonalScaleFactor / scaleHeight,
			// 	fbHeight / this._zoomFactor / orthoRescaleFactor * scaleFactor*orthogonalScaleFactor / scaleHeight,
			// 	-10000.0, 100000.0);
			// glm.mat4.perspective(this.projectionMatrix, Math.PI * 2 / 360 * 70, fbWidth / fbHeight, 1.0, 10000.0);

		} else {
			glm.mat4.perspective(this.projectionMatrix, fovy, aspectRatio, 1.0, null);
		}

		glm.mat4.identity(this.viewMatrix);
		glm.mat4.translate(this.viewMatrix, this.viewMatrix, [this.panX, this.panY, -this.cameraDistance / this._zoomFactor]);


		glm.mat4.multiply(this.viewMatrix, this.viewMatrix, this.rotationMatrix);
		// glm.mat4.scale(this.viewMatrix, this.viewMatrix, [this._zoomFactor, this._zoomFactor, this._zoomFactor]);
		glm.mat4.translate(this.viewMatrix, this.viewMatrix, this.translatePosition);

		glm.mat4.multiply(this.projectionViewMatrix, this.projectionMatrix, this.viewMatrix);
	}

	/** Helper method to draw nodes
	 * @method _redrawNodes
	 * @memberof Helios
	 * @instance
	 * @private
	 * @param {WebGLFramebuffer} destination - The destination framebuffer.
	 * @param {boolean} isPicking - If true, the framebuffer is used for picking.
	 */
	_redrawNodes(destination, framebufferType) {
		if (typeof framebufferType === "undefined") {
			framebufferType = "normal";
		}
		const gl = this.gl;
		let ext = gl.getExtension("ANGLE_instanced_arrays");

		let adjustedScaleFactor = 1.0 / Math.pow(this._zoomFactor, this._semanticZoomExponent);

		if (framebufferType != "normal") {
			adjustedScaleFactor = 1.0 / Math.pow(this._zoomFactor, 0.75 * this._semanticZoomExponent);
		}

		let currentShaderProgram;
		if (framebufferType == "normal") {
			// console.log(this.nodesShaderProgram);
			gl.enable(gl.BLEND);
			// if(this.useAdditiveBLending){
			// gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
			// 	}else{
			gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
			// gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA,
			// 	gl.ZERO, gl.ONE);
			// 	}
			if (this.useShadedNodes) {
				currentShaderProgram = this.nodesShaderProgram;
			} else {
				currentShaderProgram = this.nodesFastShaderProgram;
			}
		} else {
			gl.disable(gl.BLEND);
			// console.log(this.nodesShaderProgram);
			currentShaderProgram = this.nodesPickingShaderProgram;
		}

		currentShaderProgram.use(gl);
		currentShaderProgram.attributes.enable("vertex");
		// currentShaderProgram.attributes.enable("normal");
		currentShaderProgram.attributes.enable("position");
		currentShaderProgram.attributes.enable("size");
		currentShaderProgram.attributes.enable("outlineWidth");
		currentShaderProgram.attributes.enable("outlineColor");
		currentShaderProgram.attributes.enable("encodedIndex");


		gl.bindBuffer(gl.ARRAY_BUFFER, this.nodesGeometry.vertexObject);
		gl.vertexAttribPointer(currentShaderProgram.attributes.vertex, 3, gl.FLOAT, false, 0, 0);
		ext.vertexAttribDivisorANGLE(currentShaderProgram.attributes.vertex, 0);

		// gl.bindBuffer(gl.ARRAY_BUFFER, this.nodesGeometry.normalObject);
		// gl.vertexAttribPointer(currentShaderProgram.attributes.normal, 3, gl.FLOAT, false, 0, 0);
		// ext.vertexAttribDivisorANGLE(currentShaderProgram.attributes.normal, 0); 

		if (this.nodesGeometry.indexObject) {
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.nodesGeometry.indexObject);
		}

		gl.uniformMatrix4fv(currentShaderProgram.uniforms.projectionMatrix, false, this.projectionMatrix);
		gl.uniformMatrix4fv(currentShaderProgram.uniforms.viewMatrix, false, this.viewMatrix);

		gl.uniform1f(currentShaderProgram.uniforms.globalOpacityScale, this._nodesGlobalOpacityScale);
		gl.uniform1f(currentShaderProgram.uniforms.globalOpacityBase, this._nodesGlobalOpacityBase);

		gl.uniform1f(currentShaderProgram.uniforms.globalSizeScale, this._nodesGlobalSizeScale * adjustedScaleFactor);
		gl.uniform1f(currentShaderProgram.uniforms.globalSizeBase, this._nodesGlobalSizeBase * adjustedScaleFactor);

		gl.uniform1f(currentShaderProgram.uniforms.globalOutlineWidthScale, this._nodesGlobalOutlineWidthScale * adjustedScaleFactor);
		gl.uniform1f(currentShaderProgram.uniforms.globalOutlineWidthBase, this._nodesGlobalOutlineWidthBase * adjustedScaleFactor);

		let normalMatrix = glm.mat3.create();
		glm.mat3.normalFromMat4(normalMatrix, this.viewMatrix);
		gl.uniformMatrix3fv(currentShaderProgram.uniforms.normalMatrix, false, normalMatrix);

		// Geometry Mutators and colors obtained from the network properties
		let colorsArray = this.network.colors;
		let positionsArray = this.network.positions;
		let sizeValue = this.network.sizes;
		let outlineWidthValue = this.network.outlineWidths;

		// Bind the instance position data
		gl.bindBuffer(gl.ARRAY_BUFFER, this.nodesPositionBuffer);
		gl.enableVertexAttribArray(currentShaderProgram.attributes.position);
		gl.vertexAttribPointer(currentShaderProgram.attributes.position, 3, gl.FLOAT, false, 0, 0);
		ext.vertexAttribDivisorANGLE(currentShaderProgram.attributes.position, 1); // This makes it instanced!

		// Bind the instance color data
		gl.bindBuffer(gl.ARRAY_BUFFER, this.nodesColorBuffer);
		gl.enableVertexAttribArray(currentShaderProgram.attributes.color);
		gl.vertexAttribPointer(currentShaderProgram.attributes.color, 4, gl.FLOAT, false, 0, 0);
		ext.vertexAttribDivisorANGLE(currentShaderProgram.attributes.color, 1); // This makes it instanced!

		// Bind the instance color data
		gl.bindBuffer(gl.ARRAY_BUFFER, this.nodesSizeBuffer);
		gl.enableVertexAttribArray(currentShaderProgram.attributes.size);
		gl.vertexAttribPointer(currentShaderProgram.attributes.size, 1, gl.FLOAT, false, 0, 0);
		ext.vertexAttribDivisorANGLE(currentShaderProgram.attributes.size, 1); // This makes it instanced!

		// Bind the instance color data
		gl.bindBuffer(gl.ARRAY_BUFFER, this.nodesOutlineColorBuffer);
		gl.enableVertexAttribArray(currentShaderProgram.attributes.outlineColor);
		gl.vertexAttribPointer(currentShaderProgram.attributes.outlineColor, 4, gl.FLOAT, false, 0, 0);
		ext.vertexAttribDivisorANGLE(currentShaderProgram.attributes.outlineColor, 1); // This makes it instanced!

		// Bind the instance color data
		gl.bindBuffer(gl.ARRAY_BUFFER, this.nodesOutlineWidthBuffer);
		gl.enableVertexAttribArray(currentShaderProgram.attributes.outlineWidth);
		gl.vertexAttribPointer(currentShaderProgram.attributes.outlineWidth, 1, gl.FLOAT, false, 0, 0);
		ext.vertexAttribDivisorANGLE(currentShaderProgram.attributes.outlineWidth, 1); // This makes it instanced!

		// Bind the instance color data
		gl.bindBuffer(gl.ARRAY_BUFFER, this.nodesIndexBuffer);
		gl.enableVertexAttribArray(currentShaderProgram.attributes.encodedIndex);
		gl.vertexAttribPointer(currentShaderProgram.attributes.encodedIndex, 4, gl.FLOAT, false, 0, 0);
		ext.vertexAttribDivisorANGLE(currentShaderProgram.attributes.encodedIndex, 1); // This makes it instanced!

		// console.log(this.network.positions.length/3)
		// Draw the instanced meshes
		if (this.nodesGeometry.indexObject) {
			ext.drawElementsInstancedANGLE(gl.TRIANGLES, this.nodesGeometry.numIndices, this.nodesGeometry.indexType, 0, this.network.positions.length / 3);
		} else {
			ext.drawArraysInstancedANGLE(gl.TRIANGLE_STRIP, 0, this.nodesGeometry.numIndices, this.network.positions.length / 3);
		}

		// Disable attributes
		currentShaderProgram.attributes.disable("vertex");
		// this.nodesShaderProgram.attributes.disable("normal");
		currentShaderProgram.attributes.disable("position");
		currentShaderProgram.attributes.disable("size");
		currentShaderProgram.attributes.disable("outlineWidth");
		currentShaderProgram.attributes.disable("outlineColor");
		currentShaderProgram.attributes.disable("encodedIndex");
	}


	/** Helper function to redraw the edges
	 * @method _redrawEdges
	 * @memberof Helios
	 * @instance
	 * @private
	 * @param {WebGLFramebuffer} destination - The destination framebuffer.
	 * @param {String} framebufferType - The type of framebuffer to render to (normal, picking, or tracking).
	 */
	_redrawEdges(destination, framebufferType) {

		if (typeof framebufferType === "undefined") {
			framebufferType = "normal";
		}
		let hasEdgeCallbacks = this.onEdgeClickCallback
			|| this.onEdgeHoverMoveCallback
			|| this.onEdgeHoverStartCallback
			|| this.onEdgeHoverEndCallback
			|| this.onEdgeDoubleClickCallback
			|| this.onEdgeClickCallback;

		if (framebufferType != "normal" && (this.fastEdges || !hasEdgeCallbacks)) {
			return // no picking for fast edges or no callbacks
		}

		let adjustedScaleFactor = 1.0 / Math.pow(this._zoomFactor, this._semanticZoomExponent);

		if (framebufferType != "normal") {
			adjustedScaleFactor = 1.0 / Math.pow(this._zoomFactor, 0.5 * this._semanticZoomExponent);
		}
		const gl = this.gl;
		let ext = gl.getExtension("ANGLE_instanced_arrays");

		let currentShaderProgram;
		if (framebufferType == "normal") {
			gl.enable(gl.BLEND);
			// 	//Edges are rendered with additive blending.
			// 	gl.enable(gl.BLEND);
			if (this.useAdditiveBlending) {
				gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
			} else {
				// gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
				// gl.blendFuncSeparate( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
				// gl.blendFuncSeparate( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ZERO, gl.ONE ); //Original from Networks 3D
				gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE); // New (works for transparent background)
			}
			if (this.fastEdges) {
				currentShaderProgram = this.edgesFastShaderProgram;
			} else {
				currentShaderProgram = this.edgesShaderProgram;
			}
		} else {
			gl.disable(gl.BLEND);
			// console.log("PICKING EDGESSSS");
			currentShaderProgram = this.edgesPickingShaderProgram;
		}

		if (this.fastEdges) {
			// console.log(this.edgesShaderProgram)

			currentShaderProgram.use(gl);
			currentShaderProgram.attributes.enable("vertex");
			currentShaderProgram.attributes.enable("color");
			// currentShaderProgram.attributes.enable("encodedIndex");



			//bind attributes and unions
			gl.bindBuffer(gl.ARRAY_BUFFER, this.fastEdgesGeometry.vertexObject);
			gl.vertexAttribPointer(currentShaderProgram.attributes.vertex, 3, gl.FLOAT, false, 0, 0);
			ext.vertexAttribDivisorANGLE(currentShaderProgram.attributes.vertex, 0); // This makes it instanced!

			gl.bindBuffer(gl.ARRAY_BUFFER, this.fastEdgesGeometry.colorObject);
			gl.vertexAttribPointer(currentShaderProgram.attributes.color, 4, gl.FLOAT, false, 0, 0);
			ext.vertexAttribDivisorANGLE(currentShaderProgram.attributes.color, 0); // This makes it instanced!

			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.fastEdgesGeometry.indexObject);

			gl.uniformMatrix4fv(currentShaderProgram.uniforms.projectionViewMatrix, false, this.projectionViewMatrix);

			//gl.uniform2fv(edgesShaderProgram.uniforms.nearFar,[0.1,10.0]);
			gl.uniform1f(currentShaderProgram.uniforms.globalOpacityScale, this._edgesGlobalOpacityScale);
			gl.uniform1f(currentShaderProgram.uniforms.globalOpacityBase, this._edgesGlobalOpacityBase);


			//drawElements is called only 1 time. no overhead from javascript
			gl.drawElements(gl.LINES, this.fastEdgesGeometry.numIndices, this.fastEdgesGeometry.indexType, 0);

			//disabling attributes
			currentShaderProgram.attributes.disable("vertex");
			currentShaderProgram.attributes.disable("color");
			// currentShaderProgram.attributes.disable("encodedIndex");
		} else {
			currentShaderProgram.use(gl);
			currentShaderProgram.attributes.enable("fromVertex");
			currentShaderProgram.attributes.enable("toVertex");
			currentShaderProgram.attributes.enable("vertexType");
			currentShaderProgram.attributes.enable("fromColor");
			currentShaderProgram.attributes.enable("toColor");
			currentShaderProgram.attributes.enable("fromSize");
			currentShaderProgram.attributes.enable("toSize");
			currentShaderProgram.attributes.enable("encodedIndex");

			// newGeometry.edgeVertexTypeBuffer = gl.createBuffer();
			// newGeometry.verticesBuffer = gl.createBuffer();
			// newGeometry.colorBuffer = gl.createBuffer();
			// newGeometry.sizeBuffer = gl.createBuffer();
			// newGeometry.indexBuffer = gl.createBuffer();
			// console.log(currentShaderProgram.attributes);

			gl.bindBuffer(gl.ARRAY_BUFFER, this.edgesGeometry.edgeVertexTypeBuffer);
			gl.vertexAttribPointer(currentShaderProgram.attributes.vertexType, 2, gl.FLOAT, false, 0, 0);
			ext.vertexAttribDivisorANGLE(currentShaderProgram.attributes.vertexType, 0);

			gl.bindBuffer(gl.ARRAY_BUFFER, this.edgesGeometry.verticesBuffer);
			gl.vertexAttribPointer(currentShaderProgram.attributes.fromVertex, 3, gl.FLOAT, false, 4 * 3 * 2, 0);
			ext.vertexAttribDivisorANGLE(currentShaderProgram.attributes.fromVertex, 1);

			gl.bindBuffer(gl.ARRAY_BUFFER, this.edgesGeometry.verticesBuffer);
			gl.vertexAttribPointer(currentShaderProgram.attributes.toVertex, 3, gl.FLOAT, false, 4 * 3 * 2, 4 * 3);
			ext.vertexAttribDivisorANGLE(currentShaderProgram.attributes.toVertex, 1);


			gl.bindBuffer(gl.ARRAY_BUFFER, this.edgesGeometry.colorBuffer);
			gl.vertexAttribPointer(currentShaderProgram.attributes.fromColor, 4, gl.FLOAT, false, 4 * 4 * 2, 0);
			ext.vertexAttribDivisorANGLE(currentShaderProgram.attributes.fromColor, 1);
			gl.vertexAttribPointer(currentShaderProgram.attributes.toColor, 4, gl.FLOAT, false, 4 * 4 * 2, 4 * 4);
			ext.vertexAttribDivisorANGLE(currentShaderProgram.attributes.toColor, 1);

			gl.bindBuffer(gl.ARRAY_BUFFER, this.edgesGeometry.sizeBuffer);
			gl.vertexAttribPointer(currentShaderProgram.attributes.fromSize, 1, gl.FLOAT, false, 4 * 2, 0);
			ext.vertexAttribDivisorANGLE(currentShaderProgram.attributes.fromSize, 1);
			gl.vertexAttribPointer(currentShaderProgram.attributes.toSize, 1, gl.FLOAT, false, 4 * 2, 4);
			ext.vertexAttribDivisorANGLE(currentShaderProgram.attributes.toSize, 1);


			gl.bindBuffer(gl.ARRAY_BUFFER, this.edgesGeometry.indexBuffer);
			gl.enableVertexAttribArray(currentShaderProgram.attributes.encodedIndex);
			gl.vertexAttribPointer(currentShaderProgram.attributes.encodedIndex, 4, gl.FLOAT, false, 0, 0);
			ext.vertexAttribDivisorANGLE(currentShaderProgram.attributes.encodedIndex, 1); // This makes it instanced!

			// gl.bindBuffer(gl.ARRAY_BUFFER, this.nodesGeometry.normalObject);
			// gl.vertexAttribPointer(currentShaderProgram.attributes.normal, 3, gl.FLOAT, false, 0, 0);
			// ext.vertexAttribDivisorANGLE(currentShaderProgram.attributes.normal, 0); 

			gl.uniformMatrix4fv(currentShaderProgram.uniforms.projectionMatrix, false, this.projectionMatrix);
			gl.uniformMatrix4fv(currentShaderProgram.uniforms.viewMatrix, false, this.viewMatrix);

			//gl.uniform2fv(edgesShaderProgram.uniforms.nearFar,[0.1,10.0]);
			gl.uniform1f(currentShaderProgram.uniforms.globalOpacityScale, this._edgesGlobalOpacityScale);
			gl.uniform1f(currentShaderProgram.uniforms.globalOpacityBase, this._edgesGlobalOpacityBase);

			gl.uniform1f(currentShaderProgram.uniforms.globalWidthScale, this._edgesGlobalWidthScale);
			gl.uniform1f(currentShaderProgram.uniforms.globalWidthBase, this._edgesGlobalWidthBase);

			gl.uniform1f(currentShaderProgram.uniforms.globalSizeScale, this._nodesGlobalSizeScale * adjustedScaleFactor);
			gl.uniform1f(currentShaderProgram.uniforms.globalSizeBase, this._nodesGlobalSizeBase * adjustedScaleFactor);

			// 01,11,21
			// let cameraUp = glm.vec3.fromValues(this.viewMatrix[1], this.viewMatrix[5], this.viewMatrix[9]);
			// // let cameraUp = glm.vec3.fromValues(0, 1.0, 0);
			// // 00,10,20
			// let cameraRight = glm.vec3.fromValues(this.viewMatrix[0], this.viewMatrix[4], this.viewMatrix[8]);
			// let cameraForward = glm.vec3.fromValues(this.viewMatrix[2], this.viewMatrix[6], this.viewMatrix[10]);

			// console.log(cameraUp);
			// glm.vec3.normalize(cameraUp, cameraUp);
			// glm.vec3.normalize(cameraRight, cameraRight);
			// glm.vec3.cross(cameraForward,cameraUp,cameraRight);
			// glm.vec3.normalize(cameraForward, cameraForward);
			// gl.uniform3fv(currentShaderProgram.uniforms.cameraUp, cameraUp);
			// gl.uniform3fv(currentShaderProgram.uniforms.cameraRight, cameraRight);
			// gl.uniform3fv(currentShaderProgram.uniforms.cameraForward, cameraForward);
			// cameraRight;// = normalize(vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]));
			// cameraUp;// = normalize(vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]));
			// cameraForward;// = normalize(vec3(viewMatrix[0][2], viewMatrix[1][2], viewMatrix[2][2]));

			ext.drawArraysInstancedANGLE(gl.TRIANGLE_STRIP, 0, 4, this.edgesGeometry.count);

			currentShaderProgram.attributes.disable("fromVertex");
			currentShaderProgram.attributes.disable("toVertex");
			currentShaderProgram.attributes.disable("vertexType");
			currentShaderProgram.attributes.disable("fromColor");
			currentShaderProgram.attributes.disable("toColor");
			currentShaderProgram.attributes.disable("fromSize");
			currentShaderProgram.attributes.disable("toSize");
			currentShaderProgram.attributes.disable("encodedIndex");
			// console.log("PICKING? " + isPicking)
		}
	}

	/** Helper function to redraw the scene.
	 * @method _redrawAll
	 * @memberof Helios
	 * @instance
	 * @private
	 * @param {Object} destination - The destination to draw to. If undefined, the canvas will be used.
	 * @param {String} framebufferType - Type of the framebuffer to draw "normal", "picking", "tracking" . Default is "normal"
	 */
	_redrawAll(destination, framebufferType) {
		if (typeof framebufferType === 'undefined') {
			framebufferType = "normal";
		}
		const gl = this.gl;

		this._redrawPrepare(destination, framebufferType);
		if (framebufferType == "normal" && this.densityPlot) {

			// gl.clearColor(0.0, 0.0, 0.0, 1.0);
			// gl.clearDepth(1.0)
			gl.disable(this.gl.DEPTH_TEST);
			// gl.depthMask(true);

			const fbWidth = destination?.size.width || this.canvasElement.width;
			const fbHeight = destination?.size.height || this.canvasElement.height;
			// this.densityMap.resize(fbWidth,fbHeight);
			this.densityMap.drawScene(this.projectionMatrix, this.viewMatrix);
		}

		gl.depthMask(true);

		if (this._use2D) {
			gl.disable(gl.DEPTH_TEST);
			gl.depthMask(false);
		
			if (framebufferType != "tracking" && this._edgesGlobalOpacityScale > 0.0) {
				this._redrawEdges(destination, framebufferType);
			}
		
			this._redrawNodes(destination, framebufferType);
		} else {
			gl.enable(gl.DEPTH_TEST);
			gl.depthFunc(gl.LEQUAL);
		
			this._redrawNodes(destination, framebufferType);
		
			gl.depthFunc(gl.ALWAYS);
			gl.depthMask(false); // Prevent depth buffer writes for edges
		
			if (framebufferType != "tracking" && this._edgesGlobalOpacityScale > 0.0) {
				this._redrawEdges(destination, framebufferType);
			}
		
			gl.depthMask(true);
			gl.depthFunc(gl.LEQUAL);
		}
	}

	// onResizeCallback
	// onNodeClickCallback
	// onNodeHoverStartCallback 
	// onNodeHoverEndCallback
	// onNodeHoverMoveCallback
	// onZoomCallback
	// onRotationCallback
	// onLayoutStartCallback
	// onLayoutFinishCallback
	// onDrawCallback

	/** Helper function to update the center nodes position.
	 * @method _updateCenterNodesPosition
	 * @memberof Helios
	 * @instance
	 * @private
	 */
	_updateCenterNodesPosition() {
		this.targetTranslatePosition[0] = 0;
		this.targetTranslatePosition[1] = 0;
		this.targetTranslatePosition[2] = 0;

		if (this._centerNodes && this._centerNodes.length > 0) {
			for (let i = 0; i < this._centerNodes.length; i++) {
				let node = this._centerNodes[i];
				// if node is not of type node, get node by id
				let pos = node.position;
				this.targetTranslatePosition[0] -= pos[0];
				this.targetTranslatePosition[1] -= pos[1];
				this.targetTranslatePosition[2] -= pos[2];
			}
			let lengthSize = this._centerNodes.length;
			this.targetTranslatePosition[0] /= lengthSize;
			this.targetTranslatePosition[1] /= lengthSize;
			this.targetTranslatePosition[2] /= lengthSize;
		}
	}

	/** Center view on nodes with animation.
	 * @method centerOnNodes
	 * @memberof Helios
	 * @instance
	 * @chainable
	 * @param {number[]|Node} nodes - The nodes to center on.
	 * @param {number} duration - The duration of the animation in milliseconds.
	 * @example
	 * // Center on node with id 1
	 * helios.centerOnNodes([1], 1000);
	 * @example
	 * // Center on node with id 1 and 2
	 * helios.centerOnNodes([1, 2], 1000);
	 * @example
	 * // Center on node with id 1 and node object
	 * helios.centerOnNodes([1, helios.network.nodes[2]], 1000);
	 * return {this} The current instance of Helios for chaining.
	 */
	centerOnNodes(nodes, duration) {
		//
		this._centerNodes = [];
		for (let i = 0; i < nodes.length; i++) {
			let node = nodes[i];
			if (node.ID === undefined) {
				node = this.network.nodes[node];
			}
			this._centerNodes.push(node);
		}

		this._updateCameraInteraction();

		this.lastTranslatePosition[0] = this.translatePosition[0];
		this.lastTranslatePosition[1] = this.translatePosition[1];
		this.lastTranslatePosition[2] = this.translatePosition[2];
		this.lastPanX = this.panX;
		this.lastPanY = this.panY;
		if (duration === undefined || duration <= 0) {
			this.translateDuration = 0;
			this.translateStartTime = null;
			// this.update(); No need to update?
			// this.render();
		} else {
			this.translateDuration = duration;
			this.translateStartTime = performance.now();
		}
		this._scheduleCameraInterpolation();
		return this;
	}

	/** Get the nodes being centered on.
	 * @method getCenterNodes
	 * @memberof Helios
	 * @instance
	 * @return {Array<Node>} The nodes being centered on.
	 * @example
	 * // Get the nodes being centered on
	 * let nodes = helios.getCenterNodes();
	 */
	centeredNodes() {
		return this._centerNodes;
	}


	/** Helper method to update the camera interpolation.
	 * @method _updateCameraInterpolation
	 * @memberof Helios
	 * @instance
	 * @private
	 * @param {Boolean} ignoreInstantaneousUpdate - Ignore instantaneous update.
	 * @return {Boolean} True if the camera interpolation needs to continue, false otherwise.
	 */
	_updateCameraInterpolation(ignoreInstantaneousUpdate = false) {
		if (this.translateDuration == 0) {
			if (!ignoreInstantaneousUpdate) {
				this.translatePosition[0] = this.targetTranslatePosition[0];
				this.translatePosition[1] = this.targetTranslatePosition[1];
				this.translatePosition[2] = this.targetTranslatePosition[2];
				this.panX = 0;
				this.panY = 0;
				if (this._use2D) {
					// this.zoom.translateTo(d3Select(this.canvasElement),this.panX+this.canvasElement.clientWidth/2,this.panY+this.canvasElement.clientHeight/2);
				}
			}
			return false; //no need to continue
		} else {
			let elapsedTime = performance.now() - this.translateStartTime;
			let alpha = elapsedTime / this.translateDuration;
			if (alpha > 1) {
				alpha = 1.0;
			}
			// console.log(elapsedTime);
			this.translatePosition[0] = (1.0 - alpha) * this.lastTranslatePosition[0];
			this.translatePosition[1] = (1.0 - alpha) * this.lastTranslatePosition[1];
			this.translatePosition[2] = (1.0 - alpha) * this.lastTranslatePosition[2];

			this.translatePosition[0] += alpha * this.targetTranslatePosition[0];
			this.translatePosition[1] += alpha * this.targetTranslatePosition[1];
			this.translatePosition[2] += alpha * this.targetTranslatePosition[2];

			this.panX = (1.0 - alpha) * this.lastPanX;
			this.panY = (1.0 - alpha) * this.lastPanY;
			this.panX += alpha * this.targetPanX;
			this.panY += alpha * this.targetPanY;
			if (this._use2D) {
				// this.zoom.translateTo(d3Select(this.canvasElement),this.panX+this.canvasElement.clientWidth/2,this.panY+this.canvasElement.clientHeight/2);
			}
			if (alpha >= 1.0) {
				return false;
			} else {
				return true;
			}
		}
	}


	/** Helper method to schedule the camera interpolation.
	 * @method _scheduleCameraInterpolation
	 * @memberof Helios
	 * @instance
	 * @private
	 */
	_scheduleCameraInterpolation() {
		let cameraInterpolatorTask = {
			name: "1.1.cameraInterpolator",
			callback: (elapsedTime, task) => {
				this._updateCenterNodesPosition();
				if (!this._updateCameraInterpolation()) {

					this.scheduler.unschedule("1.1.cameraInterpolator");
				}
			},
			delay: 0,
			repeat: true,
			synchronized: true,
			immediateUpdates: false,
			redraw: true,
			updateNodesGeometry: false,
			updateEdgesGeometry: false,
		}
		this.scheduler.schedule({
			name: "1.0.cameraInterpolator",
			callback: (elapsedTime, task) => {
				this.scheduler.schedule(cameraInterpolatorTask);
			},
			delay: 0,
			repeat: false,
			synchronized: true,
			immediateUpdates: false,
			redraw: false,
			updateNodesGeometry: false,
			updateEdgesGeometry: false,
		});
	}

	//#region Events

	/** Set the callback for the resize event.
	 * @method onResize
	 * @memberof Helios
	 * @instance
	 * @param {Function} callback - The callback function.
	 * @chainable
	 * @return {this} The current Helios instance for chaining.
	 * @example
	 * // Set the callback for the resize event
	 * helios.onResize((width, height) => {
	 * 	console.log("The canvas was resized to " + width + "x" + height);
	 * });
	 */
	onResize(callback) {
		this.onResizeCallback = callback;
		return this;
	}

	/** Set the callback for the node click event.
	 * @method onNodeClick
	 * @memberof Helios
	 * @instance
	 * @param {Function} callback - The callback function.
	 * @chainable
	 * @return {this} The current Helios instance for chaining.
	 * @example
	 * // Set the callback for the node click event
	 * helios.onNodeClick((node) => {
	 * 	console.log("The node " + node.id + " was clicked");
	 * });
	 */
	onNodeClick(callback) {
		this.onNodeClickCallback = callback;
		return this;
	}

	/** Set the callback for the node double click event.
	 * @method onNodeDoubleClick
	 * @memberof Helios
	 * @instance
	 * @param {Function} callback - The callback function.
	 * @chainable
	 * @return {this} The current Helios instance for chaining.
	 * @example
	 * // Set the callback for the node double click event
	 * helios.onNodeDoubleClick((node) => {
	 * 	console.log("The node " + node.id + " was double clicked");
	 * });
	 * @see {@link Helios#onNodeClick}
	 */
	onNodeDoubleClick(callback) {
		this.onNodeDoubleClickCallback = callback;
		return this;
	}

	/** Set the callback for the node hover start event.
	 * @method onNodeHoverStart
	 * @memberof Helios
	 * @instance
	 * @param {Function} callback - The callback function.
	 * @chainable
	 * @return {this} The current Helios instance for chaining.
	 * @example
	 * // Set the callback for the node hover start event
	 * helios.onNodeHoverStart((node) => {
	 * 	console.log("The node " + node.id + " was hovered");
	 * });
	 * @see {@link Helios#onNodeHoverEnd}
	 * @see {@link Helios#onNodeHoverMove}
	 */
	onNodeHoverStart(callback) {
		this.onNodeHoverStartCallback = callback;
		return this;
	}

	/** Set the callback for the node hover end event.
	 * @method onNodeHoverEnd
	 * @memberof Helios
	 * @instance
	 * @param {Function} callback - The callback function.
	 * @chainable
	 * @return {this} The current Helios instance for chaining.
	 * @example
	 * // Set the callback for the node hover end event
	 * helios.onNodeHoverEnd((node) => {
	 * 	console.log("The node " + node.id + " was no longer hovered");
	 * });
	 * @see {@link Helios#onNodeHoverStart}
	 * @see {@link Helios#onNodeHoverMove}
	 */
	onNodeHoverEnd(callback) {
		this.onNodeHoverEndCallback = callback;
		return this;
	}

	/** Set the callback for the node hover move event.
	 * @method onNodeHoverMove
	 * @memberof Helios
	 * @instance
	 * @param {Function} callback - The callback function.
	 * @chainable
	 * @category Events
	 * @return {this} The current Helios instance for chaining.
	 * @example
	 * // Set the callback for the node hover move event
	 * helios.onNodeHoverMove((node) => {
	 * 	console.log("The node " + node.id + " was hovered");
	 * });
	 * @see {@link Helios#onNodeHoverStart}
	 * @see {@link Helios#onNodeHoverEnd}
	 */
	onNodeHoverMove(callback) {
		this.onNodeHoverMoveCallback = callback;
		return this;
	}



	/** Set the callback for the edge click event.
	 * @method onEdgeClick
	 * @memberof Helios
	 * @instance
	 * @param {Function} callback - The callback function.
	 * @chainable
	 * @return {this} The current Helios instance for chaining.
	 * @example
	 * // Set the callback for the edge click event
	 * helios.onEdgeClick((edge) => {
	 * 	console.log("The edge " + edge.id + " was clicked");
	 * });
	 * @see {@link Helios#onEdgeDoubleClick}
	 * @see {@link Helios#onEdgeHoverStart}
	 * @see {@link Helios#onEdgeHoverEnd}
	 * @see {@link Helios#onEdgeHoverMove}
	 */
	onEdgeClick(callback) {
		this.onEdgeClickCallback = callback;
		return this;
	}

	/** Set the callback for the edge double click event.
	 * @method onEdgeDoubleClick
	 * @memberof Helios
	 * @instance
	 * @param {Function} callback - The callback function.
	 * @chainable
	 * @return {this} The current Helios instance for chaining.
	 * @example
	 * // Set the callback for the edge double click event
	 * helios.onEdgeDoubleClick((edge) => {
	 * 	console.log("The edge " + edge.id + " was double clicked");
	 * });
	 * @see {@link Helios#onEdgeClick}
	 * @see {@link Helios#onEdgeHoverStart}
	 * @see {@link Helios#onEdgeHoverEnd}
	 * @see {@link Helios#onEdgeHoverMove}
	 */
	onEdgeDoubleClick(callback) {
		this.onEdgeDoubleClickCallback = callback;
		return this;
	}

	/** Set the callback for the edge hover start event.
	 * @method onEdgeHoverStart
	 * @memberof Helios
	 * @instance
	 * @param {Function} callback - The callback function.
	 * @chainable
	 * @return {this} The current Helios instance for chaining.
	 * @example
	 * // Set the callback for the edge hover start event
	 * helios.onEdgeHoverStart((edge) => {
	 * 	console.log("The edge " + edge.id + " was hovered");
	 * });
	 * @see {@link Helios#onEdgeClick}
	 * @see {@link Helios#onEdgeDoubleClick}
	 * @see {@link Helios#onEdgeHoverEnd}
	 * @see {@link Helios#onEdgeHoverMove}
	 */
	onEdgeHoverStart(callback) {
		this.onEdgeHoverStartCallback = callback;
		return this;
	}

	/** Set the callback for the edge hover end event.
	 * @method onEdgeHoverEnd
	 * @memberof Helios
	 * @instance
	 * @param {Function} callback - The callback function.
	 * @chainable
	 * @return {this} The current Helios instance for chaining.
	 * @example
	 * // Set the callback for the edge hover end event
	 * helios.onEdgeHoverEnd((edge) => {
	 * 	console.log("The edge " + edge.id + " was no longer hovered");
	 * });
	 * @see {@link Helios#onEdgeClick}
	 * @see {@link Helios#onEdgeDoubleClick}
	 * @see {@link Helios#onEdgeHoverStart}
	 * @see {@link Helios#onEdgeHoverMove}
	 */
	onEdgeHoverEnd(callback) {
		this.onEdgeHoverEndCallback = callback;
		return this;
	}

	/** Set the callback for the edge hover move event.
	 * @method onEdgeHoverMove
	 * @memberof Helios
	 * @instance
	 * @param {Function} callback - The callback function.
	 * @chainable
	 * @return {this} The current Helios instance for chaining.
	 * @example
	 * // Set the callback for the edge hover move event
	 * helios.onEdgeHoverMove((edge) => {
	 * 	console.log("The edge " + edge.id + " was hovered");
	 * });
	 * @see {@link Helios#onEdgeClick}
	 * @see {@link Helios#onEdgeDoubleClick}
	 * @see {@link Helios#onEdgeHoverStart}
	 * @see {@link Helios#onEdgeHoverEnd}
	 */
	onEdgeHoverMove(callback) {
		this.onEdgeHoverMoveCallback = callback;
		return this;
	}

	/** Set the callback for the zoom event.
	 * @method onZoom
	 * @memberof Helios
	 * @instance
	 * @param {Function} callback - The callback function.
	 * @chainable
	 * @return {this} The current Helios instance for chaining.
	 * @example
	 * // Set the callback for the zoom event
	 * helios.onZoom((zoom) => {
	 * 	console.log("The zoom is now " + zoom);
	 * });
	 * @see {@link Helios#onRotation}
	 */
	onZoom(callback) {
		this.onZoomCallback = callback;
		return this;
	}

	/** Set the callback for the rotation event.
	 * @method onRotation
	 * @memberof Helios
	 * @instance
	 * @param {Function} callback - The callback function.
	 * @chainable
	 * @return {this} The current Helios instance for chaining.
	 * @example
	 * // Set the callback for the rotation event
	 * helios.onRotation((rotation) => {
	 * 	console.log("The rotation is now " + rotation);
	 * });
	 * @see {@link Helios#onZoom}
	 */
	onRotation(callback) {
		this.onRotationCallback = callback;
		return this;
	}

	/** Set the callback for the layout start event.
	 * @method onLayoutStart
	 * @memberof Helios
	 * @instance
	 * @param {Function} callback - The callback function.
	 * @chainable
	 * @return {this} The current Helios instance for chaining.
	 * @example
	 * // Set the callback for the layout start event
	 * helios.onLayoutStart(() => {
	 * 	console.log("The layout has started");
	 * });
	 * @see {@link Helios#onLayoutStop}
	 * @see {@link Helios#onLayoutTick}
	 * @see {@link Helios#onLayoutEnd}
	 */
	onLayoutStart(callback) {
		console.log("On start",this.layoutWorker)
		this.onLayoutStartCallback = callback;
		this?.layoutWorker.onStart(() => {
			this.onLayoutStartCallback?.();
		});
		return this;
	}


	/** Set the callback for the layout stop event.
	 * @method onLayoutStop
	 * @memberof Helios
	 * @instance
	 * @param {Function} callback - The callback function.
	 * @chainable
	 * @return {this} The current Helios instance for chaining.
	 * @example
	 * // Set the callback for the layout stop event
	 * helios.onLayoutStop(() => {
	 * 	console.log("The layout has stopped");
	 * });
	 * @see {@link Helios#onLayoutStart}
	 * @see {@link Helios#onLayoutTick}
	 */
	onLayoutStop(callback) {
		console.log("Stop",this.layoutWorker)
		this.onLayoutStopCallback = callback;
		this?.layoutWorker.onStop(() => {
			this.onLayoutStopCallback?.();
		});
		return this;
	}

	/** Set the callback for the draw event.
	 * @method onDraw
	 * @memberof Helios
	 * @instance
	 * @param {Function} callback - The callback function.
	 * @chainable
	 * @return {this} The current Helios instance for chaining.
	 * @example
	 * // Set the callback for the draw event
	 * helios.onDraw(() => {
	 * 	console.log("The graph was drawn");
	 * });
	 * @see {@link Helios#onReady}
	 */
	onDraw(callback) {
		this.onDrawCallback = callback;
		return this;
	}

	/** Set the callback for when Helios is ready and properly initialized.
	 * @method onReady
	 * @memberof Helios
	 * @instance
	 * @param {Function} callback - The callback function.
	 * @chainable
	 * @return {this} The current Helios instance for chaining.
	 * @example
	 * // Set the callback for when Helios is ready
	 * let helios = Helios("elementID",networkData);
	 * helios.onReady(() => {
	 * 	console.log("Helios is ready");
	 * });
	 */
	onReady(callback) {
		if (this._isReady) {
			callback?.(this);
		} else {
			this.onReadyCallback = callback;
		}
	}


	/** Set the callback for when Helios is cleaned up and properly disposed.
	 * @method onCleanup
	 * @memberof Helios
	 * @instance
	 * @param {Function} callback - The callback function.
	 * @chainable
	 * @return {this} The current Helios instance for chaining.
	 * @example
	 * // Set the callback for when Helios is cleaned up
	 * let helios = Helios("elementID",networkData);
	 * helios.onCleanup(() => {
	 * 	console.log("Helios is cleaned up");
	 * });
	 */
	onCleanup(callback) {
		if (this.isCleanedUp) {
			callback?.(this);
		} else {
			this.onCleanupCallback = callback;
		}
	}


	//#endregion


	//#region Style attributes

	/** Set the background color of the graph.
	 * @method backgroundColor
	 * @memberof Helios
	 * @instance
	 * @param {Array<number>} color - The background color of the graph in RGB or RGBA formats as 3 or 4 float entries from 0.0 to 1.0.
	 * @chainable
	 * @return {Array<number>|this} The background color of the panel or the current Helios instance for chaining.
	 * @example
	 * // Set the background color of the graph to red
	 * helios.backgroundColor([1.0,0,0,1.0]);
	 * @example
	 * // Get the background color of the graph
	 * let backgroundColor = helios.backgroundColor();
	 */
	backgroundColor(color) {
		// check if color is defined
		if (typeof color === "undefined") {
			return this._backgroundColor;
		} else {
			this._backgroundColor = color;
			return this;
		}
	}


	/** Set the color of the nodes.
	 * @method nodeColor
	 * @memberof Helios
	 * @instance
	 * @param {Array<number>|Function} colorInput - The color of the nodes in RGB or RGBA formats as 3 or 4 float entries from 0.0 to 1.0 or a function that returns the color of the nodes.
	 * @param {string} [nodeID] - The ID of the node to set the color of. If not specified, the color of all nodes will be set.
	 * @chainable
	 * @return {Array<number>|this} The color of the nodes or the current Helios instance for chaining.
	 * @example
	 * // Set the color of all nodes to red
	 * helios.nodeColor([1.0,0,0,1.0]);
	 * @example
	 * // Set the color of a specific node to red
	 * helios.nodeColor([1.0,0,0,1.0], "nodeID");
	 * @example
	 * // Set the color of all nodes to a random color
	 * helios.nodeColor((node) => {
	 * 	return [Math.random(), Math.random(), Math.random(), 1.0];
	 * });
	 * @example
	 * // Set the color of all nodes based on an node attribute called `altColor`
	 * helios.nodeColor((node) => {
	 * 	return node.altColor;
	 * });
	 */
	nodeColor(colorInput, nodeID) {
		if (typeof nodeID === "undefined") {
			if (typeof colorInput === "undefined") {
				return this.network.colors;
			} else if (typeof colorInput === "function") {
				// This may be used in future if we want to have a dynamic nodes
				// for (const [nodeID, node] of Object.entries(this.network.nodes)) {
				// 	let nodeIndex = this.network.ID2index[nodeID];

				let allNodes = this.network.index2Node;
				for (let nodeIndex = 0; nodeIndex < allNodes.length; nodeIndex++) {
					let node = allNodes[nodeIndex];
					let aColor = colorInput(node, nodeIndex, this.network);
					this.network.colors[nodeIndex * 4 + 0] = aColor[0];
					this.network.colors[nodeIndex * 4 + 1] = aColor[1];
					this.network.colors[nodeIndex * 4 + 2] = aColor[2];
					if (aColor.length > 3) {
						this.network.colors[nodeIndex * 4 + 3] = aColor[3];
					}

				}
			} else if (typeof colorInput === "number") {
				//index
				return this.network.colors[this.network.ID2index[colorInput]];
			} else {
				let allNodes = this.network.index2Node;
				for (let nodeIndex = 0; nodeIndex < allNodes.length; nodeIndex++) {
					this.network.colors[nodeIndex * 4 + 0] = colorInput[0];
					this.network.colors[nodeIndex * 4 + 1] = colorInput[1];
					this.network.colors[nodeIndex * 4 + 2] = colorInput[2];
					if (colorInput.length > 3) {
						this.network.colors[nodeIndex * 4 + 3] = colorInput[3];
					}
				}
			}
		} else {
			if (typeof colorInput === "function") {
				let nodeIndex = this.network.ID2index[nodeID];
				let aColor = colorInput(nodeID, nodeIndex, this.network);
				this.network.colors[nodeIndex * 4 + 0] = aColor[0];
				this.network.colors[nodeIndex * 4 + 1] = aColor[1];
				this.network.colors[nodeIndex * 4 + 2] = aColor[2];
				if (aColor.length > 3) {
					this.network.colors[nodeIndex * 4 + 3] = aColor[3];
				}
			} else {
				let nodeIndex = this.network.ID2index[nodeID];
				this.network.colors[nodeIndex * 4 + 0] = colorInput[0];
				this.network.colors[nodeIndex * 4 + 1] = colorInput[1];
				this.network.colors[nodeIndex * 4 + 2] = colorInput[2];
				if (colorInput.length > 3) {
					this.network.colors[nodeIndex * 4 + 3] = colorInput[3];
				}
			}
		}
		return this;
	}

	/** Set the size of the nodes.
	 * @method nodeSize
	 * @memberof Helios
	 * @instance
	 * @param {number|Function} sizeInput - The size of the nodes or a function that returns the size of the nodes.
	 * @param {string} [nodeID] - The ID of the node to set the size of. If not specified, the size of all nodes will be set.
	 * @chainable
	 * @return {number|this} The size of the nodes or the current Helios instance for chaining.
	 * @example
	 * // Set the size of all nodes to 10
	 * helios.nodeSize(10);
	 * @example
	 * // Set the size of a specific node to 10
	 * helios.nodeSize(10, "nodeID");
	 * @example
	 * // Set the size of all nodes to a random size
	 * helios.nodeSize(() => {
	 * 	return Math.random() * 10;
	 * });
	 * @example
	 * // Set the size of all nodes based on an node attribute called `altSize`
	 * helios.nodeSize((node) => {
	 * 	return node.altSize;
	 * });
	 */
	nodeSize(sizeInput, nodeID) {
		if (typeof nodeID === "undefined") {
			if (typeof sizeInput === "undefined") {
				return this.network.sizes;
			} else if (typeof sizeInput === "function") {
				let allNodes = this.network.index2Node;
				for (let nodeIndex = 0; nodeIndex < allNodes.length; nodeIndex++) {
					let node = allNodes[nodeIndex];
					let aSize = sizeInput(node, this.network);
					this.network.sizes[nodeIndex] = aSize;
				}
			} else {
				let allNodes = this.network.index2Node;
				for (let nodeIndex = 0; nodeIndex < allNodes.length; nodeIndex++) {
					this.network.sizes[nodeIndex] = sizeInput;
				}
			}
		} else {
			if (typeof sizeInput === "function") {
				let aSize = sizeInput(nodeID, this.network);
				let nodeIndex = this.network.ID2index[nodeID];
				this.network.sizes[nodeIndex] = aSize;
			} else {
				let nodeIndex = this.network.ID2index[nodeID];
				this.network.sizes[nodeIndex] = sizeInput;
			}
		}
		return this;
	}


	/** Set the color of the node outlines.
	 * @method nodeOutlineColor
	 * @memberof Helios
	 * @instance
	 * @param {number[]|Function} colorInput - The color of the node outlines or a function that returns the color of the node outlines. Uses RGBA or RGBA formatted array.
	 * @param {string} [nodeID] - The ID of the node to set the color of. If not specified, the color of all nodes will be set.
	 * @chainable
	 * @return {number[]|this} The color of the node outlines or the current Helios instance for chaining.
	 * @example
	 * // Set the color of all node outlines to red
	 * helios.nodeOutlineColor([1, 0, 0, 1]);
	 * @example
	 * // Set the color of a specific node outline to red
	 * helios.nodeOutlineColor([1, 0, 0, 1], "nodeID");
	 * @example
	 * // Set the color of all node outlines to a random color
	 * helios.nodeOutlineColor(() => {
	 * 	return [Math.random(), Math.random(), Math.random(), 1];
	 * });
	 * @example
	 * // Set the color of all node outlines based on an node attribute called `altColor`
	 * helios.nodeOutlineColor((node) => {
	 * 	return node.altColor;
	 * });
	 */
	nodeOutlineColor(colorInput, nodeID) {
		if (typeof nodeID === "undefined") {
			if (typeof colorInput === "undefined") {
				return this.network.outlineColors;
			} else if (typeof colorInput === "function") {
				let allNodes = this.network.index2Node;
				for (let nodeIndex = 0; nodeIndex < allNodes.length; nodeIndex++) {
					let node = allNodes[nodeIndex];
					let aColor = colorInput(node, nodeIndex, this.network);
					this.network.outlineColors[nodeIndex * 4 + 0] = aColor[0];
					this.network.outlineColors[nodeIndex * 4 + 1] = aColor[1];
					this.network.outlineColors[nodeIndex * 4 + 2] = aColor[2];
					if (aColor.length > 3) {
						this.network.outlineColors[nodeIndex * 4 + 3] = aColor[3];
					}
				}
			} else if (typeof colorInput === "number") {
				//index
				return this.network.outlineColors[this.network.ID2index[colorInput]];
			} else {
				let allNodes = this.network.index2Node;
				for (let nodeIndex = 0; nodeIndex < allNodes.length; nodeIndex++) {
					this.network.outlineColors[nodeIndex * 4 + 0] = colorInput[0];
					this.network.outlineColors[nodeIndex * 4 + 1] = colorInput[1];
					this.network.outlineColors[nodeIndex * 4 + 2] = colorInput[2];
					if (colorInput.length > 3) {
						this.network.outlineColors[nodeIndex * 4 + 3] = colorInput[3];
					}
				}
			}
		} else {
			if (typeof colorInput === "function") {
				let nodeIndex = this.network.ID2index[nodeID];
				let aColor = colorInput(nodeID, nodeIndex, this.network);
				this.network.outlineColors[nodeIndex * 4 + 0] = aColor[0];
				this.network.outlineColors[nodeIndex * 4 + 1] = aColor[1];
				this.network.outlineColors[nodeIndex * 4 + 2] = aColor[2];
				if (aColor.length > 3) {
					this.network.outlineColors[nodeIndex * 4 + 3] = aColor[3];
				}
			} else {
				let nodeIndex = this.network.ID2index[nodeID];
				this.network.outlineColors[nodeIndex * 4 + 0] = colorInput[0];
				this.network.outlineColors[nodeIndex * 4 + 1] = colorInput[1];
				this.network.outlineColors[nodeIndex * 4 + 2] = colorInput[2];
				if (colorInput.length > 3) {
					this.network.outlineColors[nodeIndex * 4 + 3] = colorInput[3];
				}
			}
		}
		return this;
	}

	/** Set the width of the node outlines.
	 * @method nodeOutlineWidth
	 * @memberof Helios
	 * @instance
	 * @param {number|Function} widthInput - The width of the node outlines or a function that returns the width of the node outlines.
	 * @param {string} [nodeID] - The ID of the node to set the width of. If not specified, the width of all nodes will be set.
	 * @chainable
	 * @return {number|this} The width of the node outlines or the current Helios instance for chaining.
	 * @example
	 * // Set the width of all node outlines to 5
	 * helios.nodeOutlineWidth(5);
	 * @example
	 * // Set the width of a specific node outline to 5
	 * helios.nodeOutlineWidth(5, "nodeID");
	 * @example
	 * // Set the width of all node outlines to a random width
	 * helios.nodeOutlineWidth(() => {
	 * 	return Math.random() * 10;
	 * });
	 * @example
	 * // Set the width of all node outlines based on an node attribute called `altWidth`
	 * helios.nodeOutlineWidth((node) => {
	 * 	return node.altWidth;
	 * });
	 * @example
	 * // Set the width of all node outlines based on an node attribute called `altWidth`
	 * helios.nodeOutlineWidth((node) => {
	 * 	return node.altWidth;
	 * });
	 */
	nodeOutlineWidth(widthInput, nodeID) {
		if (typeof nodeID === "undefined") {
			if (typeof widthInput === "undefined") {
				return this.network.outlineWidths;
			} else if (typeof widthInput === "function") {
				let allNodes = this.network.index2Node;
				for (let nodeIndex = 0; nodeIndex < allNodes.length; nodeIndex++) {
					let node = allNodes[nodeIndex];
					let aWidth = widthInput(node, this.network);
					this.network.outlineWidths[node.index] = aWidth;
				}
			} else {
				let allNodes = this.network.index2Node;
				for (let nodeIndex = 0; nodeIndex < allNodes.length; nodeIndex++) {
					this.network.outlineWidths[nodeIndex] = widthInput;
				}
			}
		} else {
			if (typeof widthInput === "function") {
				let aWidth = widthInput(nodeID, this.network);
				let nodeIndex = this.network.ID2index[nodeID];
				this.network.outlineWidths[nodeIndex] = aWidth;
			} else {
				let nodeIndex = this.network.ID2index[nodeID];
				this.network.outlineWidths[nodeIndex] = widthInput;
			}
		}
		return this;
	}



	/** Set the color of the edges.
	 * @method edgeColor
	 * @memberof Helios
	 * @instance
	 * @param {number|Function} colorInput - The color of the edges or a function that returns the color of the edges.
	 * @param {string} [edgeID] - The ID of the edge to set the color of. If not specified, the color of all edges will be set.
	 * @chainable
	 * @return {number|this} The color of the edges or the current Helios instance for chaining.
	 * @example
	 * // Set the color of all edges to red
	 * helios.edgeColor([1, 0, 0, 1]);
	 * @example
	 * // Set the color of a specific edge to red
	 * helios.edgeColor([1, 0, 0, 1], "edgeID");
	 * @example
	 * // Set the color of all edges to a random color
	 * helios.edgeColor(() => {
	 * 	return [Math.random(), Math.random(), Math.random(), 1];
	 * });
	 * @example
	 * // Set the color of all edges based on an edge attribute called `altColor`
	 * helios.edgeColor((edge) => {
	 * 	return edge.altColor;
	 * });
	 */
	edgeColor(colorInput, edgeID) {
		if (typeof edgeID === "undefined") {
			if (typeof colorInput === "undefined") {
				return this.network.edgeColors;
			} else if (typeof colorInput === "function") {
				// This may be used in future if we want to have a dynamic nodes
				// for (const [nodeID, node] of Object.entries(this.network.nodes)) {
				// 	let nodeIndex = this.network.ID2index[nodeID];

				let allNodes = this.network.index2Node;
				let allEdges = this.network.indexedEdges;
				for (let edgeIndex = 0; edgeIndex < allEdges.length / 2; edgeIndex++) {
					let sourceNode = allNodes[allEdges[edgeIndex * 2]];
					let targetNode = allNodes[allEdges[edgeIndex * 2 + 1]];
					let aColor = colorInput(edgeIndex, sourceNode, targetNode, this.network);
					if (aColor.length == 2) {// two colors
						this.network.edgeColors[(edgeIndex * 2) * 4 + 0] = aColor[0][0];
						this.network.edgeColors[(edgeIndex * 2) * 4 + 1] = aColor[0][1];
						this.network.edgeColors[(edgeIndex * 2) * 4 + 2] = aColor[0][2];
						this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 0] = aColor[1][0];
						this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 1] = aColor[1][1];
						this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 2] = aColor[1][2];
						if (aColor[0].length > 3) {
							this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 3] = aColor[0][3];
						}
						if (aColor[1].length > 3) {
							this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 3] = aColor[1][3];
						}
					} else {// two colors
						this.network.edgeColors[(edgeIndex * 2) * 4 + 0] = aColor[0];
						this.network.edgeColors[(edgeIndex * 2) * 4 + 1] = aColor[1];
						this.network.edgeColors[(edgeIndex * 2) * 4 + 2] = aColor[2];
						this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 0] = aColor[0];
						this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 1] = aColor[1];
						this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 2] = aColor[2];
						if (aColor.length > 3) {
							this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 3] = aColor[3];
							this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 3] = aColor[3];
						}
					}
				}
			} else if (typeof colorInput === "number") {
				//index
				return [this.network.edgeColors[colorInput * 2 + 0], this.network.edgeColors[colorInput * 2 + 1]];
			} else {

				let allNodes = this.network.index2Node;
				let allEdges = this.network.indexedEdges;
				for (let edgeIndex = 0; edgeIndex < allEdges.length / 2; edgeIndex++) {
					let sourceNode = allNodes[allEdges[edgeIndex * 2]];
					let targetNode = allNodes[allEdges[edgeIndex * 2 + 1]];
					if (colorInput.length == 2) {// two colors
						this.network.edgeColors[(edgeIndex * 2) * 4 + 0] = colorInput[0][0];
						this.network.edgeColors[(edgeIndex * 2) * 4 + 1] = colorInput[0][1];
						this.network.edgeColors[(edgeIndex * 2) * 4 + 2] = colorInput[0][2];
						this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 0] = colorInput[1][0];
						this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 1] = colorInput[1][1];
						this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 2] = colorInput[1][2];
						if (colorInput[0].length > 3) {
							this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 3] = colorInput[0][3];
						}
						if (colorInput[1].length > 3) {
							this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 3] = colorInput[1][3];
						}
					} else {// two colors
						this.network.edgeColors[(edgeIndex * 2) * 4 + 0] = colorInput[0];
						this.network.edgeColors[(edgeIndex * 2) * 4 + 1] = colorInput[1];
						this.network.edgeColors[(edgeIndex * 2) * 4 + 2] = colorInput[2];
						this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 0] = colorInput[0];
						this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 1] = colorInput[1];
						this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 2] = colorInput[2];
						if (colorInput.length > 3) {
							this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 3] = colorInput[3];
							this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 3] = colorInput[3];
						}
					}
				}
			}
		} else {
			let aColor = colorInput;
			if (typeof colorInput === "function") {
				let aColor = colorInput(nodeID, nodeIndex, this.network);
			}
			let nodeIndex = this.network.ID2index[nodeID];
			if (colorInput.length == 2) {// two colors
				this.network.edgeColors[(edgeIndex * 2) * 4 + 0] = colorInput[0][0];
				this.network.edgeColors[(edgeIndex * 2) * 4 + 1] = colorInput[0][1];
				this.network.edgeColors[(edgeIndex * 2) * 4 + 2] = colorInput[0][2];
				this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 0] = colorInput[1][0];
				this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 1] = colorInput[1][1];
				this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 2] = colorInput[1][2];
				if (colorInput[0].length > 3) {
					this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 3] = colorInput[0][3];
				}
				if (colorInput[1].length > 3) {
					this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 3] = colorInput[1][3];
				}
			} else {// two colors
				this.network.edgeColors[(edgeIndex * 2) * 4 + 0] = colorInput[0];
				this.network.edgeColors[(edgeIndex * 2) * 4 + 1] = colorInput[1];
				this.network.edgeColors[(edgeIndex * 2) * 4 + 2] = colorInput[2];
				this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 0] = colorInput[0];
				this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 1] = colorInput[1];
				this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 2] = colorInput[2];
				if (colorInput.length > 3) {
					this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 3] = colorInput[3];
					this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 3] = colorInput[3];
				}
			}
		}
		return this;
	}


	/** Set the width of the edges. 
	 * @method edgeWidth
	 * @memberof Helios
	 * @instance
	 * @param {number|function} widthInput - The width of the edges. If a function is provided, it will be called for each edge. The function should return a number or an array of two numbers, the width at the source and target.
	 * @param {number} [edgeIndex] - The index of the edge. If not provided, the width will be set for all edges.
	 * @return {number|this} - The width of the edge if no arguments are provided, otherwise the Helios instance for chaining.
	 * @example
	 * // Set the width of all edges to 5.
	 * helios.edgeWidth(5);
	 * @example
	 * // Set the width of the edge with index 0 to 5.
	 * helios.edgeWidth(5, 0);
	 * @example
	 * // Set the width of all edges to a random number between 1 and 10.
	 * helios.edgeWidth(sourceNode, targetNode, edgeIndex) => {
	 *    return Math.random() * 9 + 1;
	 * });
	 * @example
	 * // Set the width of all edges to 5 at source and 2 at target.
	 * helios.edgeWidth(sourceNode, targetNode, edgeIndex) => {
	 *   return [5, 2];
	 * });
	 * @example
	 * // Set the width of the edge with altSizes properties from source and target.
	 * helios.edgeWidth(sourceNode, targetNode, edgeIndex) => {
	 *  return [sourceNode.altSizes, targetNode.altSizes];
	 * });
	 */
	edgeWidth(widthInput, edgeIndex) {
		if (typeof edgeIndex === "undefined") {
			if (typeof widthInput === "undefined") {
				return this.network.edgeColors;
			} else if (typeof widthInput === "function") {
				let allNodes = this.network.index2Node;
				let allEdges = this.network.indexedEdges;
				for (let edgeIndex = 0; edgeIndex < allEdges.length / 2; edgeIndex++) {
					let sourceNode = allNodes[allEdges[edgeIndex * 2]];
					let targetNode = allNodes[allEdges[edgeIndex * 2 + 1]];
					let aWidth = widthInput(sourceNode, targetNode, edgeIndex, this.network);

					if (typeof aWidth === "number") {
						this.network.edgeSizes[edgeIndex * 2] = aWidth;
						this.network.edgeSizes[edgeIndex * 2 + 1] = aWidth;
					} else {
						this.network.edgeSizes[edgeIndex * 2] = aWidth[0];
						this.network.edgeSizes[edgeIndex * 2 + 1] = aWidth[1];
					}
				}
			} else {
				let allEdges = this.network.indexedEdges;
				for (let edgeIndex = 0; edgeIndex < allEdges.length / 2; edgeIndex++) {
					if (typeof widthInput === "number") {
						this.network.edgeSizes[edgeIndex * 2] = widthInput;
						this.network.edgeSizes[edgeIndex * 2 + 1] = widthInput;
					} else {
						this.network.edgeSizes[edgeIndex * 2] = widthInput[0];
						this.network.edgeSizes[edgeIndex * 2 + 1] = widthInput[1];
					}
				}
			}
		} else {
			if (typeof widthInput === "function") {
				let allNodes = this.network.index2Node;
				let allEdges = this.network.indexedEdges;
				let sourceNode = allNodes[allEdges[edgeIndex * 2]];
				let targetNode = allNodes[allEdges[edgeIndex * 2 + 1]];
				let aWidth = widthInput(sourceNode, targetNode, edgeIndex, this.network);
				if (typeof aWidth === "number") {
					this.network.edgeSizes[edgeIndex * 2] = aWidth;
					this.network.edgeSizes[edgeIndex * 2 + 1] = aWidth;
				} else {
					this.network.edgeSizes[edgeIndex * 2] = aWidth[0];
					this.network.edgeSizes[edgeIndex * 2 + 1] = aWidth[1];
				}
			} else if (typeof widthInput === "number") {
				this.network.edgeSizes[edgeIndex * 2] = widthInput;
				this.network.edgeSizes[edgeIndex * 2 + 1] = widthInput;
			} else {
				this.network.edgeSizes[edgeIndex * 2] = widthInput[0];
				this.network.edgeSizes[edgeIndex * 2 + 1] = widthInput[1];
			}
		}
		return this;
	}


	/** Project the positions of the nodes provided to the screen (using the projection matrix).
	 * @method getProjectedPositions
	 * @memberof Helios
	 * @instance
	 * @param {Node[]|number} nodes - The nodes or indices of nodes to project.
	 * @return {Float32Array} - The projected positions of the nodes.
	 * @example
	 * // Get the projected positions of all nodes.
	 * let projectedPositions = helios.getProjectedPositions(helios.network.nodes);
	 */
	getProjectedPositions(nodes) {
		// Use the CPU to project the positions
		// if nodes are provided, use them, otherwise use all nodes
		if (nodes === undefined) {
			nodes = this.network.nodes;
		}
		// if nodes is not empty
		if (nodes.length > 0) {
			const gl = this.gl;
			let nodeIndices = new Uint32Array(nodes.length);
			if (typeof nodes[0] === "number") {
				for (let i = 0; i < nodes.length; i++) {
					nodeIndices[i] = nodes[i];
				}
			} else {
				nodeIndices = new Uint32Array(nodes.length);
				for (let i = 0; i < nodes.length; i++) {
					nodeIndices[i] = nodes[i].index;
				}
			}
			let nodePositions = this.network.positions;
			let projectedPositions = new Float32Array(nodes.length * 4);

			let [w2d, h2d] = this._lastCanvasDimensions;

			for (let i = 0; i < nodes.length; i++) {
				let nodeIndex = nodeIndices[i];
				let nodePosition = [nodePositions[nodeIndex * 3], nodePositions[nodeIndex * 3 + 1], nodePositions[nodeIndex * 3 + 2], 1.0];

				let projectedPosition = glm.vec4.create();
				glm.vec4.transformMat4(projectedPosition, nodePosition, this.projectionViewMatrix);
				// console.log(projectedPosition)
				// mat4.multiplyVec4(projectionViewMatrix, position, dest);
				// if (projectedPosition[2] < 0) {//behind the camera
				// 	// continue;
				// }

				let perspectiveFactor = 1.0 / projectedPosition[3];

				// if(!this._orthographic){
				// 	perspectiveFactor = 1.0 / (projectedPosition[3]);
				// }
				let x = w2d / 2 + projectedPosition[0] * w2d * 0.5 * perspectiveFactor;
				let y = h2d / 2 - projectedPosition[1] * h2d * 0.5 * perspectiveFactor;
				//perspective divide
				projectedPositions[i * 4] = x;
				projectedPositions[i * 4 + 1] = y;
				projectedPositions[i * 4 + 2] = projectedPosition[2];
				projectedPositions[i * 4 + 3] = projectedPosition[3];
			}
			return projectedPositions;
		} else {
			return Float32Array(0);
		}
	}



	/** Pick a node at the given screen coordinates.
	 * @method pickNode
	 * @memberof Helios
	 * @instance
	 * @param {number} x - The x coordinate of the point to pick.
	 * @param {number} y - The y coordinate of the point to pick.
	 * @return {Node} - The node at the given point, or null if no node was picked.
	 * @example
	 * // Pick a node at the center of the canvas.
	 * let node = helios.pickNode(helios.canvasElement.width / 2, helios.canvasElement.height / 2);
	 * if(node !== null) {
	 *    console.log("Picked node " + node.index);
	 * }
	 * @example
	 * // Pick a node at the center of the canvas, and highlight it.
	 * let node = helios.pickNode(helios.canvasElement.width / 2, helios.canvasElement.height / 2);
	 * if(node !== null) {
	 *   console.log("Picked node " + node.index);
	 *  helios.highlightNode(node);
	 * }
	 */
	pickPoint(x, y) {
		const fbWidth = this.canvasElement.width * this.pickingResolutionRatio;
		const fbHeight = this.canvasElement.height * this.pickingResolutionRatio;
		const pixelX = Math.round(x * fbWidth / this.canvasElement.clientWidth - 0.5);
		const pixelY = Math.round(fbHeight - y * fbHeight / this.canvasElement.clientHeight - 0.5);
		const data = new Uint8Array(4);
		const gl = this.gl;
	
		// Helper function to read the ID
		const readID = () => {
			gl.readPixels(
				pixelX,            // x
				pixelY,            // y
				1,                 // width
				1,                 // height
				gl.RGBA,           // format
				gl.UNSIGNED_BYTE,  // type
				data);             // typed array to hold result
			return (data[0] + (data[1] << 8) + (data[2] << 16) + (data[3] << 24)) - 1;
		};
	
		// Bind the framebuffer for picking
		gl.bindFramebuffer(gl.FRAMEBUFFER, this.pickingFramebuffer);
	
		const ID = readID();
		if (ID >= 0) {
			// it is a node or edge
			if (ID < this.network.nodeCount) {
				return ID; // Node
			} else if (ID <= this.network.nodeCount) {
				return ID; // Edge
			}
		}
		
		return -1; // Nothing picked

	}
	

	_consolidateCentroids(centroids, counts) {
		for (const [nodeAttribute, centroid] of centroids) {
			const count = counts.get(nodeAttribute);
			centroid[0] /= count;
			centroid[1] /= count;
		}
	}

	_calculateCentroidForAttribute(nodeAttribute, xy, centroids, counts) {
		// const xy = this._pixelXYOnScreen[i];
		if (!centroids.has(nodeAttribute)) {
			centroids.set(nodeAttribute, [0, 0]);
			counts.set(nodeAttribute, 0);
		}
		const centroid = centroids.get(nodeAttribute);
		centroid[0] += xy[0];
		centroid[1] += xy[1];

		const count = counts.get(nodeAttribute);
		counts.set(nodeAttribute, count + 1);
	}


	_updateTrackerNodesData() {
		const gl = this.gl;
		const data = this._trackingBufferPixels;
		const nodesOnScreen = this._nodesOnScreen;

		gl.bindFramebuffer(gl.FRAMEBUFFER, this._trackingFramebuffer);
		gl.readPixels(
			0,            // x
			0,            // y
			this._trackingFramebuffer.size.width,                 // width
			this._trackingFramebuffer.size.height,                 // height
			gl.RGBA,           // format
			gl.UNSIGNED_BYTE,  // type
			data);             // typed array to hold result
		//  if this.pixelCountsByIndex is not defined

		for (let i = 0; i < data.length; i += 4) {
			const nodeIndex = (data[i] + (data[i + 1] << 8) + (data[i + 2] << 16) + (data[i + 3] << 24)) - 1;
			nodesOnScreen[i / 4] = nodeIndex;
		}

	}

	/** Pick a node at the given screen coordinates.
	 * @method updateAttributeTrackers
	 * @memberof Helios
	 * @instance
	 * @chainable
	 * @return {Helios|this} - The Helios instance (for chaining).
	 */
	updateAttributeTrackers(avoidPixelBufferUpdate = false) {
		if (!this._trackingBufferEnabled || Object.keys(this._attributeTrackers).length === 0) {
			return this;
		}
		const attributeTrackers = this._attributeTrackers;
		const totalPixels = this._trackingFramebuffer.size.width * this._trackingFramebuffer.size.height;


		const nodesOnScreen = this._nodesOnScreen;
		const XYPositions = this._pixelXYOnScreen;

		if (!avoidPixelBufferUpdate) {
			this._updateTrackerNodesData();
		}

		const now = performance.now();
		let elapsedTime = now - this._trackingLastTime || now;
		if (elapsedTime > 1000) {
			elapsedTime = 1000;
		}
		this._trackingLastTime = now;

		for (let trackedAttributeEntryKey in attributeTrackers) {
			const trackedAttributeEntry = attributeTrackers[trackedAttributeEntryKey];
			const pixelCounter = trackedAttributeEntry.pixelCounter;
			const currentKeys = pixelCounter.getSortedKeys();
			const smoothness = trackedAttributeEntry.smoothness;
			const minProportion = trackedAttributeEntry.minProportion;
			const calculateCentroid = trackedAttributeEntry.calculateCentroid;
			const centroidPositions = trackedAttributeEntry.centroidPositions;
			const attribute = trackedAttributeEntry.attribute;
			const maxLabels = trackedAttributeEntry.maxLabels;
			const centroids = new Map();
			const counts = new Map();

			// calculate coefficient based on elapsed time of the last update using performance



			// const coefficient = Math.exp(- (now - trackedAttributeEntry.lastUpdate) / smoothness);
			const coefficient = Math.exp(-elapsedTime / (100 * smoothness));
			// const coefficient = smoothness;
			// console.log(coefficient);

			// smoothness = -30/log(0.8)

			// const attribute = trackedAttributeEntry.attribute;
			// console.log(currentKeys.length);
			for (let i = 0; i < currentKeys.length; i++) {
				const currentKey = currentKeys[i];
				const newValue = pixelCounter.get(currentKeys[i]) * coefficient;
				if (newValue > minProportion) {
					// console.log(newValue);
					pixelCounter.set(currentKeys[i], newValue);
					if (calculateCentroid) {
						if (centroidPositions.has(currentKeys[i])) {
							const centroidPosition = centroidPositions.get(currentKeys[i]);
							if (centroidPosition) {
								centroidPosition[0] *= coefficient;
								centroidPosition[1] *= coefficient;
							}
							// centroidPositions.set(currentKeys[i], centroidPosition);
						}
					}
				} else {
					pixelCounter.delete(currentKeys[i]);
					if (calculateCentroid) {
						centroidPositions.delete(currentKeys[i]);
					}
				}
			}
			// const totalPixels

			if (attribute == "index") {
				for (let i = 0; i < nodesOnScreen.length; i++) {
					const nodeIndex = nodesOnScreen[i];
					if (nodeIndex >= 0) {
						const newValue = (pixelCounter.get(nodeIndex) || 0) + 1.0 / totalPixels * (1.0 - coefficient);
						pixelCounter.set(nodeIndex, newValue);
						if (calculateCentroid) {
							this._calculateCentroidForAttribute(nodeIndex, XYPositions[i], centroids, counts);
						}
					}
				}
				// is a function
			} else if (attribute == "node") {
				for (let i = 0; i < nodesOnScreen.length; i++) {
					const index2node = this.network.index2Node;
					if (nodeIndex >= 0) {
						const node = index2node[nodeIndex];
						const newValue = (pixelCounter.get(node) || 0) + 1.0 / totalPixels * (1.0 - coefficient);
						pixelCounter.set(node, newValue);
						if (calculateCentroid) {
							this._calculateCentroidForAttribute(node, XYPositions[i], centroids, counts);
						}
					}
				}
				// is a function
			} else if (typeof attribute === 'function') {
				const index2node = this.network.index2Node;
				for (let i = 0; i < nodesOnScreen.length; i++) {
					const nodeIndex = nodesOnScreen[i];
					if (nodeIndex >= 0) {
						const node = index2node[nodeIndex];
						const attributeEntry = attribute(node, nodeIndex);
						const newValue = (pixelCounter.get(attributeEntry) || 0) + 1.0 / totalPixels * (1.0 - coefficient);
						pixelCounter.set(attributeEntry, newValue);
						if (calculateCentroid) {
							this._calculateCentroidForAttribute(attributeEntry, XYPositions[i], centroids, counts);
						}
					}
				}
				// attribute is a string
			} else {
				const index2node = this.network.index2Node;
				for (let i = 0; i < nodesOnScreen.length; i++) {
					const nodeIndex = nodesOnScreen[i];
					if (nodeIndex >= 0) {
						const node = index2node[nodeIndex];
						const attributeEntry = node[attribute];
						const newValue = (pixelCounter.get(attributeEntry) || 0) + 1.0 / totalPixels * (1.0 - coefficient);
						pixelCounter.set(attributeEntry, newValue);
						if (calculateCentroid) {
							this._calculateCentroidForAttribute(attributeEntry, XYPositions[i], centroids, counts);
						}
					}
				}
			}

			if (calculateCentroid) {
				this._consolidateCentroids(centroids, counts);
				for (let [key, value] of centroids) {
					// add to centroidPositions if not null, otherwise set it to the new centroids
					const centroidPosition = centroidPositions.get(key);
					const newCentroidPosition = value;
					if (centroidPosition) {
						// add new centroid (1.0 - coefficient)
						centroidPosition[0] += newCentroidPosition[0] * (1.0 - coefficient);
						centroidPosition[1] += newCentroidPosition[1] * (1.0 - coefficient);

						// centroidPosition[0] = newCentroidPosition[0];
						// centroidPosition[1] = newCentroidPosition[1];
					} else {
						centroidPositions.set(key, newCentroidPosition);
					}
				}
			}


			if (maxLabels >= 0) {
				// keeping only 10* maxLabels
				let trackedKeys = pixelCounter.getSortedKeys();
				let toRemove = trackedKeys.slice(maxLabels, trackedKeys.length);
				for (let i = 0; i < toRemove.length; i++) {
					pixelCounter.delete(toRemove[i]);
					centroidPositions.delete(toRemove[i]);
				}
			}

		}
		return this;
		// let IDProportion = this.pixelCountsByIndex.getSortedPairs();
		// return IDProportion.slice(0,maxLabels);
	}

	/** Returns the attributes on screen
	 * @method trackedAttributesOnScreen
	 * @memberof Helios
	 * @instance
	 * @private
	 * @param {string} trackerName - Name of the tracker to get the attributes from.
	 * @return {Array} - Array of attributes on screen. Each entry is an array of two or four elements. 
	 * if the tracker saves the centroid, 4 elements are returned: [attribute,proportion, x, y], otherwise [attribute,proportion]
	 */
	trackedAttributesOnScreen(trackerName) {
		if (this._trackingBufferEnabled && this._attributeTrackers[trackerName]) {
			const attributeTracker = this._attributeTrackers[trackerName];
			const pixelCounter = attributeTracker.pixelCounter;
			// const IDProportion = 
			if (attributeTracker.calculateCentroid) {
				const centroidPositions = attributeTracker.centroidPositions;
				const IDProportion = pixelCounter.getSortedPairs();
				// add the centroid positions to the array [ID,proportion,x,y]
				for (let i = 0; i < IDProportion.length; i++) {
					const ID = IDProportion[i][0];
					const proportion = IDProportion[i][1];
					const centroidPosition = centroidPositions.get(ID);
					IDProportion[i] = [ID, proportion, centroidPosition[0], centroidPosition[1]];
				}
				return IDProportion;
			} else {
				return pixelCounter.getSortedPairs();
			}
		}
	}


	/** Returns tracked attributes centroids
	 * @method trackedAttributesCentroids
	 * @memberof Helios
	 * @instance
	 * @private
	 * @param {string} trackerName - Name of the tracker to get the attributes from.
	 * 
	 * @return {Array} - Centroid of trackerName.
	 * 
	 */
	trackedAttributesCentroids(trackerName) {
		if (this._trackingBufferEnabled && this._attributeTrackers[trackerName]) {
			const attributeTracker = this._attributeTrackers[trackerName];
			return attributeTracker.centroidPositions;
		}
	}

	/** Update the attribute trackers Schedule.
	 * @method _updateTrackerScheduleTask
	 * @memberof Helios
	 * @instance
	 * @private
	 */
	_updateTrackerScheduleTask() {
		const trackerTaskName = "9.5.tracker_update";
		if (!this._trackingBufferEnabled || Object.keys(this._attributeTrackers).length === 0) {
			if (this.scheduler.hasTask(trackerTaskName)) {
				this.scheduler.unschedule(trackerTaskName);
				// this.scheduler.unschedule(trackerNodeUpdateTaskName);
			}
		} else if (!this.scheduler.hasTask(trackerTaskName)) {
			this.scheduler.schedule({
				name: trackerTaskName,
				callback: (elapsedTime, task) => {
					this.updateAttributeTrackers(true);
					for (let trackerName in this._attributeTrackers) {
						const tracker = this._attributeTrackers[trackerName];
						if (tracker.onTrack) {
							tracker.onTrack(this.trackedAttributesOnScreen(trackerName), tracker);
						}
					}
				},
				delay: 0,
				repeatInterval: this._trackingNodeMinimumUpdateInterval,
				repeat: true,
				synchronized: true,
				afterRedraw: true,
				immediateUpdates: false,
				redraw: false,
				updateNodesGeometry: false,
				updateEdgesGeometry: false,
			});

		}
	}

	/** Set the attribute to track.
	 * @method trackAttribute
	 * @memberof Helios
	 * @instance
	 * @chainable
	 * @param {string} trackerName - A tracker name so that it can be untracked later.
	 * @param {string|function} attribute - The attribute to track. If a string, it is the name of the attribute of the node to track (use "index" for index and "node" for the node itself). If a function, it is a function that takes a node and its index as arguments and returns the attribute to track.
	 * 	 * @param {Object} options - The configuration object
	 * @param {string} [options.minProportion=0.001] - The minimum proportion of the screen that a node must occupy to be tracked.
	 * @param {string} [options.smoothness=0.8] - The smoothness of the tracking. The higher the value, the more the tracking is smoothed.
	 * @param {string} [options.maxLabels=20] - The maximum number of labels to display. If -1, all labels are displayed.
	 * @param {string} [options.calculateCentroid=false] - If true, the centroid of the tracked nodes is calculated and expored as the 3rd and 4th (x and y) elements of the tracker results.
	 * @param {function} [options.onTrack=null] - A callback function that is called when a node is tracked. It takes the attribute entries and relative proportions as argument and the tracker (attributeProportions,tracker)=>{} 
	 * @return {Helios|this} - The Helios instance for chaining.
	 * @example
	 * // Track the index of the nodes, with a minimum proportion of 0.001, a smoothness of 0.8 and a maximum of 10 labels.
	 * helios.trackAttribute("indexTracker","index",{minProportion:0.001,smoothness:0.8,maxLabels:20});
	 * @example
	 * // Track the community attribute of the nodes, with a minimum proportion of 0.001, a smoothness of 0.8 and a maximum of 20 labels.
	 * helios.trackAttribute("communityTracker","community",{minProportion:0.001,smoothness:0.8,maxLabels:20});
	 */
	trackAttribute(trackerName, attribute, { minProportion = 0.001, smoothness = 0.8, maxLabels = 20, calculateCentroid = false, onTrack = null } = {}) {
		if (trackerName in this._attributeTrackers) {
			this.untrackAttribute(trackerName);
		}
		this._attributeTrackers[trackerName] = {
			attribute: attribute,
			pixelCounter: new SortedValueMap(false),
			minProportion: minProportion,
			smoothness: smoothness,
			maxLabels: maxLabels,
			calculateCentroid: calculateCentroid,
			centroidPositions: new Map(),
			onTrack: onTrack,
		};

		this._updateTrackerScheduleTask();
		return this;
	}

	/** Untrack the attribute.
	 * @method untrackAttribute
	 * @memberof Helios
	 * @instance
	 * @chainable
	 * @param {string|function} attribute - The attribute to untrack. If a string, it is the name of the attribute of the node to untrack (use "index" for index and "node" for the node itself). If a function, it is a function that takes a node and its index as arguments and returns the attribute to untrack.
	 * @return {Helios|this} - The Helios instance for chaining.
	 * @example
	 * // Untrack the index of the nodes.
	 * helios.untrackAttribute("indexTracker");
	 */
	untrackAttribute(attribute) {
		this._attributeTrackers = this._attributeTrackers.filter((trackedAttribute) => {
			return trackedAttribute.attribute !== attribute;
		});
		this._updateTrackerScheduleTask();
		return this;
	}

	/** attributesTrackers getter.
	 * @method attributesTrackers
	 * @memberof Helios
	 * @instance
	 * @return {Object} - The tracked attributes.
	 * @example
	 * // Get the tracked attributes.
	 * let attributesTrackers = helios.attributesTrackers();
	 */
	attributesTrackers() {
		// copy the _attributeTrackers object
		return Object.assign({}, this._attributeTrackers);
	}

	/** Set/get tracker node update interval.
	 * @method trackingNodeUpdateInterval
	 * @memberof Helios
	 * @instance
	 * @chainable
	 * @param {number} interval - The interval in milliseconds.
	 * @return {Helios|this} - The Helios instance for chaining, or the current interval if no argument is provided.
	 * @example
	 * // Set the tracker node update interval to 200ms.
	 * helios._trackingBufferUpdateInterval(200);
	 * @example
	 * // Get the tracker node update interval.
	 * let interval = helios._trackingBufferUpdateInterval();
	 * console.log(interval);
	 */
	trackingBufferUpdateInterval(interval) {
		// check if interval is defined
		if (typeof interval === "undefined") {
			return this._trackingBufferUpdateInterval;
		} else {
			this._trackingBufferUpdateInterval = interval;
			this._updateTrackerScheduleTask();
			return this;
		}
	}

	/** Set/get tracker update interval
	 * @method trackingUpdateInterval
	 * @memberof Helios
	 * @instance
	 * @chainable
	 * @param {number} interval - The interval in milliseconds.
	 * @return {Helios|this} - The Helios instance for chaining, or the current interval if no argument is provided.
	 * @example
	 * // Set the tracker update interval to 33ms.
	 * helios._trackingUpdateInterval(33);
	 * @example
	 * // Get the tracker update interval.
	 * let interval = helios._trackingUpdateInterval();
	 * console.log(interval);
	 */
	trackingUpdateInterval(interval) {
		// check if interval is defined
		if (typeof interval === "undefined") {
			return this._trackingUpdateInterval;
		} else {
			this._trackingUpdateInterval = interval;
			this._updateTrackerScheduleTask();
			return this;
		}
	}


	/** Set/get edge global opacity scale. The opacity of each edge is calculated as: opacity = globalBase + globalScale * edgeOpacity
	 * @method edgesGlobalOpacityScale
	 * @memberof Helios
	 * @instance
	 * @chainable
	 * @param {number} opacity - The global opacity scale of the edges.
	 * @return {Helios|this} - The Helios instance for chaining, or the current global opacity if no argument is provided.
	 * @example
	 * // Set the global opacity of the edges to 0.5.
	 * helios.edgesGlobalOpacityScale(0.5);
	 */
	edgesGlobalOpacityScale(opacity) {
		// check if color is defined
		if (typeof opacity === "undefined") {
			return this._edgesGlobalOpacityScale;
		} else {
			this._edgesGlobalOpacityScale = opacity;
			return this;
		}
	}

	/** Set/get edge global opacity base. The opacity of each edge is calculated as: opacity = globalBase + globalScale * edgeOpacity
	 * @method edgesGlobalOpacityBase
	 * @memberof Helios
	 * @instance
	 * @chainable
	 * @param {number} opacity - The global opacity base of the edges.
	 * @return {Helios|this} - The Helios instance for chaining, or the current global opacity if no argument is provided.
	 * @example
	 * // Set the global opacity base of the edges to 0.5.
	 * helios.edgesGlobalOpacityBase(0.5);
	 */
	edgesGlobalOpacityBase(opacity) {
		// check if color is defined
		if (typeof opacity === "undefined") {
			return this._edgesGlobalOpacityBase;
		} else {
			this._edgesGlobalOpacityBase = opacity;
			return this;
		}
	}

	/** Set/get edge global width scale. The width of each edge is calculated as: width = globalBase + globalScale * edgeWidth
	 * @method edgesGlobalWidthScale
	 * @memberof Helios
	 * @instance
	 * @chainable
	 * @param {number} width - The global width scale of the edges.
	 * @return {Helios|this} - The Helios instance for chaining, or the current global width if no argument is provided.
	 * @example
	 * // Set the global width of the edges to 0.5.
	 * helios.edgesGlobalWidthScale(0.5);
	 */
	edgesGlobalWidthScale(width) {
		// check if color is defined
		if (typeof width === "undefined") {
			return this._edgesGlobalWidthScale;
		} else {
			this._edgesGlobalWidthScale = width;
			return this;
		}
	}

	/** Set/get edge global width base. The width of each edge is calculated as: width = globalBase + globalScale * edgeWidth
	 * @method edgesGlobalWidthBase
	 * @memberof Helios
	 * @instance
	 * @chainable
	 * @param {number} width - The global width base of the edges.
	 * @return {Helios|this} - The Helios instance for chaining, or the current global width if no argument is provided.
	 * @example
	 * // Set the global width base of the edges to 0.5.
	 * helios.edgesGlobalWidthBase(0.5);
	 */
	edgesGlobalWidthBase(width) {
		// check if color is defined
		if (typeof width === "undefined") {
			return this._edgesGlobalWidthBase;
		} else {
			this._edgesGlobalWidthBase = width;
			return this;
		}
	}

	/** Set/get node global opacity scale. The opacity of each node is calculated as: opacity = globalBase + globalScale * nodeOpacity
	 * @method nodesGlobalOpacityScale
	 * @memberof Helios
	 * @instance
	 * @chainable
	 * @param {number} opacity - The global opacity scale of the nodes.
	 * @return {Helios|this} - The Helios instance for chaining, or the current global opacity if no argument is provided.
	 * @example
	 * // Set the global opacity of the nodes to 0.5.
	 * helios.nodesGlobalOpacityScale(0.5);
	 * @example
	 * // Get the global opacity of the nodes.
	 * let scale = helios.nodesGlobalOpacityScale();
	 */
	nodesGlobalOpacityScale(opacity) {
		// check if color is defined
		if (typeof opacity === "undefined") {
			return this._nodesGlobalOpacityScale;
		} else {
			this._nodesGlobalOpacityScale = opacity;
			return this;
		}
	}

	/** Set/get node global opacity base. The opacity of each node is calculated as: opacity = globalBase + globalScale * nodeOpacity
	 * @method nodesGlobalOpacityBase
	 * @memberof Helios
	 * @instance
	 * @chainable
	 * @param {number} opacity - The global opacity base of the nodes.
	 * @return {Helios|this} - The Helios instance for chaining, or the current global opacity if no argument is provided.
	 * @example
	 * // Set the global opacity base of the nodes to 0.5.
	 * helios.nodesGlobalOpacityBase(0.5);
	 * @example
	 * // Get the global opacity base of the nodes.
	 * let base = helios.nodesGlobalOpacityBase();
	 */
	nodesGlobalOpacityBase(opacity) {
		// check if color is defined
		if (typeof opacity === "undefined") {
			return this._nodesGlobalOpacityBase;
		} else {
			this._nodesGlobalOpacityBase = opacity;
			return this;
		}
	}

	/** Set/get node global size scale. The size of each node is calculated as: size = globalBase + globalScale * nodeSize
	 * @method nodesGlobalSizeScale
	 * @memberof Helios
	 * @instance
	 * @chainable
	 * @param {number} size - The global size scale of the nodes.
	 * @return {Helios|this} - The Helios instance for chaining, or the current global size if no argument is provided.
	 * @example
	 * // Set the global size of the nodes to 0.5.
	 * helios.nodesGlobalSizeScale(0.5);
	 * @example
	 * // Get the global size of the nodes.
	 * let scale = helios.nodesGlobalSizeScale();
	 */
	nodesGlobalSizeScale(size) {
		// check if color is defined
		if (typeof size === "undefined") {
			return this._nodesGlobalSizeScale;
		} else {
			this._nodesGlobalSizeScale = size;
			return this;
		}
	}

	/** Set/get node global size base. The size of each node is calculated as: size = globalBase + globalScale * nodeSize
	 * @method nodesGlobalSizeBase
	 * @memberof Helios
	 * @instance
	 * @chainable
	 * @param {number} size - The global size base of the nodes.
	 * @return {Helios|this} - The Helios instance for chaining, or the current global size if no argument is provided.
	 * @example
	 * // Set the global size base of the nodes to 0.5.
	 * helios.nodesGlobalSizeBase(0.5);
	 * @example
	 * // Get the global size base of the nodes.
	 * let base = helios.nodesGlobalSizeBase();
	 */
	nodesGlobalSizeBase(size) {
		// check if color is defined
		if (typeof size === "undefined") {
			return this._nodesGlobalSizeBase;
		} else {
			this._nodesGlobalSizeBase = size;
			return this;
		}
	}

	/** Set/get node global outline width scale. The outline width of each node is calculated as: width = globalBase + globalScale * nodeOutlineWidth
	 * @method nodesGlobalOutlineWidthScale
	 * @memberof Helios
	 * @instance
	 * @chainable
	 * @param {number} width - The global outline width scale of the nodes.
	 * @return {Helios|this} - The Helios instance for chaining, or the current global outline width if no argument is provided.
	 * @example
	 * // Set the global outline width of the nodes to 0.5.
	 * helios.nodesGlobalOutlineWidthScale(0.5);
	 * @example
	 * // Get the global outline width of the nodes.
	 * let scale = helios.nodesGlobalOutlineWidthScale();
	 */
	nodesGlobalOutlineWidthScale(width) {
		// check if color is defined
		if (typeof width === "undefined") {
			return this._nodesGlobalOutlineWidthScale;
		} else {
			this._nodesGlobalOutlineWidthScale = width;
			return this;
		}
	}

	/** Set/get node global outline width base. The outline width of each node is calculated as: width = globalBase + globalScale * nodeOutlineWidth
	 * @method nodesGlobalOutlineWidthBase
	 * @memberof Helios
	 * @instance
	 * @chainable
	 * @param {number} width - The global outline width base of the nodes.
	 * @return {Helios|this} - The Helios instance for chaining, or the current global outline width if no argument is provided.
	 * @example
	 * // Set the global outline width base of the nodes to 0.5.
	 * helios.nodesGlobalOutlineWidthBase(0.5);
	 * @example
	 * // Get the global outline width base of the nodes.
	 * let base = helios.nodesGlobalOutlineWidthBase();
	 */
	nodesGlobalOutlineWidthBase(width) {
		// check if color is defined
		if (typeof width === "undefined") {
			return this._nodesGlobalOutlineWidthBase;
		} else {
			this._nodesGlobalOutlineWidthBase = width;
			return this;
		}
	}


	/** Set/get node global outline opacity scale. The outline opacity of each node is calculated as: opacity = globalBase + globalScale * nodeOutlineOpacity
	 * @method nodesGlobalOutlineOpacityScale
	 * @memberof Helios
	 * @instance
	 * @chainable
	 * @param {number} opacity - The global outline opacity scale of the nodes.
	 * @return {Helios|this} - The Helios instance for chaining, or the current global outline opacity if no argument is provided.
	 * @example
	 * // Set the global outline opacity of the nodes to 0.5.
	 * helios.nodesGlobalOutlineOpacityScale(0.5);
	 * @example
	 * // Get the global outline opacity of the nodes.
	 * let scale = helios.nodesGlobalOutlineOpacityScale();
	 */
	nodeOpacity(colorInput) {
		if (typeof colorInput === "undefined") {
			return this.network.colors.map(color => color[3]);
		} else if (typeof colorInput === "function") {
			let allNodes = this.network.index2Node;
			for (let nodeIndex = 0; nodeIndex < allNodes.length; nodeIndex++) {
				let node = allNodes[nodeIndex];
				let anOpacity = colorInput(node, nodeIndex, this.network);
				this.network.colors[nodeIndex * 4 + 3] = anOpacity;
			}
		} else {
			for (let nodeIndex = 0; nodeIndex < allNodes.length; nodeIndex++) {
				this.network.colors[nodeIndex * 4 + 3] = colorInput;
			}
		}

		return this;
	}


	/** Enables or disables updating the edge colors to match the node colors.
	 * @method edgesColorsFromNodes
	 * @memberof Helios
	 * @instance
	 * @chainable
	 * @param {boolean} edgesColorsFromNodes - Whether to update the edge colors to match the node colors.
	 * @return {Helios|this} - The Helios instance for chaining, or the current value if no argument is provided.
	 * @example
	 * // Enable updating the edge colors to match the node colors.
	 * helios.edgesColorsFromNodes(true);
	 */
	edgesColorsFromNodes(edgesColorsFromNodes) {
		// check if shaded is defined
		if (typeof edgesColorsFromNodes === "undefined") {
			return this._edgesColorsFromNodes;
		} else {
			this._edgesColorsFromNodes = edgesColorsFromNodes;
			return this;
		}
	}

	/** Enables or disables updating the edge widths to match the node widths.
	 * @method edgesWidthFromNodes
	 * @memberof Helios
	 * @instance
	 * @chainable
	 * @param {boolean} edgesWidthFromNodes - Whether to update the edge widths to match the node widths.
	 * @return {Helios|this} - The Helios instance for chaining, or the current value if no argument is provided.
	 * @example
	 * // Enable updating the edge widths to match the node widths.
	 * helios.edgesWidthFromNodes(true);
	 */
	edgesWidthFromNodes(edgesWidthFromNodes) {
		// check if shaded is defined
		if (typeof edgesWidthFromNodes === "undefined") {
			return this._edgesWidthFromNodes;
		} else {
			this._edgesWidthFromNodes = edgesWidthFromNodes;
			return this;
		}
	}

	//#endregion


	/** Enables or disables additive blending (Useful for dark backgrounds).
	 * @method additiveBlending
	 * @memberof Helios
	 * @instance
	 * @chainable
	 * @param {boolean} enableAdditiveBlending - Whether to enable additive blending.
	 * @return {Helios|this} - The Helios instance for chaining, or the current value if no argument is provided.
	 * @example
	 * // Enable additive blending.
	 * helios.additiveBlending(true);
	 * @example
	 * // Disable additive blending.
	 * helios.additiveBlending(false);
	 */
	additiveBlending(enableAdditiveBlending) {
		// check if color is defined
		if (typeof enableAdditiveBlending === "undefined") {
			return this.useAdditiveBlending;
		} else {
			this.useAdditiveBlending = enableAdditiveBlending;
			return this;
		}
	}

	/** Enables or disables shaded nodes.
	 * @method shadedNodes
	 * @memberof Helios
	 * @instance
	 * @chainable
	 * @param {boolean} enableShadedNodes - Whether to enable shaded nodes.
	 * @return {Helios|this} - The Helios instance for chaining, or the current value if no argument is provided.
	 * @example
	 * // Enable shaded nodes.
	 * helios.shadedNodes(true);
	 */
	shadedNodes(enableShadedNodes) {
		// check if shaded is defined
		if (typeof enableShadedNodes === "undefined") {
			return this.useShadedNodes;
		} else {
			this.useShadedNodes = enableShadedNodes;
			return this;
		}
	}

	/** Enables or disables edges that can be pickeable
	 * @method pickeableEdges
	 * @memberof Helios
	 * @instance
	 * @chainable
	 * @param {number[]|"all"} pickables - The indices of the edges that can be pickeable, or "all" to make all edges pickeable.
	 * @return {Helios|this} - The Helios instance for chaining, or the current value if no argument is provided.
	 * @example
	 * // Enable pickeable edges for [0,1,2,3]
	 * helios.pickeableEdges([0, 1, 2, 3]);
	 * @example
	 * // Enable pickeable edges for all edges
	 * helios.pickeableEdges("all");
	 */
	pickeableEdges(pickables) {
		// check if pickables is defined
		if (typeof pickables === "undefined") {
			return this._pickeableEdges;
		} else {
			this._pickeableEdges = new Set(pickables);
			if (pickables == "all") {
				// console.log("all");
				for (let i = 0; i < this.network.edges.length; i++) {
					this._pickeableEdges.add(i);
				}
				this._edgeIndicesUpdate = true;
				this.update();
			} else {
				// console.log(this._pickeableEdges);
				this._edgeIndicesUpdate = true;
				this.update();
			}
			return this;
		}
	}

	/** Get or set labels buffer size
	 * @method labelsMaxPixels
	 * @memberof Helios
	 * @instance
	 * @chainable
	 * @param {number} labelsMaxPixels - The maximum number of pixels for the labels buffer.
	 * @return {Helios|this} - The Helios instance for chaining, or the current value if no argument is provided.
	 * @example
	 * // Set the maximum number of pixels for the labels buffer to 10000.
	 * helios.labelsMaxPixels(10000);
	 */
	labelsMaxPixels(labelsMaxPixels) {
		// check if labelsMaxPixels is defined
		if (typeof labelsMaxPixels === "undefined") {
			return this._trackingMaxPixels;
		} else {
			this._trackingMaxPixels = labelsMaxPixels;
			_willResizeEvent(0);
			return this;
		}
	}

	/** Manually cleanup the Helios instance.
	 * @method cleanup
	 * @memberof Helios
	 * @instance
	 * @param {boolean} keepGLContext - Whether to keep the WebGL context alive.
	 * @example
	 * // Cleanup the Helios instance.
	 * helios.cleanup();
	 * @example
	 * // Cleanup the Helios instance and keep the WebGL context alive.
	 * helios.cleanup(true);
	 */
	cleanup(keepGLContext) {
		// console.log("Cleanup started");
		this._isReady = false;

		console.log("Cleanup",this.layoutWorker)
		this.layoutWorker?.cleanup();
		this.scheduler?.stop();
		console.log("Null",this.layoutWorker)
		this.layoutWorker = null;
		const gl = this.gl;
		this.onReadyCallback = null;

		this.onNodeClickCallback = null;
		this.onNodeDoubleClickCallback = null;
		this.onNodeHoverStartCallback = null;
		this.onNodeHoverMoveCallback = null;
		this.onNodeHoverEndCallback = null;

		this.onEdgeClickCallback = null;
		this.onEdgeDoubleClickCallback = null;
		this.onEdgeHoverStartCallback = null;
		this.onEdgeHoverMoveCallback = null;
		this.onEdgeHoverEndCallback = null;


		this.onZoomCallback = null;
		this.onRotationCallback = null;
		this.onResizeCallback = null;
		this.onLayoutStartCallback = null;
		this.onLayoutStopCallback = null;
		this.onDrawCallback = null;
		this.onReadyCallback = null;
		this._isReady = false;

		// window.removeEventListener('resize', this._onresizeEvent);
		if (this._resizeObserver) {
			console.log("disconnecting resize observer");
			this._resizeObserver.disconnect();
			this._resizeObserver = null;
			delete this._resizeObserver;
		}

		if (this.canvasElement) {
			this.canvasElement.removeEventListener("click", this._clickEventListener);
			this.canvasElement.removeEventListener("dblclick", this._doubleClickEventListener);

			this.canvasElement.removeEventListener("mousemove", this._hoverMoveEventListener);
			this.canvasElement.removeEventListener("mouseleave", this._hoverLeaveEventListener);
			document.body.removeEventListener("mouseout", this._hoverLeaveWindowEventListener);
		}

		if (!keepGLContext && gl) {
			let numTextureUnits = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
			this.pickingFramebuffer?.discard();
			this._trackingFramebuffer?.discard();
			for (let unit = 0; unit < numTextureUnits; ++unit) {
				gl.activeTexture(gl.TEXTURE0 + unit);
				gl.bindTexture(gl.TEXTURE_2D, null);
				gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
			}

			gl.bindBuffer(gl.ARRAY_BUFFER, null);
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
			gl.bindRenderbuffer(gl.RENDERBUFFER, null);
			gl.bindFramebuffer(gl.FRAMEBUFFER, null);

			gl.deleteBuffer(this.nodesPositionBuffer);
			gl.deleteBuffer(this.nodesColorBuffer);
			gl.deleteBuffer(this.nodesSizeBuffer);
			gl.deleteBuffer(this.nodesSizeBuffer);
			gl.deleteBuffer(this.nodesOutlineWidthBuffer);
			gl.deleteBuffer(this.nodesOutlineColorBuffer);
			gl.deleteBuffer(this.nodesIndexBuffer);

			if (this.edgesGeometry) {
				gl.deleteBuffer(this.edgesGeometry.edgeVertexTypeBuffer);
				gl.deleteBuffer(this.edgesGeometry.verticesBuffer);
				gl.deleteBuffer(this.edgesGeometry.colorBuffer);
				gl.deleteBuffer(this.edgesGeometry.sizeBuffer);
			}

			if (this.fastEdgesGeometry) {
				gl.deleteBuffer(this.fastEdgesGeometry.indexBuffer);
				gl.deleteBuffer(this.fastEdgesGeometry.vertexObject);
				gl.deleteBuffer(this.fastEdgesGeometry.colorObject);
				gl.deleteBuffer(this.fastEdgesGeometry.indexObject);
			}
		}

		if (this.densityMap) {
			this.densityMap.cleanup();
		}

		if (this._autoCleanup) {
			this._mutationObserver.disconnect();
			this._mutationObserver = null;
		}
		if (this.canvasElement) {
			this.canvasElement.remove();
			this.canvasElement = null;
		}
		// Remove this.svgLayer and this.overlay 
		if (this.svgLayer) {
			this.svgLayer.remove();
			this.svgLayer = null;
		}
		if (this.overlay) {
			this.overlay.remove();
			this.overlay = null;
		}

		this.onCleanupCallback?.();

		this._hasCleanup = true;
	}


	/**
	 * Returns whether the Helios instance is ready to be used.
	 * @method isReady
	 * @memberof Helios
	 * @instance
	 * @returns {boolean} - Whether the Helios instance is ready to be used.
	 * @example
	 * // Check if Helios is ready to be used.
	 * if (helios.isReady()) {
	 *   // Helios is ready, do something.
	 * } else {
	 *   // Helios is not ready yet, wait or handle the error.
	 * }
	 */
	isReady() {
		return this._isReady;
	}

	/** Destroys the Helios instance.
	 * @method destroy
	 * @memberof Helios
	 * @instance
	 */
	destroy() {
		if (!this._hasCleanup) {
			this.cleanup();
		}
	}

}

// Helios.xnet = xnet;
