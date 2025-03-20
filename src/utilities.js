/**
 * Applica gli attributi HTML a un elemento
 * @param {HTMLElement} el - Elemento HTML
 * @param {Object} attributes - Oggetto contenente gli attributi
 */
export const applyAttributes = (el, attributes) => {
    if (!attributes) return;

    for (const [key, value] of Object.entries(attributes)) {
        switch (true) {
            case key === "style" && typeof value === "object":
                Object.assign(el.style, value);
                break;
            case key.startsWith("on") && typeof value === "function":
                el.addEventListener(key.slice(2).toLowerCase(), value);
                break;
            case key.startsWith("data") && typeof value === "string":
                const camelCaseKey = key
                    .slice(4)
                    .replace(/-(\w)/g, (_, c) => c.toUpperCase())
                    .replace(/^[A-Z]/, (c) => c.toLowerCase());
                el.dataset[camelCaseKey] = value;
                break;
            case value instanceof Boolean:
                if (value) el.setAttribute(key, "");
                break;
            default:
                el[key] = value;
        }
    }
};

/**
 * Crea un elemento DOM
 * @param {string} tagName - Nome del tag HTML
 * @param {Object} options - Attributi dell'elemento
 * @param {Array} children - Array di nodi figli
 * @return {HTMLElement} Elemento creato
 */
export const createDOMElement = (tagName, options, children) => {
    const el = document.createElement(tagName);

    // Applica gli attributi
    applyAttributes(el, options);

    // Aggiungi i figli
    if (children && children.length) {
        for (const child of children) {
            if (child) {
                if (typeof child === "string") {
                    el.appendChild(document.createTextNode(child));
                } else {
                    el.appendChild(child);
                }
            }
        }
    }

    return el;
};

/**
 * Funzione di utilità per creare classi condizionali
 * @param {Object} classes - Oggetto con coppie chiave-valore per le classi
 * @return {string} Stringa di classi CSS
 */
export const classNames = (classes) => {
    if (!classes) return "";

    return Object.entries(classes)
        .filter(([_, value]) => Boolean(value))
        .map(([key]) => key)
        .join(" ");
};

/**
 * Funzione di utilità per fare richieste HTTP
 * @param {string} url - URL della richiesta
 * @param {Object} options - Opzioni della richiesta
 * @return {Promise} Promise con il risultato della richiesta
 * @throws {Error} Errore di rete
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

/**
 * Funzione di utilità per creare l'elemento Outlet per il routing
 * (richiede vanilla-router)
 * @param {string} elId - ID dell'elemento HTML che conterrà il contenuto
 * @returns {HTMLElement} Elemento section che fungerà da outlet
 */
export const Outlet = (elId = "router-wrap") => {
    const outputEL = document.createElement("section");
    outputEL.dataset.vanillaRouteEle = elId;
    return outputEL;
};
