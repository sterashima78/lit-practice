import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * A tab panel element.
 *
 * @slot - contens
 */
@customElement("my-tab-panel")
export class MyTabPanel extends LitElement {
  static override styles = css`
  `;

  @property({ type: String, attribute: "name" })
  name = "";

  override render = () => html`<div><slot></slot></div>`;
}

declare global {
  interface HTMLElementTagNameMap {
    "my-tab-panel": MyTabPanel;
  }
}
