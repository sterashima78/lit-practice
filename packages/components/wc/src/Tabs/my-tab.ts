import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * A tab element.
 *
 * @slot - contents
 */
@customElement("my-tab")
export class MyTab extends LitElement {
  static override styles = css`
  `;

  @property({ type: String, attribute: "name" })
  name = "";

  override render = () => html`<button><slot></slot></button>`;
}

declare global {
  interface HTMLElementTagNameMap {
    "my-tab": MyTab;
  }
}
