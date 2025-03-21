/**
 * @fileoverview Modulo per la gestione delle classi CSS
 * @module just-dom/utils/classNames
 */

/**
 * Funzione di utilità per creare classi condizionali
 * @param {Object} classes - Oggetto con coppie chiave-valore per le classi
 * @return {string} Stringa di classi CSS
 *
 * @example
 * // Restituisce "btn btn-primary"
 * const className = classNames({
 *   btn: true,
 *   'btn-primary': true,
 *   'btn-large': false
 * });
 */
export const classNames = (classes) => {
    if (!classes) return "";

    return Object.entries(classes)
        .filter(([_, value]) => Boolean(value))
        .map(([key]) => key)
        .join(" ");
};
