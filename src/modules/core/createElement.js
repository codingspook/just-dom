/**
 * @fileoverview Modulo per la creazione di elementi DOM
 * @module just-dom/core/createElement
 */

/**
 * Applica gli attributi HTML a un elemento
 * @param {HTMLElement} el - Elemento HTML
 * @param {Object} attributes - Oggetto contenente gli attributi
 * @private
 */
const applyAttributes = (el, attributes) => {
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
    if (options) {
        // Gestisce ref se presente
        if (options.ref && typeof options.ref === "object" && "current" in options.ref) {
            options.ref.current = el;
            const { ref, ...restOptions } = options;
            applyAttributes(el, restOptions);
        } else {
            applyAttributes(el, options);
        }
    }

    // Aggiungi i figli
    if (children && children.length) {
        if (Array.isArray(children)) {
            for (const child of children) {
                if (child) {
                    if (typeof child === "string") {
                        el.appendChild(document.createTextNode(child));
                    } else {
                        el.appendChild(child);
                    }
                }
            }
        } else {
            el.appendChild(children);
        }
    }

    return el;
};
