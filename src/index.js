/**
 * @fileoverview Modulo principale per la creazione e manipolazione di elementi DOM con un'API dichiarativa.
 * @module just-dom
 */
import { createDOMElement, classNames, fetcher, createRef, Outlet } from "./utilities.js";

/**
 * Lista completa dei tag HTML supportati dalla libreria.
 * @type {string[]}
 */
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
    "svg",
    "path",
    "circle",
    "rect",
    "line",
    "polyline",
    "polygon",
    "ellipse",
];

/**
 * Crea un DocumentFragment contenente una lista di nodi figli.
 * Utile per aggiungere più elementi al DOM in un'unica operazione.
 *
 * @param {Array<Node|string>} children - Array di nodi DOM o stringhe di testo da aggiungere al fragment
 * @returns {DocumentFragment} Un fragment contenente tutti i nodi figli
 *
 * @example
 * // Creare un fragment con elementi misti
 * const frag = fragment([
 *   document.createElement('div'),
 *   'Testo semplice',
 *   document.createElement('span')
 * ]);
 * document.body.appendChild(frag); // Aggiunge tutti gli elementi in un'unica operazione
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
 * Seleziona e restituisce un elemento del DOM utilizzando un selettore CSS.
 * Wrapper di document.querySelector() per comodità.
 *
 * @param {string} selector - Selettore CSS valido per trovare l'elemento
 * @returns {HTMLElement|null} L'elemento trovato o null se non esiste
 *
 * @example
 * // Selezionare un elemento per ID
 * const header = getElement('#header');
 *
 * @example
 * // Selezionare il primo elemento che corrisponde a una classe
 * const firstButton = getElement('.button');
 */
const getElement = (selector) => document.querySelector(selector);

/**
 * Crea elementi DOM a partire da una stringa HTML.
 * Utile per convertire markup HTML in nodi DOM utilizzabili.
 *
 * @param {string} HTMLString - Stringa HTML valida da convertire in nodi DOM
 * @returns {DocumentFragment} Fragment contenente gli elementi parsati dalla stringa
 *
 * @example
 * // Creare elementi da una stringa HTML
 * const elements = createElFromHTMLString('<div>Titolo</div><p>Paragrafo</p>');
 * document.body.appendChild(elements);
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
 * Monta un elemento DOM come radice dell'applicazione.
 * Equivalente semplificato di ReactDOM.createRoot().
 *
 * @param {string} rootId - ID dell'elemento container nel DOM
 * @param {Node} rootEl - Elemento radice da montare nel container
 * @throws {Error} Se l'elemento con l'ID specificato non esiste
 * @returns {void}
 *
 * @example
 * // Creare e montare l'elemento radice dell'applicazione
 * const app = DOM.div({className: 'app'}, 'Contenuto app');
 * createRoot('root', app);
 */
