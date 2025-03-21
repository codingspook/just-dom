/**
 * @fileoverview Modulo per la gestione dei riferimenti agli elementi DOM
 * @module just-dom/utils/ref
 */

/**
 * Definizione di tipo per un Ref
 * @template T
 * @typedef {Object} Ref
 * @property {T|undefined} current - Riferimento all'elemento
 */

/**
 * Crea un riferimento per un elemento DOM
 * @template T
 * @return {Ref<T>} Oggetto con la proprietà current
 *
 * @example
 * const ref = createRef();
 * const el = DOM.div({ ref }, "Hello");
 * console.log(ref.current); // <div></div>
 */
export function createRef() {
    return { current: undefined };
}
