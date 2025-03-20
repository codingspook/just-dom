import { createDOMElement, classNames, fetcher, Outlet } from "./utilities.js";

const htmlTagNames = [
    "a",
    "abbr",
    "address",
    "area",
    "article",
    "aside",
    "audio",
    "b",
    "base",
    "bdi",
    "bdo",
    "blockquote",
    "body",
    "br",
    "button",
    "canvas",
    "caption",
    "cite",
    "code",
    "col",
    "colgroup",
    "data",
    "datalist",
    "dd",
    "del",
    "details",
    "dfn",
    "dialog",
    "div",
    "dl",
    "dt",
    "em",
    "embed",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hgroup",
    "hr",
    "html",
    "i",
    "iframe",
    "img",
    "input",
    "ins",
    "kbd",
    "label",
    "legend",
    "li",
    "link",
    "main",
    "map",
    "mark",
    "menu",
    "meta",
    "meter",
    "nav",
    "noscript",
    "object",
    "ol",
    "optgroup",
    "option",
    "output",
    "p",
    "picture",
    "pre",
    "progress",
    "q",
    "rp",
    "rt",
    "ruby",
    "s",
    "samp",
    "script",
    "search",
    "section",
    "select",
    "slot",
    "small",
    "source",
    "span",
    "strong",
    "style",
    "sub",
    "summary",
    "sup",
    "table",
    "tbody",
    "td",
    "template",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "title",
    "tr",
    "track",
    "u",
    "ul",
    "var",
    "video",
    "wbr",
];

/**
 * Funzione di utilità per creare elementi HTML
 * @param {Array<HTMLElement>} children - Array di nodi figli
 */
const fragment = function (children) {
    const fragment = document.createDocumentFragment();
    for (const child of children) {
        if (child && typeof child === "object") {
            fragment.appendChild(child);
        }
        if (typeof child === "string") {
            fragment.appendChild(document.createTextNode(child));
        }
    }
    return fragment;
};

/**
 * Restituisce un elemento del DOM
 * @param {string} selector - Selettore CSS
 * @return {HTMLElement} Elemento HTML
 */
const getElement = (selector) => document.querySelector(selector);

/**
 * Crea elementi DOM da una stringa HTML
 * @param {string} HTMLString - Stringa HTML valida
 * @return {DocumentFragment} Fragment contenente gli elementi parsati
 */
const createElFromHTMLString = (HTMLString) => {
    const fragment = document.createDocumentFragment();
    let parser = new DOMParser();
    const newNode = parser.parseFromString(HTMLString, "text/html");
    const els = newNode.body.childNodes;
    els.forEach((el) => fragment.appendChild(el));
    return fragment;
};

/**
 * Aggiunge un elemento alla radice del DOM
 * @param {string} rootId - ID dell'elemento radice
 * @param {HTMLElement} rootEl - Elemento radice
 */
const createRoot = (rootId, rootEl) => {
    document.getElementById(rootId).appendChild(rootEl);
};

/**
 * @typedef {Object.<string, Function>} NativeEventHandlers
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
 */

/**
 * @template {keyof HTMLElementTagNameMap} K
 * @typedef {Object} DOMAttributes
 * @property {string} [id] - ID dell'elemento
 * @property {string} [className] - Classi CSS dell'elemento
 * @property {string} [style] - Stile inline dell'elemento
 * @property {string} [title] - Titolo dell'elemento (tooltip)
 * @property {boolean} [hidden] - Se l'elemento è nascosto
 * @property {string} [tabIndex] - Indice di tabulazione
 * @property {string} [lang] - Lingua del contenuto dell'elemento
 * @property {string} [dir] - Direzione del testo (ltr, rtl)
 * @property {string} [accessKey] - Tasto di scelta rapida
 * @property {boolean} [draggable] - Se l'elemento è trascinabile
 * @property {boolean} [spellcheck] - Se abilitare il controllo ortografico
 * @property {boolean} [contentEditable] - Se l'elemento è modificabile
 * @property {NativeEventHandlers<HTMLElementTagNameMap[K]>} - Event handlers nativi
 */

