// Interfaccia per gli attributi DOM generico
export interface DOMAttributes<T extends HTMLElement = HTMLElement> {
    id?: string;
    ref?: { current: HTMLElement | null };
    className?: string;
    style?: Partial<CSSStyleDeclaration>;
    title?: string;
    tabIndex?: number;
    [key: string]: any;
}

// Tipi per le funzioni di utilità
export type ClassNameValue = string | number | boolean | undefined | null;
export type ClassNameMapping = Record<string, any>;
export type ClassNamesArgument = ClassNameValue | ClassNameMapping;

// Dichiarazione per la funzione createDOMElement
export function createDOMElement<K extends keyof HTMLElementTagNameMap>(
    tagName: K,
    options?: DOMAttributes<HTMLElementTagNameMap[K]>,
    children?: (Node | string)[]
): HTMLElementTagNameMap[K];

// Dichiarazione per le funzioni di utilità
export function classNames(...args: ClassNamesArgument[]): string;
export function fetcher<T = any>(url: string, options?: RequestInit): Promise<T>;
export function getElement<E extends Element = HTMLElement>(selector: string): E | null;
export function getAllElements<E extends Element = HTMLElement>(selector: string): NodeListOf<E>;
export function createElFromHTMLString(HTMLString: string): DocumentFragment;
export function fragment(children: (Node | string)[]): DocumentFragment;
export function createRoot(rootId: string, rootEl: HTMLElement): void;
export function Outlet(elId?: string): HTMLElement;
export function createRef<T = HTMLElement>(): { current: T | null };

// Interfaccia per l'oggetto DOM principale
interface DOM {
    createElFromHTMLString: typeof createElFromHTMLString;
    getElement: typeof getElement;
    getAllElements: typeof getAllElements;
    fragment: typeof fragment;
    createRef: typeof createRef;
    createRoot: typeof createRoot;
    classNames: typeof classNames;
    fetcher: typeof fetcher;
    Outlet: typeof Outlet;
    [tagName: string]: <T extends HTMLElement = HTMLElement>(
        options?: DOMAttributes<T>,
        children?: (Node | string)[]
    ) => T;
}

// Export default dell'oggetto DOM
declare const dom: DOM;
export default dom; 