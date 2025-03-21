/**
 * @fileoverview Modulo principale per la creazione e manipolazione di elementi DOM con un'API dichiarativa.
 * @module just-dom
 */
import {
    createDOMElement,
    classNames,
    fetcher,
    createRef,
    Outlet,
    htmlTagNames,
    fragment,
    getElement,
    getAllElements,
    createElFromHTMLString,
    createRoot,
} from "./modules/index.js";

/**
 * Definizione dei gestori eventi nativi che possono essere assegnati agli elementi.
 *
 * @typedef {Object} NativeEventHandlers
 * @property {function(Event): void} [onClick] - Gestore dell'evento click
 * @property {function(Event): void} [onMouseover] - Gestore dell'evento mouseover
 * @property {function(Event): void} [onMouseout] - Gestore dell'evento mouseout
 * @property {function(InputEvent): void} [onInput] - Gestore dell'evento input
 * @property {function(Event): void} [onChange] - Gestore dell'evento change
 * @property {function(KeyboardEvent): void} [onKeydown] - Gestore dell'evento keydown
 * @property {function(KeyboardEvent): void} [onKeyup] - Gestore dell'evento keyup
 * @property {function(Event): void} [onSubmit] - Gestore dell'evento submit
 * @property {function(Event): void} [onFocus] - Gestore dell'evento focus
 * @property {function(Event): void} [onBlur] - Gestore dell'evento blur
 * @property {function(Event): void} [onLoad] - Gestore dell'evento load
 * @property {function(Event): void} [onError] - Gestore dell'evento error
 * @property {function(DragEvent): void} [onDragstart] - Gestore dell'evento dragstart
 * @property {function(DragEvent): void} [onDragend] - Gestore dell'evento dragend
 * @property {function(DragEvent): void} [onDragover] - Gestore dell'evento dragover
 * @property {function(DragEvent): void} [onDrop] - Gestore dell'evento drop
 */

/**
 * Definizione degli attributi che possono essere assegnati agli elementi DOM.
 * Utilizza un template generico per garantire il corretto tipo di ritorno in base al tag.
 *
 * @template {keyof HTMLElementTagNameMap} K
 * @typedef {Object} DOMAttributes
 * @property {string} [id] - ID dell'elemento
 * @property {string} [ref] - Riferimento all'elemento
 * @property {string|string[]} [className] - Classi CSS dell'elemento (stringa o array di stringhe)
 * @property {string|Object.<string, string>} [style] - Stile inline dell'elemento (stringa CSS o oggetto di stili)
 * @property {string} [title] - Titolo dell'elemento (tooltip)
 * @property {boolean} [hidden] - Se l'elemento è nascosto
 * @property {number} [tabIndex] - Indice di tabulazione
 * @property {string} [lang] - Lingua del contenuto dell'elemento
 * @property {string} [dir] - Direzione del testo (ltr, rtl)
 * @property {string} [accessKey] - Tasto di scelta rapida
 * @property {boolean} [draggable] - Se l'elemento è trascinabile
 * @property {boolean} [spellcheck] - Se abilitare il controllo ortografico
 * @property {boolean} [contentEditable] - Se l'elemento è modificabile
 * @property {string} [role] - Ruolo ARIA dell'elemento
 * @property {string} [ariaLabel] - Etichetta ARIA per l'accessibilità
 * @property {string} [ariaDescribedby] - Riferimento a elemento che descrive questo elemento
 * @property {Object.<string, string>} [data] - Attributi data-* personalizzati
 * @property {NativeEventHandlers} - Event handlers nativi
 */

/**
 * Definizione dell'interfaccia del modulo DOM, che include tutte le funzioni
 * per creare e manipolare elementi DOM.
 *
 * @typedef {Object} DOMModule
 * @property {function(string): DocumentFragment} createElFromHTMLString - Crea elementi DOM da una stringa HTML
 * @property {function(string): HTMLElement} getElement - Restituisce un elemento del DOM tramite selettore CSS
 * @property {function(Array<Node|string>): DocumentFragment} fragment - Crea un DocumentFragment dai nodi figli forniti
 * @property {function(string, HTMLElement): void} createRoot - Aggiunge un elemento alla radice del DOM
 * @property {function(): {current: HTMLElement | null}} createRef - Crea un riferimento a un elemento
 * @property {function(...(string|boolean|null|undefined)): string} classNames - Utility per combinare classi CSS condizionalmente
 * @property {function(string, Object): Promise<any>} fetcher - Utility per effettuare richieste HTTP
 * @property {function(Object): HTMLElement} Outlet - Componente per il rendering condizionale
 */

/**
 * Modulo per la manipolazione del DOM che offre funzioni di utilità per creare e gestire elementi HTML
 * con un'API dichiarativa simile a React, ma senza virtual DOM.
 *
 * @type {DOMModule}
 *
 * @example
 * // Creare un div con una classe e del testo
 * const myDiv = DOM.div({className: "container"}, "Contenuto del div");
 *
 * @example
 * // Creare una lista non ordinata con elementi
 * const myList = DOM.ul({className: "my-list"}, [
 *   DOM.li(null, "Primo elemento"),
 *   DOM.li(null, "Secondo elemento")
 * ]);
 *
 * @example
 * // Utilizzo degli event handler
 * const button = DOM.button(
 *   {
 *     className: "btn primary",
 *     onClick: (e) => console.log('Cliccato!', e)
 *   },
 *   "Clicca qui"
 * );
 *
 * @example
 * // Utilizzo di classNames per classi condizionali
 * const card = DOM.div({
 *   className: DOM.classNames(
 *     'card',
 *     isActive && 'active',
 *     { 'highlight': isHighlighted, 'hidden': isHidden }
 *   )
 * }, [
 *   DOM.h2(null, "Titolo card"),
 *   DOM.p(null, "Contenuto card")
 * ]);
 */
const DOM = {
    createElFromHTMLString,
    getElement,
    getAllElements,
    fragment,
    createRoot,
    createRef,
    classNames,
    fetcher,
    Outlet,
};

/**
 * Cache delle funzioni di creazione degli elementi per evitare di ricrearle ad ogni chiamata.
 * @type {Object.<string, function(DOMAttributes, ...(Node|string|Array<Node|string>)): HTMLElement>}
 * @private
 */
const domFunctionCache = {};

// Popola a preventivo la cache per ogni tag HTML
/**
 * Crea funzioni per ogni tag HTML e le memorizza nella cache.
 * Le funzioni create seguono questa signature generale:
 *
 * @callback CreateElementFunction
 * @param {DOMAttributes|null} [props=null] - Proprietà e attributi da assegnare all'elemento (può essere null)
 * @param {...(Node|string|Array<Node|string>)} [children] - Nodi figli da appendere all'elemento
 * @returns {HTMLElement} - Elemento DOM creato con le proprietà e i figli specificati
 */
for (const tagName of htmlTagNames) {
    domFunctionCache[tagName] = (props, children) => createDOMElement(tagName, props, children);
    DOM[tagName] = domFunctionCache[tagName];
}

// Esporta sia l'oggetto DOM come default che le singole funzioni
export default DOM;

// Esporta le funzioni utili singolarmente per consentire l'import destrutturato
export {
    createDOMElement,
    classNames,
    fetcher,
    getElement,
    getAllElements,
    createElFromHTMLString,
    fragment,
    createRoot,
    createRef,
    Outlet,
};
