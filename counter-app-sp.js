/**
 * Copyright 2026 Mandy Liu
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `counter-app-sp`
 * 
 * @demo index.html
 * @element counter-app-sp
 */
export class CounterAppSp extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "counter-app-sp";
  }

  // Sets default property values and registers localization
  constructor() {
    super();
    this.title = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/counter-app-sp.ar.json", import.meta.url).href +
        "/../",
    });
    this.count = 0;
    this.min = -10;
    this.max = 25;
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      count: { type: Number, reflect: true },
      min: { type: Number, reflect: true },
      max: { type: Number, reflect: true }
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
    /* Base styles for the component */
      :host {
        display: block;
        color: var(--ddd-theme-default-white);
        background-color: var(--ddd-theme-default-nittanyNavy);
        font-family: var(--ddd-font-navigation);
      }
      /* Wrapper for content with spacing and centering */
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        text-align: center;
      }
      /* Counter display with dynamic color based on count value */
      .counter-display {
        font-size: var(--ddd-font-size-xxl);
        font-weight: var(--ddd-font-weight-bold);
        margin: var(--ddd-spacing-4) 0;
        color: var(--ddd-theme-default-white);
      }
      /* Dynamic color changes for specific count values */
      :host([data-color="limit"]) .counter-display {
        color: var(--ddd-theme-default-pughBlue);
      }
      :host([data-color="eighteen"]) .counter-display {
        color: var(--ddd-theme-default-pughBlue);
      }
      :host([data-color="twenty-one"]) .counter-display {
        color: var(--ddd-theme-default-pughBlue);
      }
      /* Title styling */
      .title {
        font-size: var(--ddd-font-size-l);
        font-weight: var(--ddd-font-weight-bold);
        color: var(--ddd-theme-default-pughBlue);
        margin-bottom: var(--ddd-spacing-4);
      }
      /* Controls styling with spacing and button styles */
      .controls {
        display: flex;
        justify-content: center;
        gap: var(--ddd-spacing-4);
        margin-bottom: var(--ddd-spacing-4);
      }
      /* Button styles with hover and disabled states */
      button {
        background-color: var(--ddd-theme-default-beaverBlue);
        color: var(--ddd-theme-default-white);
        border: 2px solid transparent;
        border-radius: var(--ddd-radius-xs);
        font-size: var(--ddd-font-size-l);
        font-weight: var(--ddd-font-weight-bold);
        cursor: pointer;
      }
      /* Hover state for buttons */
      button:hover:not(:disabled) {
        background-color: var(--ddd-theme-default-pughBlue);
      }
      /* Disabled state for buttons */
      button:disabled {
        background-color: var(--ddd-theme-default-gray);
        cursor: not-allowed;
      }
    `];
  }

  // React to changes in the count property to update styles and trigger confetti at 21
  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    if (changedProperties.has("count")) {
      if (this.count === this.min || this.count === this.max) {
        this.setAttribute("data-color", "limit");
      }
      else if (this.count === 18) {
        this.setAttribute("data-color", "eighteen");
      }
      else if (this.count === 21) {
        this.setAttribute("data-color", "twenty-one");
        this.makeItRain();
      }
      else {
        this.removeAttribute("data-color");
      }
    }
  }

  // Dynamically import confetti container and trigger confetti
  makeItRain() {
  import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
    (module) => {
      setTimeout(() => {
        this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
      }, 0);
    }
  );
}

  // Lit render the HTML
  render() {
    return html`
  <confetti-container id="confetti">
    <div class="wrapper">
      ${this.title ? html`<div class="title">${this.title}</div>` : ""}
      <div class="counter-display">${this.count}</div>
      <div class="controls">
        <button @click="${this.decrement}" ?disabled="${this.count === this.min}">-</button>
        <button @click="${this.increment}" ?disabled="${this.count === this.max}">+</button>
      </div>
      <div class="slot-content">
        <slot></slot>
      </div>
    </div>
  </confetti-container>`;
  }

  // Decrement and increment methods with boundary checks
  decrement() {
    if (this.count === this.min) {
      return;
    }
    this.count--;
  }
  increment() {
    if (this.count === this.max) {
      return;
    }
    this.count++;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(CounterAppSp.tag, CounterAppSp);