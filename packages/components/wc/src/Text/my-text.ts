import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

/**
 * A text element.
 *
 * @slot - main contents
 */
@customElement("my-text")
export class MyText extends LitElement {
  override render() {
    return html`
        <p><slot></slot></p>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-text": MyText;
  }
}
