/**
 * @fileoverview Modulo per il routing
 * @module just-dom/routing/outlet
 */

/**
 * Funzione di utilità per creare l'elemento Outlet per il routing
 * (richiede vanilla-router)
 * @param {string} elId - ID dell'elemento HTML che conterrà il contenuto
 * @returns {HTMLElement} Elemento section che fungerà da outlet
 *
 * @example
 * // Crea un outlet per il routing
 * const outlet = Outlet('main-content');
 * document.body.appendChild(outlet);
 */
export const Outlet = (elId = "router-wrap") => {
    const outputEL = document.createElement("section");
    outputEL.dataset.vanillaRouteEle = elId;
    return outputEL;
};
