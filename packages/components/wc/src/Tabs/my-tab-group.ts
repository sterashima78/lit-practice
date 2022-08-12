import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { MyTab } from "./my-tab";

/**
 * A tab group element.
 *
 * @slot - contents
 */
@customElement("my-tab-group")
export class MyTabGroup extends LitElement {
  static override styles = css`
    .wrapper {
        min-width: 100%;
    }
    my-tab-panel {
      display: none;
    }
  `;

  switch = (name: string) => {
    const tabPanels = this.querySelectorAll("my-tab-panel");
    tabPanels.forEach((ele) => {
      ele.style["display"] = (ele.name === name) ? "block" : "none";
    });
  };

  init = () => {
    const tab = this.querySelector("my-tab");
    this.switch(tab?.name || "");
  };

  override connectedCallback(): void {
    this.init();
  }

  clickHandler = (ev: Event) => {
    const tab = ev.composedPath().find((ele) => ele instanceof MyTab) as MyTab | undefined;
    if (!tab) return;
    this.switch(tab.name);
  };

  override render = () =>
    html`<div class="wrapper" @click="${this.clickHandler}" @keyPress="${this.clickHandler}"><slot @slotchange=${this.init}></slot></div>`;
}

declare global {
  interface HTMLElementTagNameMap {
    "my-tab-group": MyTabGroup;
  }
}