/**
 * @typedef {Object} DOMModule
 * @property {function(string): DocumentFragment} createElFromHTMLString - Crea elementi DOM da una stringa HTML
 * @property {function(string): HTMLElement} getElement - Restituisce un elemento del DOM tramite selettore CSS
 * @property {function(Array<HTMLElement>): DocumentFragment} fragment - Crea un DocumentFragment dai nodi figli forniti
 * @property {function(string, HTMLElement): void} createRoot - Aggiunge un elemento alla radice del DOM
 *
 * @property {function(DOMAttributes<'a'>, *): HTMLAnchorElement} a - Crea un elemento <a> (link)
 * @property {function(DOMAttributes<'abbr'>, *): HTMLElement} abbr - Crea un elemento <abbr> (abbreviazione)
 * @property {function(DOMAttributes<'address'>, *): HTMLElement} address - Crea un elemento <address>
 * @property {function(DOMAttributes<'area'>, *): HTMLAreaElement} area - Crea un elemento <area>
 * @property {function(DOMAttributes<'article'>, *): HTMLElement} article - Crea un elemento <article>
 * @property {function(DOMAttributes<'aside'>, *): HTMLElement} aside - Crea un elemento <aside>
 * @property {function(DOMAttributes<'audio'>, *): HTMLAudioElement} audio - Crea un elemento <audio>
 * @property {function(DOMAttributes<'b'>, *): HTMLElement} b - Crea un elemento <b> (bold)
 * @property {function(DOMAttributes<'base'>, *): HTMLBaseElement} base - Crea un elemento <base>
 * @property {function(DOMAttributes<'bdi'>, *): HTMLElement} bdi - Crea un elemento <bdi>
 * @property {function(DOMAttributes<'bdo'>, *): HTMLElement} bdo - Crea un elemento <bdo>
 * @property {function(DOMAttributes<'blockquote'>, *): HTMLQuoteElement} blockquote - Crea un elemento <blockquote>
 * @property {function(DOMAttributes<'body'>, *): HTMLBodyElement} body - Crea un elemento <body>
 * @property {function(DOMAttributes<'br'>, *): HTMLBRElement} br - Crea un elemento <br> (line break)
 * @property {function(DOMAttributes<'button'>, *): HTMLButtonElement} button - Crea un elemento <button>
 * @property {function(DOMAttributes<'canvas'>, *): HTMLCanvasElement} canvas - Crea un elemento <canvas>
 * @property {function(DOMAttributes<'caption'>, *): HTMLTableCaptionElement} caption - Crea un elemento <caption>
 * @property {function(DOMAttributes<'cite'>, *): HTMLElement} cite - Crea un elemento <cite>
 * @property {function(DOMAttributes<'code'>, *): HTMLElement} code - Crea un elemento <code>
 * @property {function(DOMAttributes<'col'>, *): HTMLTableColElement} col - Crea un elemento <col>
 * @property {function(DOMAttributes<'colgroup'>, *): HTMLTableColElement} colgroup - Crea un elemento <colgroup>
 * @property {function(DOMAttributes<'data'>, *): HTMLDataElement} data - Crea un elemento <data>
 * @property {function(DOMAttributes<'datalist'>, *): HTMLDataListElement} datalist - Crea un elemento <datalist>
 * @property {function(DOMAttributes<'dd'>, *): HTMLElement} dd - Crea un elemento <dd>
 * @property {function(DOMAttributes<'del'>, *): HTMLModElement} del - Crea un elemento <del>
 * @property {function(DOMAttributes<'details'>, *): HTMLDetailsElement} details - Crea un elemento <details>
 * @property {function(DOMAttributes<'dfn'>, *): HTMLElement} dfn - Crea un elemento <dfn>
 * @property {function(DOMAttributes<'dialog'>, *): HTMLDialogElement} dialog - Crea un elemento <dialog>
 * @property {function(DOMAttributes<'div'>, *): HTMLDivElement} div - Crea un elemento <div>
 * @property {function(DOMAttributes<'dl'>, *): HTMLDListElement} dl - Crea un elemento <dl>
 * @property {function(DOMAttributes<'dt'>, *): HTMLElement} dt - Crea un elemento <dt>
 * @property {function(DOMAttributes<'em'>, *): HTMLElement} em - Crea un elemento <em> (enfasi)
 * @property {function(DOMAttributes<'embed'>, *): HTMLEmbedElement} embed - Crea un elemento <embed>
 * @property {function(DOMAttributes<'fieldset'>, *): HTMLFieldSetElement} fieldset - Crea un elemento <fieldset>
 * @property {function(DOMAttributes<'figcaption'>, *): HTMLElement} figcaption - Crea un elemento <figcaption>
 * @property {function(DOMAttributes<'figure'>, *): HTMLElement} figure - Crea un elemento <figure>
 * @property {function(DOMAttributes<'footer'>, *): HTMLElement} footer - Crea un elemento <footer>
 * @property {function(DOMAttributes<'form'>, *): HTMLFormElement} form - Crea un elemento <form>
 * @property {function(DOMAttributes<'h1'>, *): HTMLHeadingElement} h1 - Crea un elemento <h1>
 * @property {function(DOMAttributes<'h2'>, *): HTMLHeadingElement} h2 - Crea un elemento <h2>
 * @property {function(DOMAttributes<'h3'>, *): HTMLHeadingElement} h3 - Crea un elemento <h3>
 * @property {function(DOMAttributes<'h4'>, *): HTMLHeadingElement} h4 - Crea un elemento <h4>
 * @property {function(DOMAttributes<'h5'>, *): HTMLHeadingElement} h5 - Crea un elemento <h5>
 * @property {function(DOMAttributes<'h6'>, *): HTMLHeadingElement} h6 - Crea un elemento <h6>
 * @property {function(DOMAttributes<'head'>, *): HTMLHeadElement} head - Crea un elemento <head>
 * @property {function(DOMAttributes<'header'>, *): HTMLElement} header - Crea un elemento <header>
 * @property {function(DOMAttributes<'hgroup'>, *): HTMLElement} hgroup - Crea un elemento <hgroup>
 * @property {function(DOMAttributes<'hr'>, *): HTMLHRElement} hr - Crea un elemento <hr>
 * @property {function(DOMAttributes<'html'>, *): HTMLHtmlElement} html - Crea un elemento <html>
 * @property {function(DOMAttributes<'i'>, *): HTMLElement} i - Crea un elemento <i> (italico)
 * @property {function(DOMAttributes<'iframe'>, *): HTMLIFrameElement} iframe - Crea un elemento <iframe>
 * @property {function(DOMAttributes<'img'>, *): HTMLImageElement} img - Crea un elemento <img>
 * @property {function(DOMAttributes<'input'>, *): HTMLInputElement} input - Crea un elemento <input>
 * @property {function(DOMAttributes<'ins'>, *): HTMLModElement} ins - Crea un elemento <ins>
 * @property {function(DOMAttributes<'kbd'>, *): HTMLElement} kbd - Crea un elemento <kbd>
 * @property {function(DOMAttributes<'label'>, *): HTMLLabelElement} label - Crea un elemento <label>
 * @property {function(DOMAttributes<'legend'>, *): HTMLLegendElement} legend - Crea un elemento <legend>
 * @property {function(DOMAttributes<'li'>, *): HTMLLIElement} li - Crea un elemento <li> (list item)
 * @property {function(DOMAttributes<'link'>, *): HTMLLinkElement} link - Crea un elemento <link>
 * @property {function(DOMAttributes<'main'>, *): HTMLElement} main - Crea un elemento <main>
 * @property {function(DOMAttributes<'map'>, *): HTMLMapElement} map - Crea un elemento <map>
 * @property {function(DOMAttributes<'mark'>, *): HTMLElement} mark - Crea un elemento <mark>
 * @property {function(DOMAttributes<'menu'>, *): HTMLMenuElement} menu - Crea un elemento <menu>
 * @property {function(DOMAttributes<'meta'>, *): HTMLMetaElement} meta - Crea un elemento <meta>
 * @property {function(DOMAttributes<'meter'>, *): HTMLMeterElement} meter - Crea un elemento <meter>
 * @property {function(DOMAttributes<'nav'>, *): HTMLElement} nav - Crea un elemento <nav>
 * @property {function(DOMAttributes<'noscript'>, *): HTMLElement} noscript - Crea un elemento <noscript>
 * @property {function(DOMAttributes<'object'>, *): HTMLObjectElement} object - Crea un elemento <object>
 * @property {function(DOMAttributes<'ol'>, *): HTMLOListElement} ol - Crea un elemento <ol> (ordered list)
 * @property {function(DOMAttributes<'optgroup'>, *): HTMLOptGroupElement} optgroup - Crea un elemento <optgroup>
 * @property {function(DOMAttributes<'option'>, *): HTMLOptionElement} option - Crea un elemento <option>
 * @property {function(DOMAttributes<'output'>, *): HTMLOutputElement} output - Crea un elemento <output>
 * @property {function(DOMAttributes<'p'>, *): HTMLParagraphElement} p - Crea un elemento <p> (paragrafo)
 * @property {function(DOMAttributes<'picture'>, *): HTMLPictureElement} picture - Crea un elemento <picture>
 * @property {function(DOMAttributes<'pre'>, *): HTMLPreElement} pre - Crea un elemento <pre>
 * @property {function(DOMAttributes<'progress'>, *): HTMLProgressElement} progress - Crea un elemento <progress>
 * @property {function(DOMAttributes<'q'>, *): HTMLQuoteElement} q - Crea un elemento <q> (quotation)
 * @property {function(DOMAttributes<'rp'>, *): HTMLElement} rp - Crea un elemento <rp>
 * @property {function(DOMAttributes<'rt'>, *): HTMLElement} rt - Crea un elemento <rt>
 * @property {function(DOMAttributes<'ruby'>, *): HTMLElement} ruby - Crea un elemento <ruby>
 * @property {function(DOMAttributes<'s'>, *): HTMLElement} s - Crea un elemento <s> (strikethrough)
 * @property {function(DOMAttributes<'samp'>, *): HTMLElement} samp - Crea un elemento <samp>
 * @property {function(DOMAttributes<'script'>, *): HTMLScriptElement} script - Crea un elemento <script>
 * @property {function(DOMAttributes<'search'>, *): HTMLElement} search - Crea un elemento <search>
 * @property {function(DOMAttributes<'section'>, *): HTMLElement} section - Crea un elemento <section>
 * @property {function(DOMAttributes<'select'>, *): HTMLSelectElement} select - Crea un elemento <select>
 * @property {function(DOMAttributes<'slot'>, *): HTMLSlotElement} slot - Crea un elemento <slot>
 * @property {function(DOMAttributes<'small'>, *): HTMLElement} small - Crea un elemento <small>
 * @property {function(DOMAttributes<'source'>, *): HTMLSourceElement} source - Crea un elemento <source>
 * @property {function(DOMAttributes<'span'>, *): HTMLSpanElement} span - Crea un elemento <span>
 * @property {function(DOMAttributes<'strong'>, *): HTMLElement} strong - Crea un elemento <strong>
 * @property {function(DOMAttributes<'style'>, *): HTMLStyleElement} style - Crea un elemento <style>
 * @property {function(DOMAttributes<'sub'>, *): HTMLElement} sub - Crea un elemento <sub>
 * @property {function(DOMAttributes<'summary'>, *): HTMLElement} summary - Crea un elemento <summary>
 * @property {function(DOMAttributes<'sup'>, *): HTMLElement} sup - Crea un elemento <sup>
 * @property {function(DOMAttributes<'table'>, *): HTMLTableElement} table - Crea un elemento <table>
 * @property {function(DOMAttributes<'tbody'>, *): HTMLTableSectionElement} tbody - Crea un elemento <tbody>
 * @property {function(DOMAttributes<'td'>, *): HTMLTableCellElement} td - Crea un elemento <td>
 * @property {function(DOMAttributes<'template'>, *): HTMLTemplateElement} template - Crea un elemento <template>
 * @property {function(DOMAttributes<'textarea'>, *): HTMLTextAreaElement} textarea - Crea un elemento <textarea>
 * @property {function(DOMAttributes<'tfoot'>, *): HTMLTableSectionElement} tfoot - Crea un elemento <tfoot>
 * @property {function(DOMAttributes<'th'>, *): HTMLTableCellElement} th - Crea un elemento <th>
 * @property {function(DOMAttributes<'thead'>, *): HTMLTableSectionElement} thead - Crea un elemento <thead>
 * @property {function(DOMAttributes<'time'>, *): HTMLTimeElement} time - Crea un elemento <time>
 * @property {function(DOMAttributes<'title'>, *): HTMLTitleElement} title - Crea un elemento <title>
 * @property {function(DOMAttributes<'tr'>, *): HTMLTableRowElement} tr - Crea un elemento <tr>
 * @property {function(DOMAttributes<'track'>, *): HTMLTrackElement} track - Crea un elemento <track>
 * @property {function(DOMAttributes<'u'>, *): HTMLElement} u - Crea un elemento <u> (underline)
 * @property {function(DOMAttributes<'ul'>, *): HTMLUListElement} ul - Crea un elemento <ul> (unordered list)
 * @property {function(DOMAttributes<'var'>, *): HTMLElement} var - Crea un elemento <var>
 * @property {function(DOMAttributes<'video'>, *): HTMLVideoElement} video - Crea un elemento <video>
 * @property {function(DOMAttributes<'wbr'>, *): HTMLElement} wbr - Crea un elemento <wbr>
 */

/**
 * Modulo per la manipolazione del DOM che offre funzioni di utilità per creare e gestire elementi HTML.
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
 */
const DOM = {
    createElFromHTMLString,
    getElement,
    fragment,
    createRoot,
    classNames,
    fetcher,
    Outlet,
};

const domFunctionCache = {};

// Popola a preventivo la cache per ogni tag HTML
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
    createElFromHTMLString,
    fragment,
    createRoot,
    Outlet,
};