const createRoot = (rootId, rootEl) => {
    document.getElementById(rootId).appendChild(rootEl);
};

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
 * @property {function(string, HTMLElement): void} createRef - Crea un riferimento a un elemento
 * @property {function(...(string|boolean|null|undefined)): string} classNames - Utility per combinare classi CSS condizionalmente
 * @property {function(string, Object): Promise<any>} fetcher - Utility per effettuare richieste HTTP
 * @property {function(Object): HTMLElement} Outlet - Componente per il rendering condizionale
 *
 * @property {function(DOMAttributes<'a'>, ...(Node|string|Array<Node|string>)): HTMLAnchorElement} a - Crea un elemento <a> (link)
 * @property {function(DOMAttributes<'abbr'>, ...(Node|string|Array<Node|string>)): HTMLElement} abbr - Crea un elemento <abbr> (abbreviazione)
 * @property {function(DOMAttributes<'address'>, ...(Node|string|Array<Node|string>)): HTMLElement} address - Crea un elemento <address>
 * @property {function(DOMAttributes<'area'>, ...(Node|string|Array<Node|string>)): HTMLAreaElement} area - Crea un elemento <area>
 * @property {function(DOMAttributes<'article'>, ...(Node|string|Array<Node|string>)): HTMLElement} article - Crea un elemento <article>
 * @property {function(DOMAttributes<'aside'>, ...(Node|string|Array<Node|string>)): HTMLElement} aside - Crea un elemento <aside>
 * @property {function(DOMAttributes<'audio'>, ...(Node|string|Array<Node|string>)): HTMLAudioElement} audio - Crea un elemento <audio>
 * @property {function(DOMAttributes<'b'>, ...(Node|string|Array<Node|string>)): HTMLElement} b - Crea un elemento <b> (bold)
 * @property {function(DOMAttributes<'base'>, ...(Node|string|Array<Node|string>)): HTMLBaseElement} base - Crea un elemento <base>
 * @property {function(DOMAttributes<'bdi'>, ...(Node|string|Array<Node|string>)): HTMLElement} bdi - Crea un elemento <bdi>
 * @property {function(DOMAttributes<'bdo'>, ...(Node|string|Array<Node|string>)): HTMLElement} bdo - Crea un elemento <bdo>
 * @property {function(DOMAttributes<'blockquote'>, ...(Node|string|Array<Node|string>)): HTMLQuoteElement} blockquote - Crea un elemento <blockquote>
 * @property {function(DOMAttributes<'body'>, ...(Node|string|Array<Node|string>)): HTMLBodyElement} body - Crea un elemento <body>
 * @property {function(DOMAttributes<'br'>, ...(Node|string|Array<Node|string>)): HTMLBRElement} br - Crea un elemento <br> (line break)
 * @property {function(DOMAttributes<'button'>, ...(Node|string|Array<Node|string>)): HTMLButtonElement} button - Crea un elemento <button>
 * @property {function(DOMAttributes<'canvas'>, ...(Node|string|Array<Node|string>)): HTMLCanvasElement} canvas - Crea un elemento <canvas>
 * @property {function(DOMAttributes<'caption'>, ...(Node|string|Array<Node|string>)): HTMLTableCaptionElement} caption - Crea un elemento <caption>
 * @property {function(DOMAttributes<'cite'>, ...(Node|string|Array<Node|string>)): HTMLElement} cite - Crea un elemento <cite>
 * @property {function(DOMAttributes<'code'>, ...(Node|string|Array<Node|string>)): HTMLElement} code - Crea un elemento <code>
 * @property {function(DOMAttributes<'col'>, ...(Node|string|Array<Node|string>)): HTMLTableColElement} col - Crea un elemento <col>
 * @property {function(DOMAttributes<'colgroup'>, ...(Node|string|Array<Node|string>)): HTMLTableColElement} colgroup - Crea un elemento <colgroup>
 * @property {function(DOMAttributes<'data'>, ...(Node|string|Array<Node|string>)): HTMLDataElement} data - Crea un elemento <data>
 * @property {function(DOMAttributes<'datalist'>, ...(Node|string|Array<Node|string>)): HTMLDataListElement} datalist - Crea un elemento <datalist>
 * @property {function(DOMAttributes<'dd'>, ...(Node|string|Array<Node|string>)): HTMLElement} dd - Crea un elemento <dd>
 * @property {function(DOMAttributes<'del'>, ...(Node|string|Array<Node|string>)): HTMLModElement} del - Crea un elemento <del>
 * @property {function(DOMAttributes<'details'>, ...(Node|string|Array<Node|string>)): HTMLDetailsElement} details - Crea un elemento <details>
 * @property {function(DOMAttributes<'dfn'>, ...(Node|string|Array<Node|string>)): HTMLElement} dfn - Crea un elemento <dfn>
 * @property {function(DOMAttributes<'dialog'>, ...(Node|string|Array<Node|string>)): HTMLDialogElement} dialog - Crea un elemento <dialog>
 * @property {function(DOMAttributes<'div'>, ...(Node|string|Array<Node|string>)): HTMLDivElement} div - Crea un elemento <div>
 * @property {function(DOMAttributes<'dl'>, ...(Node|string|Array<Node|string>)): HTMLDListElement} dl - Crea un elemento <dl>
 * @property {function(DOMAttributes<'dt'>, ...(Node|string|Array<Node|string>)): HTMLElement} dt - Crea un elemento <dt>
 * @property {function(DOMAttributes<'em'>, ...(Node|string|Array<Node|string>)): HTMLElement} em - Crea un elemento <em> (enfasi)
 * @property {function(DOMAttributes<'embed'>, ...(Node|string|Array<Node|string>)): HTMLEmbedElement} embed - Crea un elemento <embed>
 * @property {function(DOMAttributes<'fieldset'>, ...(Node|string|Array<Node|string>)): HTMLFieldSetElement} fieldset - Crea un elemento <fieldset>
 * @property {function(DOMAttributes<'figcaption'>, ...(Node|string|Array<Node|string>)): HTMLElement} figcaption - Crea un elemento <figcaption>
 * @property {function(DOMAttributes<'figure'>, ...(Node|string|Array<Node|string>)): HTMLElement} figure - Crea un elemento <figure>
 * @property {function(DOMAttributes<'footer'>, ...(Node|string|Array<Node|string>)): HTMLElement} footer - Crea un elemento <footer>
 * @property {function(DOMAttributes<'form'>, ...(Node|string|Array<Node|string>)): HTMLFormElement} form - Crea un elemento <form>
 * @property {function(DOMAttributes<'h1'>, ...(Node|string|Array<Node|string>)): HTMLHeadingElement} h1 - Crea un elemento <h1>
 * @property {function(DOMAttributes<'h2'>, ...(Node|string|Array<Node|string>)): HTMLHeadingElement} h2 - Crea un elemento <h2>
 * @property {function(DOMAttributes<'h3'>, ...(Node|string|Array<Node|string>)): HTMLHeadingElement} h3 - Crea un elemento <h3>
 * @property {function(DOMAttributes<'h4'>, ...(Node|string|Array<Node|string>)): HTMLHeadingElement} h4 - Crea un elemento <h4>
 * @property {function(DOMAttributes<'h5'>, ...(Node|string|Array<Node|string>)): HTMLHeadingElement} h5 - Crea un elemento <h5>
 * @property {function(DOMAttributes<'h6'>, ...(Node|string|Array<Node|string>)): HTMLHeadingElement} h6 - Crea un elemento <h6>
 * @property {function(DOMAttributes<'head'>, ...(Node|string|Array<Node|string>)): HTMLHeadElement} head - Crea un elemento <head>
 * @property {function(DOMAttributes<'header'>, ...(Node|string|Array<Node|string>)): HTMLElement} header - Crea un elemento <header>
 * @property {function(DOMAttributes<'hgroup'>, ...(Node|string|Array<Node|string>)): HTMLElement} hgroup - Crea un elemento <hgroup>
 * @property {function(DOMAttributes<'hr'>, ...(Node|string|Array<Node|string>)): HTMLHRElement} hr - Crea un elemento <hr>
 * @property {function(DOMAttributes<'html'>, ...(Node|string|Array<Node|string>)): HTMLHtmlElement} html - Crea un elemento <html>
 * @property {function(DOMAttributes<'i'>, ...(Node|string|Array<Node|string>)): HTMLElement} i - Crea un elemento <i> (italico)
 * @property {function(DOMAttributes<'iframe'>, ...(Node|string|Array<Node|string>)): HTMLIFrameElement} iframe - Crea un elemento <iframe>
 * @property {function(DOMAttributes<'img'>, ...(Node|string|Array<Node|string>)): HTMLImageElement} img - Crea un elemento <img>
 * @property {function(DOMAttributes<'input'>, ...(Node|string|Array<Node|string>)): HTMLInputElement} input - Crea un elemento <input>
 * @property {function(DOMAttributes<'ins'>, ...(Node|string|Array<Node|string>)): HTMLModElement} ins - Crea un elemento <ins>
 * @property {function(DOMAttributes<'kbd'>, ...(Node|string|Array<Node|string>)): HTMLElement} kbd - Crea un elemento <kbd>
 * @property {function(DOMAttributes<'label'>, ...(Node|string|Array<Node|string>)): HTMLLabelElement} label - Crea un elemento <label>
 * @property {function(DOMAttributes<'legend'>, ...(Node|string|Array<Node|string>)): HTMLLegendElement} legend - Crea un elemento <legend>
 * @property {function(DOMAttributes<'li'>, ...(Node|string|Array<Node|string>)): HTMLLIElement} li - Crea un elemento <li> (list item)
 * @property {function(DOMAttributes<'link'>, ...(Node|string|Array<Node|string>)): HTMLLinkElement} link - Crea un elemento <link>
 * @property {function(DOMAttributes<'main'>, ...(Node|string|Array<Node|string>)): HTMLElement} main - Crea un elemento <main>
 * @property {function(DOMAttributes<'map'>, ...(Node|string|Array<Node|string>)): HTMLMapElement} map - Crea un elemento <map>
 * @property {function(DOMAttributes<'mark'>, ...(Node|string|Array<Node|string>)): HTMLElement} mark - Crea un elemento <mark>
 * @property {function(DOMAttributes<'menu'>, ...(Node|string|Array<Node|string>)): HTMLMenuElement} menu - Crea un elemento <menu>
 * @property {function(DOMAttributes<'meta'>, ...(Node|string|Array<Node|string>)): HTMLMetaElement} meta - Crea un elemento <meta>
 * @property {function(DOMAttributes<'meter'>, ...(Node|string|Array<Node|string>)): HTMLMeterElement} meter - Crea un elemento <meter>
 * @property {function(DOMAttributes<'nav'>, ...(Node|string|Array<Node|string>)): HTMLElement} nav - Crea un elemento <nav>
 * @property {function(DOMAttributes<'noscript'>, ...(Node|string|Array<Node|string>)): HTMLElement} noscript - Crea un elemento <noscript>
 * @property {function(DOMAttributes<'object'>, ...(Node|string|Array<Node|string>)): HTMLObjectElement} object - Crea un elemento <object>
 * @property {function(DOMAttributes<'ol'>, ...(Node|string|Array<Node|string>)): HTMLOListElement} ol - Crea un elemento <ol> (ordered list)
 * @property {function(DOMAttributes<'optgroup'>, ...(Node|string|Array<Node|string>)): HTMLOptGroupElement} optgroup - Crea un elemento <optgroup>
 * @property {function(DOMAttributes<'option'>, ...(Node|string|Array<Node|string>)): HTMLOptionElement} option - Crea un elemento <option>
 * @property {function(DOMAttributes<'output'>, ...(Node|string|Array<Node|string>)): HTMLOutputElement} output - Crea un elemento <output>
 * @property {function(DOMAttributes<'p'>, ...(Node|string|Array<Node|string>)): HTMLParagraphElement} p - Crea un elemento <p> (paragrafo)
 * @property {function(DOMAttributes<'picture'>, ...(Node|string|Array<Node|string>)): HTMLPictureElement} picture - Crea un elemento <picture>
 * @property {function(DOMAttributes<'pre'>, ...(Node|string|Array<Node|string>)): HTMLPreElement} pre - Crea un elemento <pre>
 * @property {function(DOMAttributes<'progress'>, ...(Node|string|Array<Node|string>)): HTMLProgressElement} progress - Crea un elemento <progress>
 * @property {function(DOMAttributes<'q'>, ...(Node|string|Array<Node|string>)): HTMLQuoteElement} q - Crea un elemento <q> (quotation)
 * @property {function(DOMAttributes<'rp'>, ...(Node|string|Array<Node|string>)): HTMLElement} rp - Crea un elemento <rp>
 * @property {function(DOMAttributes<'rt'>, ...(Node|string|Array<Node|string>)): HTMLElement} rt - Crea un elemento <rt>
 * @property {function(DOMAttributes<'ruby'>, ...(Node|string|Array<Node|string>)): HTMLElement} ruby - Crea un elemento <ruby>
 * @property {function(DOMAttributes<'s'>, ...(Node|string|Array<Node|string>)): HTMLElement} s - Crea un elemento <s> (strikethrough)
 * @property {function(DOMAttributes<'samp'>, ...(Node|string|Array<Node|string>)): HTMLElement} samp - Crea un elemento <samp>
 * @property {function(DOMAttributes<'script'>, ...(Node|string|Array<Node|string>)): HTMLScriptElement} script - Crea un elemento <script>
 * @property {function(DOMAttributes<'search'>, ...(Node|string|Array<Node|string>)): HTMLElement} search - Crea un elemento <search>
 * @property {function(DOMAttributes<'section'>, ...(Node|string|Array<Node|string>)): HTMLElement} section - Crea un elemento <section>
 * @property {function(DOMAttributes<'select'>, ...(Node|string|Array<Node|string>)): HTMLSelectElement} select - Crea un elemento <select>
 * @property {function(DOMAttributes<'slot'>, ...(Node|string|Array<Node|string>)): HTMLSlotElement} slot - Crea un elemento <slot>
 * @property {function(DOMAttributes<'small'>, ...(Node|string|Array<Node|string>)): HTMLElement} small - Crea un elemento <small>
 * @property {function(DOMAttributes<'source'>, ...(Node|string|Array<Node|string>)): HTMLSourceElement} source - Crea un elemento <source>
 * @property {function(DOMAttributes<'span'>, ...(Node|string|Array<Node|string>)): HTMLSpanElement} span - Crea un elemento <span>
 * @property {function(DOMAttributes<'strong'>, ...(Node|string|Array<Node|string>)): HTMLElement} strong - Crea un elemento <strong>
 * @property {function(DOMAttributes<'style'>, ...(Node|string|Array<Node|string>)): HTMLStyleElement} style - Crea un elemento <style>
 * @property {function(DOMAttributes<'sub'>, ...(Node|string|Array<Node|string>)): HTMLElement} sub - Crea un elemento <sub>
 * @property {function(DOMAttributes<'summary'>, ...(Node|string|Array<Node|string>)): HTMLElement} summary - Crea un elemento <summary>
 * @property {function(DOMAttributes<'sup'>, ...(Node|string|Array<Node|string>)): HTMLElement} sup - Crea un elemento <sup>
 * @property {function(DOMAttributes<'table'>, ...(Node|string|Array<Node|string>)): HTMLTableElement} table - Crea un elemento <table>
 * @property {function(DOMAttributes<'tbody'>, ...(Node|string|Array<Node|string>)): HTMLTableSectionElement} tbody - Crea un elemento <tbody>
 * @property {function(DOMAttributes<'td'>, ...(Node|string|Array<Node|string>)): HTMLTableCellElement} td - Crea un elemento <td>
 * @property {function(DOMAttributes<'template'>, ...(Node|string|Array<Node|string>)): HTMLTemplateElement} template - Crea un elemento <template>
 * @property {function(DOMAttributes<'textarea'>, ...(Node|string|Array<Node|string>)): HTMLTextAreaElement} textarea - Crea un elemento <textarea>
 * @property {function(DOMAttributes<'tfoot'>, ...(Node|string|Array<Node|string>)): HTMLTableSectionElement} tfoot - Crea un elemento <tfoot>
 * @property {function(DOMAttributes<'th'>, ...(Node|string|Array<Node|string>)): HTMLTableCellElement} th - Crea un elemento <th>
 * @property {function(DOMAttributes<'thead'>, ...(Node|string|Array<Node|string>)): HTMLTableSectionElement} thead - Crea un elemento <thead>
 * @property {function(DOMAttributes<'time'>, ...(Node|string|Array<Node|string>)): HTMLTimeElement} time - Crea un elemento <time>
 * @property {function(DOMAttributes<'title'>, ...(Node|string|Array<Node|string>)): HTMLTitleElement} title - Crea un elemento <title>
 * @property {function(DOMAttributes<'tr'>, ...(Node|string|Array<Node|string>)): HTMLTableRowElement} tr - Crea un elemento <tr>
 * @property {function(DOMAttributes<'track'>, ...(Node|string|Array<Node|string>)): HTMLTrackElement} track - Crea un elemento <track>
 * @property {function(DOMAttributes<'u'>, ...(Node|string|Array<Node|string>)): HTMLElement} u - Crea un elemento <u> (underline)
 * @property {function(DOMAttributes<'ul'>, ...(Node|string|Array<Node|string>)): HTMLUListElement} ul - Crea un elemento <ul> (unordered list)
 * @property {function(DOMAttributes<'var'>, ...(Node|string|Array<Node|string>)): HTMLElement} var - Crea un elemento <var>
 * @property {function(DOMAttributes<'video'>, ...(Node|string|Array<Node|string>)): HTMLVideoElement} video - Crea un elemento <video>
 * @property {function(DOMAttributes<'wbr'>, ...(Node|string|Array<Node|string>)): HTMLElement} wbr - Crea un elemento <wbr>
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
    fragment,
    createRoot,
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
    createElFromHTMLString,
    fragment,
    createRoot,
    createRef,
    Outlet,
};
