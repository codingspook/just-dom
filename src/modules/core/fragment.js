/**
 * @fileoverview Modulo per la creazione di frammenti DOM
 * @module just-dom/core/fragment
 */

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
export const fragment = function (children) {
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
export const createElFromHTMLString = (HTMLString) => {
    const fragment = document.createDocumentFragment();
    let parser = new DOMParser();
    const newNode = parser.parseFromString(HTMLString, "text/html");
    const els = newNode.body.childNodes;
    els.forEach((el) => fragment.appendChild(el));
    return fragment;
};
