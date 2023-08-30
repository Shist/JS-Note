// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"2UeK4":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "0a8ecb283d214d75";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"bB7Pu":[function(require,module,exports) {
var _store = require("./assets/scripts/store");
var _model = require("./assets/scripts/model");
"use strict";
// Controller
document.addEventListener("DOMContentLoaded", ()=>{
    // Container with notes
    const notesContainer = document.querySelector(".notes-container");
    // Element for showing errors
    const errorMessage = document.querySelector(".global-container__error-msg");
    errorMessage.setAttribute("style", "white-space: pre-wrap;");
    // Elements for creating
    const createInputTitle = document.querySelector("#create-title");
    const createInputDescription = document.querySelector("#create-description");
    const createSelectNoteState = document.querySelector("#create-state");
    const createInputDeadline = document.querySelector("#create-deadline");
    createInputDeadline.value = new Date().toISOString().split("T")[0];
    const createBtn = document.querySelector(".global-container__create-btn");
    // Elements for searching
    const searchInputTitle = document.querySelector("#search-title");
    const searchInputDescription = document.querySelector("#search-description");
    const searchSelectNoteState = document.querySelector("#search-state");
    const searchBtn = document.querySelector(".global-container__refresh-btn");
    // Elements for sorting
    const selectSortOption = document.querySelector("#select-sort-option");
    // Elements for editing
    const formContainer = document.querySelector(".edit-form-wrapper");
    const closeBtn = document.querySelector(".edit-form__close-btn");
    const editErrorMessage = document.querySelector(".edit-form__error-msg");
    const editInputTitle = document.querySelector("#edit-title");
    const editInputDescription = document.querySelector("#edit-description");
    const editSelectNoteState = document.querySelector("#edit-state");
    const editInputDeadline = document.querySelector("#edit-deadline");
    const confirmBtn = document.querySelector(".edit-form__confirm-btn");
    // Event while clicling on create button
    createBtn.addEventListener("click", ()=>{
        const isTitleWrong = (0, _model.isTitleDataWrong)(createInputTitle.value);
        const isDescriptionWrong = (0, _model.isDescriptionDataWrong)(createInputDescription.value);
        if (isTitleWrong) {
            (0, _model.showErrorMessage)(errorMessage, `Error while creating Title:\n${isTitleWrong}`);
            return;
        }
        if (isDescriptionWrong) {
            (0, _model.showErrorMessage)(errorMessage, `Error while creating Description:\n${isDescriptionWrong}`);
            return;
        }
        (0, _model.hideErrorMessage)(errorMessage);
        (0, _model.addNote)(createInputTitle, createInputDescription, createSelectNoteState, createInputDeadline);
        (0, _model.updateNotesList)((0, _store.notesArr), searchSelectNoteState, searchInputTitle, searchInputDescription, notesContainer, selectSortOption);
    });
    // Event while clicling on search button
    searchBtn.addEventListener("click", ()=>{
        (0, _model.updateNotesList)((0, _store.notesArr), searchSelectNoteState, searchInputTitle, searchInputDescription, notesContainer, selectSortOption);
    });
    // Event while clicking on something inside notes container
    notesContainer.addEventListener("click", (event)=>{
        if (event.target.classList.contains("note-card__delete-btn")) {
            (0, _model.deleteNoteByUniqueId)(event.target.id);
            (0, _model.updateNotesList)((0, _store.notesArr), searchSelectNoteState, searchInputTitle, searchInputDescription, notesContainer, selectSortOption);
        }
        if (event.target.classList.contains("note-card__edit-btn")) (0, _model.prepareEditingModalWindow)(event.target.id, editInputTitle, editInputDescription, editSelectNoteState, editInputDeadline, confirmBtn, formContainer);
    });
    // Event while clicking on button with cross at the top-right corner of editing form
    closeBtn.addEventListener("click", (event)=>{
        event.preventDefault();
        (0, _model.hideEditingModalWindow)(formContainer, editErrorMessage);
    });
    // Event while clicking on confirm button in order to sumbit changes in editing form
    confirmBtn.addEventListener("click", (event)=>{
        event.preventDefault();
        const isTitleWrong = (0, _model.isTitleDataWrong)(editInputTitle.value);
        const isDescriptionWrong = (0, _model.isDescriptionDataWrong)(editInputDescription.value);
        if (isTitleWrong) {
            (0, _model.showEditErrorMessage)(editErrorMessage, `Error while editing Title:\n${isTitleWrong}`);
            return;
        }
        if (isDescriptionWrong) {
            (0, _model.showEditErrorMessage)(editErrorMessage, `Error while editing Description:\n${isDescriptionWrong}`);
            return;
        }
        (0, _model.editNoteByUniqueId)(event.target.id, editInputTitle, editInputDescription, editSelectNoteState, editInputDeadline);
        (0, _model.updateNotesList)((0, _store.notesArr), searchSelectNoteState, searchInputTitle, searchInputDescription, notesContainer, selectSortOption);
        (0, _model.hideEditingModalWindow)(formContainer, editErrorMessage);
    });
    // Event while clicking on dark space around edit form
    formContainer.addEventListener("click", (event)=>{
        if (event.target === formContainer) (0, _model.hideEditingModalWindow)(formContainer, editErrorMessage);
    });
    document.addEventListener("keydown", (event)=>{
        if (event.code === "Escape" && formContainer.classList.contains("appeared-flex")) (0, _model.hideEditingModalWindow)(formContainer, editErrorMessage);
    });
    // Loading local data (if exsist) from the start
    (0, _store.loadLocalData)();
    // Updating list of notes
    (0, _model.updateNotesList)((0, _store.notesArr), searchSelectNoteState, searchInputTitle, searchInputDescription, notesContainer, selectSortOption);
});

},{"./assets/scripts/store":"aJCtw","./assets/scripts/model":"6CZer"}],"aJCtw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "notesArr", ()=>notesArr);
parcelHelpers.export(exports, "notesUniqueIds", ()=>notesUniqueIds);
parcelHelpers.export(exports, "currUniqueId", ()=>currUniqueId);
// incrementCurrUniqueId() => {...} - Increments current unique identifier as other *.js files can not do that
parcelHelpers.export(exports, "incrementCurrUniqueId", ()=>incrementCurrUniqueId);
// loadLocalData() => {...} - Load local data from browser memory and refresh notes list after that
parcelHelpers.export(exports, "loadLocalData", ()=>loadLocalData);
// removeNoteItem(uniqueId) => {...} - Removes note item from localStorage by given uniqueId
parcelHelpers.export(exports, "removeNoteItem", ()=>removeNoteItem);
// setNoteItem(uniqueId, noteItem) => {...} - Adds (or Changes) given noteItem with given uniqueId to (or in) localStorage
parcelHelpers.export(exports, "setNoteItem", ()=>setNoteItem);
// updateUniqueIdsArray() => {...} - Updates the set of unique identifiers in localStorage
parcelHelpers.export(exports, "updateUniqueIdsArray", ()=>updateUniqueIdsArray);
"use strict";
let notesArr = [];
let notesUniqueIds = new Set();
let currUniqueId = 0;
function incrementCurrUniqueId() {
    currUniqueId++;
    localStorage.setItem("currUniqueId", currUniqueId.toString());
}
function loadLocalData() {
    const currUniqueIdFromLocal = localStorage.getItem("currUniqueId");
    if (currUniqueIdFromLocal) currUniqueId = +currUniqueIdFromLocal;
    const notesUniqueIdsArrayFromLocal = JSON.parse(localStorage.getItem("uniqueIdsArray"));
    if (notesUniqueIdsArrayFromLocal && notesUniqueIdsArrayFromLocal.length) {
        notesUniqueIds = new Set(notesUniqueIdsArrayFromLocal);
        notesUniqueIds.forEach((uniqueId)=>{
            const noteDataFromLocal = JSON.parse(localStorage.getItem(uniqueId.toString()));
            if (noteDataFromLocal) notesArr.push(noteDataFromLocal);
        });
    }
}
function removeNoteItem(uniqueId) {
    localStorage.removeItem(uniqueId.toString());
    updateUniqueIdsArray();
}
function setNoteItem(uniqueId, noteItem) {
    localStorage.setItem(uniqueId.toString(), JSON.stringify(noteItem));
    updateUniqueIdsArray();
}
function updateUniqueIdsArray() {
    localStorage.setItem("uniqueIdsArray", JSON.stringify([
        ...notesUniqueIds
    ]));
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"6CZer":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Model
// addNote(titleInput, descriptionInput, stateSelect, deadlineInput) => {...} - Adds data to array
parcelHelpers.export(exports, "addNote", ()=>addNote);
// cleanCreateInputs(titleInput, descriptionInput, stateSelect, deadlineInput) => {...} - Cleans input values of create-inputs
parcelHelpers.export(exports, "cleanCreateInputs", ()=>cleanCreateInputs);
// updateNotesList(arr, searchState, searchTitle, searchDescription, notesContainer, sortOption) => {...} - loops through the array "arr" and renders the elements on the page
parcelHelpers.export(exports, "updateNotesList", ()=>updateNotesList);
// deleteNoteByUniqueId(uniqueId) => {...} - Deletes note with specific id "uniqueId" from the array and from the set
parcelHelpers.export(exports, "deleteNoteByUniqueId", ()=>deleteNoteByUniqueId);
// deleteNoteByUniqueId(uniqueId, titleInput, descriptionInput, stateSelect, deadlineInput) => {...} - Edits note with specific id "uniqueId" in the array
parcelHelpers.export(exports, "editNoteByUniqueId", ()=>editNoteByUniqueId);
// generateUniqueId(set) => {...} - Generates unique identifier that is not yet in the set "set"
parcelHelpers.export(exports, "generateUniqueId", ()=>generateUniqueId);
// getNoteIndexByUniqueId(arr, neededId) => {...} - Finds and returns index in the array "arr" of the object with specific uniqie id "neededId"
parcelHelpers.export(exports, "getNoteIndexByUniqueId", ()=>getNoteIndexByUniqueId);
// hideEditErrorMessage(editMsgLabel) => {...} - Hides error message on edit modal window
parcelHelpers.export(exports, "hideEditErrorMessage", ()=>hideEditErrorMessage);
// hideEditingModalWindow(formContainer, editMsgLabel) => {...} - Hides modal window for editing notes data
parcelHelpers.export(exports, "hideEditingModalWindow", ()=>hideEditingModalWindow);
// hideErrorMessage(msgLabel) => {...} - Hides error message on main page
parcelHelpers.export(exports, "hideErrorMessage", ()=>hideErrorMessage);
// isDescriptionDataWrong(str) => {...} - Checks if user's description invalid. If yes, returns error message. If no, returns false.
parcelHelpers.export(exports, "isDescriptionDataWrong", ()=>isDescriptionDataWrong);
// isTitleDataWrong(str) => {...} - Checks if user's title invalid. If yes, returns error message. If no, returns false.
parcelHelpers.export(exports, "isTitleDataWrong", ()=>isTitleDataWrong);
// prepareEditingModalWindow(uniqueId, titleInput, descriptionInput, stateSelect, deadlineInput, confirmBtn, formContainer) => {...} - prepares modal window for editing data of note with specific id "uniqueId"
parcelHelpers.export(exports, "prepareEditingModalWindow", ()=>prepareEditingModalWindow);
// reformatDate(date => {...} - Reformates date from YYYY-MM-DD to DD.MM.YYYY
parcelHelpers.export(exports, "reformatDate", ()=>reformatDate);
// renderNoteCard(note, notesContainer) => {...} - Adds to the page given information about note "note"
parcelHelpers.export(exports, "renderNoteCard", ()=>renderNoteCard);
// showEditErrorMessage(editMsgLabel, editMsgValue) => {...} - Shows error message on edit modal window
parcelHelpers.export(exports, "showEditErrorMessage", ()=>showEditErrorMessage);
// showEditingModalWindow(formContainer) => {...} - Shows modal window for editing notes data
parcelHelpers.export(exports, "showEditingModalWindow", ()=>showEditingModalWindow);
// showErrorMessage(msgLabel, msgValue) => {...} - Shows error message on main page
parcelHelpers.export(exports, "showErrorMessage", ()=>showErrorMessage);
// sortNotesArr(notesArr, sortOption) => {...} - Sorts array "notesArr" by option "sortOption"
parcelHelpers.export(exports, "sortNotesArr", ()=>sortNotesArr);
var _store = require("./store");
"use strict";
function addNote(titleInput, descriptionInput, stateSelect, deadlineInput) {
    const newNote = {
        uniqueId: generateUniqueId((0, _store.notesUniqueIds)),
        title: titleInput.value,
        description: descriptionInput.value,
        state: stateSelect.value,
        deadline: deadlineInput.value
    };
    (0, _store.notesArr).push(newNote);
    (0, _store.setNoteItem)(newNote.uniqueId, newNote);
    cleanCreateInputs(titleInput, descriptionInput, stateSelect, deadlineInput);
}
function cleanCreateInputs(titleInput, descriptionInput, stateSelect, deadlineInput) {
    titleInput.value = "";
    descriptionInput.value = "";
    stateSelect.value = "In progress";
    deadlineInput.value = new Date().toISOString().split("T")[0];
}
function updateNotesList(arr, searchState, searchTitle, searchDescription, notesContainer, sortOption) {
    const filteredArr = arr.filter((note)=>{
        if (searchState.value === "All" || note.state === searchState.value) return note.title.includes(searchTitle.value) && note.description.includes(searchDescription.value);
        else return false;
    });
    notesContainer.innerHTML = "";
    sortNotesArr(filteredArr, sortOption.value);
    if (filteredArr.length > 0) filteredArr.forEach((note)=>{
        renderNoteCard(note, notesContainer);
    });
    else notesContainer.innerHTML = `<h3 class="notes-container__no-notes-text">No notes were found matching the given parameters...</h3>`;
}
function deleteNoteByUniqueId(uniqueId) {
    const noteIndexInArray = getNoteIndexByUniqueId((0, _store.notesArr), uniqueId);
    (0, _store.notesArr).splice(noteIndexInArray, 1);
    (0, _store.notesUniqueIds).delete(+uniqueId);
    (0, _store.removeNoteItem)(uniqueId);
}
function editNoteByUniqueId(uniqueId, titleInput, descriptionInput, stateSelect, deadlineInput) {
    const noteIndexInArray = getNoteIndexByUniqueId((0, _store.notesArr), uniqueId);
    const targetNote = (0, _store.notesArr)[noteIndexInArray];
    targetNote.title = titleInput.value;
    targetNote.description = descriptionInput.value;
    targetNote.state = stateSelect.value;
    targetNote.deadline = deadlineInput.value;
    (0, _store.setNoteItem)(uniqueId, targetNote);
}
function generateUniqueId(set) {
    (0, _store.incrementCurrUniqueId)();
    if ((0, _store.currUniqueId) < Number.MAX_SAFE_INTEGER) {
        set.add((0, _store.currUniqueId));
        return 0, _store.currUniqueId;
    }
    return "Critical error! There are no any unique identifiers left!";
}
function getNoteIndexByUniqueId(arr, neededId) {
    for(let indexInArray in arr){
        if (arr[indexInArray].uniqueId == neededId) return indexInArray;
    }
    return "Critical error! There are no elements with given specific unique identifier";
}
function hideEditErrorMessage(editMsgLabel) {
    editMsgLabel.classList.remove("appeared-block");
    editMsgLabel.classList.add("hidden-element");
}
function hideEditingModalWindow(formContainer, editMsgLabel) {
    hideEditErrorMessage(editMsgLabel);
    formContainer.classList.remove("appeared-flex");
    formContainer.classList.add("hidden-element");
}
function hideErrorMessage(msgLabel) {
    msgLabel.classList.remove("appeared-block");
    msgLabel.classList.add("hidden-element");
}
function isDescriptionDataWrong(str) {
    if (str.length > 128) return "You can not enter the description with more than 128 symbols";
    if (str.split(/\r\n|\r|\n/).length > 7) return "You can not enter the description with more than 7 lines";
    return false;
}
function isTitleDataWrong(str) {
    if (!str.trim()) return "You can not enter an empty title!";
    if (str.length > 32) return "You can not enter the title with length more than 32 symbols";
    return false;
}
function prepareEditingModalWindow(uniqueId, titleInput, descriptionInput, stateSelect, deadlineInput, confirmBtn, formContainer) {
    const noteIndexInArray = getNoteIndexByUniqueId((0, _store.notesArr), uniqueId);
    titleInput.value = (0, _store.notesArr)[noteIndexInArray].title;
    descriptionInput.value = (0, _store.notesArr)[noteIndexInArray].description;
    stateSelect.value = (0, _store.notesArr)[noteIndexInArray].state;
    deadlineInput.value = (0, _store.notesArr)[noteIndexInArray].deadline;
    confirmBtn.id = uniqueId;
    showEditingModalWindow(formContainer);
}
function reformatDate(date) {
    return date.split("-").reverse().join(".");
}
function renderNoteCard(note, notesContainer) {
    notesContainer.insertAdjacentHTML("beforeend", `<div class="note-card">
        <h3 class="note-card__title">${note.title}</h3>
        <h4 class="note-card__description-headline">Description:</h4>
        <p class="note-card__description_last note-card__description">${note.description ? note.description : "Description is empty..."}</p>
        <h4 class="note-card__state_last note-card__state">State: ${note.state}</h4>
        <h4 class="note-card__deadline_last note-card__deadline">Deadline: ${reformatDate(note.deadline)}</h4>
        <div class="note-card__buttons-wrapper">
          <button class="note-card__edit-btn" id="${note.uniqueId}">Edit note</button>
          <button class="note-card__delete-btn" id="${note.uniqueId}">Delete note</button>
        </div>
      </div>`);
}
function showEditErrorMessage(editMsgLabel, editMsgValue) {
    editMsgLabel.textContent = editMsgValue;
    editMsgLabel.classList.remove("hidden-element");
    editMsgLabel.classList.add("appeared-block");
}
function showEditingModalWindow(formContainer) {
    formContainer.classList.remove("hidden-element");
    formContainer.classList.add("appeared-flex");
}
function showErrorMessage(msgLabel, msgValue) {
    msgLabel.textContent = msgValue;
    msgLabel.classList.remove("hidden-element");
    msgLabel.classList.add("appeared-block");
}
function sortNotesArr(notesArr, sortOption) {
    switch(sortOption){
        case "Deadline":
            notesArr.sort((first, second)=>{
                return new Date(first.deadline) - new Date(second.deadline);
            });
            return notesArr;
        case "State":
            notesArr.sort((first, second)=>{
                return first.state > second.state ? 1 : second.state > first.state ? -1 : 0;
            });
            return notesArr;
        case "Title":
            notesArr.sort((first, second)=>{
                return first.title > second.title ? 1 : second.title > first.title ? -1 : 0;
            });
            return notesArr;
        case "Description":
            notesArr.sort((first, second)=>{
                return first.description > second.description ? 1 : second.description > first.description ? -1 : 0;
            });
            return notesArr;
    }
}

},{"./store":"aJCtw","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["2UeK4","bB7Pu"], "bB7Pu", "parcelRequire419e")

//# sourceMappingURL=index.3d214d75.js.map
