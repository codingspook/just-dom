import {
    applyAttributes,
    createRef,
    createDOMElement,
    classNames,
    fetcher,
    Outlet,
} from "../src/utilities.js";

describe("applyAttributes", () => {
    test("dovrebbe applicare attributi semplici ad un elemento", () => {
        const el = document.createElement("div");
        applyAttributes(el, { id: "test", className: "test-class" });

        expect(el.id).toBe("test");
        expect(el.className).toBe("test-class");
    });

    test("dovrebbe applicare attributi di stile come oggetto", () => {
        const el = document.createElement("div");
        applyAttributes(el, { style: { color: "red", fontSize: "16px" } });

        expect(el.style.color).toBe("red");
        expect(el.style.fontSize).toBe("16px");
    });

    test("dovrebbe aggiungere event listener", () => {
        const el = document.createElement("button");
        const mockFn = jest.fn();
        applyAttributes(el, { onClick: mockFn });

        el.dispatchEvent(new Event("click"));
        expect(mockFn).toHaveBeenCalled();
    });

    test("dovrebbe gestire attributi data", () => {
        const el = document.createElement("div");
        applyAttributes(el, { dataTestId: "test-id" });

        expect(el.dataset.testId).toBe("test-id");
    });

    test("non dovrebbe fare nulla se attributes è undefined", () => {
        const el = document.createElement("div");
        el.id = "original";

        applyAttributes(el, undefined);
        expect(el.id).toBe("original");
    });
});

describe("createRef", () => {
    test("dovrebbe creare un oggetto ref con current come undefined", () => {
        const ref = createRef();

        expect(ref).toHaveProperty("current");
        expect(ref.current).toBeUndefined();
    });
});

describe("createDOMElement", () => {
    test("dovrebbe creare un elemento DOM con il tag specificato", () => {
        const el = createDOMElement("div", null, []);

        expect(el.tagName).toBe("DIV");
    });

    test("dovrebbe applicare attributi all'elemento creato", () => {
        const el = createDOMElement("div", { id: "test", className: "test-class" }, []);

        expect(el.id).toBe("test");
        expect(el.className).toBe("test-class");
    });

    test("dovrebbe aggiungere nodi di testo figli", () => {
        const el = createDOMElement("div", null, ["Hello", "World"]);

        expect(el.childNodes.length).toBe(2);
        expect(el.childNodes[0].textContent).toBe("Hello");
        expect(el.childNodes[1].textContent).toBe("World");
    });

    test("dovrebbe aggiungere elementi figli", () => {
        const child = document.createElement("span");
        const el = createDOMElement("div", null, [child]);

        expect(el.childNodes.length).toBe(1);
        expect(el.firstChild).toBe(child);
    });

    test("dovrebbe assegnare l'elemento al riferimento", () => {
        const ref = createRef();
        const el = createDOMElement("div", { ref }, []);

        expect(ref.current).toBe(el);
    });
});

describe("classNames", () => {
    test("dovrebbe restituire una stringa vuota per input null o undefined", () => {
        expect(classNames(null)).toBe("");
        expect(classNames(undefined)).toBe("");
    });

    test("dovrebbe unire classi condizionali con valori truthy", () => {
        const classes = {
            btn: true,
            "btn-primary": true,
            "btn-large": false,
            active: 1,
        };

        expect(classNames(classes)).toBe("btn btn-primary active");
    });

    test("dovrebbe gestire oggetti vuoti", () => {
        expect(classNames({})).toBe("");
    });
});

describe("fetcher", () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    test("dovrebbe ritornare i dati JSON se la chiamata ha successo", async () => {
        const mockData = { success: true };
        global.fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockData),
        });

        const result = await fetcher("https://example.com/api");
        expect(result).toEqual(mockData);
        expect(global.fetch).toHaveBeenCalledWith("https://example.com/api", undefined);
    });

    test("dovrebbe lanciare un errore se la chiamata fetch fallisce", async () => {
        global.fetch.mockRejectedValueOnce(new Error("Network error"));

        await expect(fetcher("https://example.com/api")).rejects.toThrow("Failed to fetch");
    });
});

describe("Outlet", () => {
    test("dovrebbe creare un elemento section con il dataset corretto", () => {
        const outlet = Outlet();

        expect(outlet.tagName).toBe("SECTION");
        expect(outlet.dataset.vanillaRouteEle).toBe("router-wrap");
    });

    test("dovrebbe accettare un ID personalizzato", () => {
        const outlet = Outlet("custom-id");

        expect(outlet.dataset.vanillaRouteEle).toBe("custom-id");
    });
});
