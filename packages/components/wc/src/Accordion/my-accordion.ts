import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";

/**
 * An accordion element.
 *
 * @slot - main contents
 * @slot header - header contents
 */
@customElement("my-accordion")
export class MyAccordion extends LitElement {
  static override styles = css`
    :host {
      width: 100%;
      height: auto;
    }
    .accordion {
        background-color: #eee;
        color: #444;
        cursor: pointer;
        padding: 18px;
        width: 100%;
        text-align: left;
        border: none;
        outline: none;
        transition: 0.4s;
    }

    .active, .accordion:hover {
        background-color: #ccc;
    }

    .panel {
        padding: 0 18px;
        background-color: white;
        display: none;
        overflow: hidden;
    }`;

  @property({ type: Boolean, attribute: "is-open" })
  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      /** @type {CustomEvent<void>} open - 開いたとき */
      this.dispatchEvent(new CustomEvent("open"));
    } else {
      /** @type {CustomEvent<void>} close - 閉じたとき */
      this.dispatchEvent(new CustomEvent("close"));
    }
    /** @type {CustomEvent<{ isOpen: boolean}>} toggle - 開閉したとき */
    this.dispatchEvent(
      new CustomEvent("toggle", {
        detail: {
          isOpen: this.isOpen,
        },
      }),
    );
  }

  override render = () =>
    html`
        <button 
          @click="${this.toggle}" 
          class="accordion 
          ${classMap({ active: this.isOpen })}"
          aria-expanded="${this.isOpen}"
          aria-controls="contents"
          id="header"
        >
            <slot name="header"></slot>
        </button>
        <div 
          class="panel" 
          style="${styleMap({ display: this.isOpen ? "block" : "none" })}"
          id="contents"
          role="region"
          aria-labelledby="header"
          aria-label="contents"
        >
            <slot></slot>
        </div>`;
}

declare global {
  interface HTMLElementTagNameMap {
    "my-accordion": MyAccordion;
  }
}
