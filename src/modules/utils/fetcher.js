/**
 * @fileoverview Modulo per le richieste HTTP
 * @module just-dom/utils/fetcher
 */

/**
 * Funzione di utilità per fare richieste HTTP
 * @param {string} url - URL della richiesta
 * @param {Object} options - Opzioni della richiesta
 * @return {Promise} Promise con il risultato della richiesta
 * @throws {Error} Errore di rete
 *
 * @example
 * // Recupera i dati da un'API
 * const data = await fetcher('https://api.example.com/data');
 *
 * // Invia dati a un'API
 * const response = await fetcher('https://api.example.com/data', {
 *   method: 'POST',
 *   body: JSON.stringify({ name: 'John' }),
 *   headers: { 'Content-Type': 'application/json' }
 * });
 */
export const fetcher = async (url, options) => {
    try {
        let res = await fetch(url, options);
        return res.json();
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch");
    }
};
