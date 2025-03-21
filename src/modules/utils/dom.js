/**
 * @fileoverview Modulo per utility DOM di base
 * @module just-dom/utils/dom
 */

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
export const getElement = (selector) => document.querySelector(selector);

/**
 * Seleziona e restituisce tutti gli elementi del DOM che corrispondono a un selettore CSS.
 * Wrapper di document.querySelectorAll() per comodità.
 *
 * @param {string} selector - Selettore CSS valido per trovare gli elementi
 * @returns {NodeList} Lista di elementi trovati
 *
 * @example
 * // Selezionare tutti gli elementi con una classe
 * const buttons = getAllElements('.button');
 * buttons.forEach(button => button.classList.add('active'));
 */
export const getAllElements = (selector) => document.querySelectorAll(selector);
