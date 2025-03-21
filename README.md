<div align="center">
  <img src="https://just-dom.vercel.app/logo.svg" alt="logo" width="100" />

  # Just DOM

  Una libreria JavaScript leggera per semplificare la manipolazione del DOM.

  [![npm version](https://img.shields.io/npm/v/just-dom.svg)](https://www.npmjs.com/package/just-dom)
  [![bundle size](https://img.shields.io/bundlephobia/minzip/just-dom)](https://bundlephobia.com/package/just-dom)
  [![downloads](https://img.shields.io/npm/dt/just-dom.svg)](https://www.npmjs.com/package/just-dom)
  [![license](https://img.shields.io/npm/l/just-dom.svg)](https://github.com/yourusername/just-dom/blob/main/LICENSE)
</div>

## Caratteristiche

- Creazione semplificata di elementi DOM
- Gestione di attributi, stili e eventi in un'unica interfaccia
- Supporto per tutti i tag HTML standard
- Funzioni di utilità per manipolazione classi CSS, routing e fetch API
- Nessuna dipendenza esterna
- Dimensioni ridotte (< 20KB)
- Supporto completo per TypeScript

## Installazione

```bash
npm install just-dom
```

## Utilizzo

### Import

Easy DOM supporta diversi metodi di import per la massima flessibilità:

```javascript
// Import dell'oggetto DOM principale (raccomandato)
import DOM from 'just-dom';

// Import delle singole funzioni di utilità
import { classNames, fetcher, getElement } from 'just-dom';

// Import misto
import DOM, { classNames, fetcher } from 'just-dom';
```

### Creare elementi DOM

```javascript
import DOM from 'just-dom';

// Usando helper di tag
const header = DOM.h1({ className: 'title' }, ['Benvenuto in Easy DOM']);

const btn = DOM.button(
  { 
    className: 'btn primary',
    onclick: () => alert('Cliccato!')
  },
  ['Clicca qui']
);

// Annidamento di elementi
const container = DOM.div({ className: 'container' }, [header, btn]);
```

### Funzioni di utilità

```javascript
import { classNames, fetcher, getElement, createElFromHTMLString } from 'just-dom';

// Creare classi condizionali
const btnClass = classNames({
  'btn': true,
  'btn-primary': true,
  'disabled': false
}); // Risultato: "btn btn-primary"

// Effettuare richieste HTTP
const data = await fetcher('https://api.example.com/data', {
  method: 'POST',
  body: JSON.stringify({ key: 'value' })
});

// Selezionare elementi DOM esistenti
const element = getElement('#my-id');

// Creare un riferimento a un elemento
const ref = createRef();
DOM.div({ ref }, 'Ciao');

// Usare il riferimento per manipolare l'elemento
ref.current.style.color = 'red';

// Creare elementi da stringa HTML
const fragment = createElFromHTMLString('<div>Ciao</div><p>Mondo</p>');
document.body.appendChild(fragment);
```

### Routing (richiede vanilla-router)

```javascript
import { Outlet } from 'just-dom';

const routerOutlet = Outlet('app');
document.body.appendChild(routerOutlet);
```

## Supporto TypeScript

Easy DOM include dichiarazioni di tipo TypeScript complete. Non è necessario installare pacchetti aggiuntivi.

```typescript
import DOM, { DOMAttributes } from 'just-dom';

// Le proprietà hanno suggerimenti e controllo dei tipi
const button = DOM.button({ 
  className: 'btn',
  disabled: false,
  onclick: (e: MouseEvent) => console.log('Cliccato!', e)
}, ['Click me']);

// Definizione di proprietà personalizzate
interface MyButtonProps extends DOMAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

function createButton(props: MyButtonProps, children: string[]) {
  return DOM.button({
    ...props,
    className: `btn btn-${props.variant || 'primary'}`
  }, children);
}
```

## Compatibilità

- Tutti i browser moderni (Chrome, Firefox, Safari, Edge)
- IE11 con l'uso di polyfill appropriati

## Sviluppo

```bash
# Installa le dipendenze
npm install

# Compila il progetto
npm run build

# Esegui i test
npm test
```

## Licenza

MIT