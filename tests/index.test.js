import DOM, { getElement, createElFromHTMLString, fragment, createRoot } from "../src/index.js";

describe("getElement", () => {
    test("dovrebbe restituire l'elemento corrispondente al selettore", () => {
        // Prepara il DOM per il test
        document.body.innerHTML = '<div id="test-div"></div>';

        const element = getElement("#test-div");
        expect(element).toBeTruthy();
        expect(element.id).toBe("test-div");
    });

    test("dovrebbe restituire null per un selettore che non corrisponde a nessun elemento", () => {
        document.body.innerHTML = "";

        const element = getElement("#non-existent");
        expect(element).toBeNull();
    });
});

describe("createElFromHTMLString", () => {
    test("dovrebbe creare elementi DOM da una stringa HTML", () => {
        // Dato che DOMParser si comporta in modo diverso in jsdom,
        // creiamo un test più specifico per verificare la funzionalità di base
        const result = createElFromHTMLString("<div>Test</div>");

        expect(result).toBeInstanceOf(DocumentFragment);
        expect(result.childNodes.length).toBeGreaterThan(0);

        // Verifichiamo che ci sia almeno un elemento div nel fragment
        let hasDiv = false;
        for (let i = 0; i < result.childNodes.length; i++) {
            if (result.childNodes[i].tagName === "DIV") {
                hasDiv = true;
                break;
            }
        }

        expect(hasDiv).toBe(true);
    });

    test("dovrebbe gestire stringhe HTML vuote", () => {
        const result = createElFromHTMLString("");

        expect(result).toBeInstanceOf(DocumentFragment);
        expect(result.childNodes.length).toBe(0);
    });
});

describe("fragment", () => {
    test("dovrebbe creare un DocumentFragment con nodi figli", () => {
        const div = document.createElement("div");
        const span = document.createElement("span");

        const result = fragment([div, span, "Testo"]);

        expect(result).toBeInstanceOf(DocumentFragment);
        expect(result.childNodes.length).toBe(3);
        expect(result.childNodes[0]).toBe(div);
        expect(result.childNodes[1]).toBe(span);
        expect(result.childNodes[2].textContent).toBe("Testo");
    });

    test("dovrebbe ignorare i valori falsy nei figli", () => {
        const div = document.createElement("div");

        const result = fragment([div, null, undefined, false]);

        expect(result).toBeInstanceOf(DocumentFragment);
        expect(result.childNodes.length).toBe(1);
        expect(result.childNodes[0]).toBe(div);
    });
});

describe("createRoot", () => {
    test("dovrebbe montare un elemento nel container specificato", () => {
        // Prepara il DOM per il test
        document.body.innerHTML = '<div id="root"></div>';

        const app = document.createElement("div");
        app.className = "app";
        app.textContent = "Test App";

        createRoot("root", app);

        const rootEl = document.getElementById("root");
        expect(rootEl.childNodes.length).toBe(1);
        expect(rootEl.firstChild).toBe(app);
        expect(rootEl.firstChild.className).toBe("app");
        expect(rootEl.firstChild.textContent).toBe("Test App");
    });
});

describe("DOM object", () => {
    test("dovrebbe esporre le funzioni di utility", () => {
        expect(DOM.createElFromHTMLString).toBeDefined();
        expect(DOM.getElement).toBeDefined();
        expect(DOM.fragment).toBeDefined();
        expect(DOM.createRoot).toBeDefined();
        expect(DOM.classNames).toBeDefined();
        expect(DOM.fetcher).toBeDefined();
        expect(DOM.Outlet).toBeDefined();
    });

    test("dovrebbe generare funzioni per ogni tag HTML", () => {
        // Verifica alcuni tag comuni
        expect(typeof DOM.div).toBe("function");
        expect(typeof DOM.span).toBe("function");
        expect(typeof DOM.a).toBe("function");
        expect(typeof DOM.button).toBe("function");
        expect(typeof DOM.h1).toBe("function");
        expect(typeof DOM.p).toBe("function");
        expect(typeof DOM.ul).toBe("function");
        expect(typeof DOM.li).toBe("function");
    });
});

describe("DOM element creation", () => {
    test("dovrebbe creare un elemento div con proprietà e figli", () => {
        const div = DOM.div({ id: "test", className: "container" }, "Hello world");

        expect(div.tagName).toBe("DIV");
        expect(div.id).toBe("test");
        expect(div.className).toBe("container");
        expect(div.textContent).toBe("Hello world");
    });

    test("dovrebbe creare elementi annidati", () => {
        const ul = DOM.ul({ className: "list" }, [
            DOM.li({ className: "item" }, "Item 1"),
            DOM.li({ className: "item" }, "Item 2"),
        ]);

        expect(ul.tagName).toBe("UL");
        expect(ul.className).toBe("list");
        expect(ul.childNodes.length).toBe(2);
        expect(ul.childNodes[0].tagName).toBe("LI");
        expect(ul.childNodes[0].className).toBe("item");
        expect(ul.childNodes[0].textContent).toBe("Item 1");
        expect(ul.childNodes[1].tagName).toBe("LI");
        expect(ul.childNodes[1].className).toBe("item");
        expect(ul.childNodes[1].textContent).toBe("Item 2");
    });

    test("dovrebbe gestire eventi", () => {
        const clickHandler = jest.fn();
        const button = DOM.button({ onClick: clickHandler }, "Click me");

        button.dispatchEvent(new Event("click"));

        expect(clickHandler).toHaveBeenCalled();
    });
});
