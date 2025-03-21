/**
 * @fileoverview Modulo per il montaggio di elementi DOM come radice
 * @module just-dom/core/createRoot
 */

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
export const createRoot = (rootId, rootEl) => {
    const container = document.getElementById(rootId);
    if (!container) {
        throw new Error(`Elemento con ID "${rootId}" non trovato`);
    }
    container.appendChild(rootEl);
};
