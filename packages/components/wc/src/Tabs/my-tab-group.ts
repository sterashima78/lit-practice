import { css, html, LitElement } from "lit";
import { customElement, queryAssignedElements } from "lit/decorators.js";
import { MyTab } from "./my-tab";
import type { MyTabPanel } from "./my-tab-panel.js";

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

  @queryAssignedElements({ selector: "my-tab" })
  tabs!: Array<MyTab>;

  @queryAssignedElements({ selector: "my-tab-panel" })
  tabPanels!: Array<MyTabPanel>;

  switch = (name: string) => {
    this.tabPanels.forEach((ele) => {
      ele.style["display"] = (ele.name === name) ? "block" : "none";
    });
  };

  init = () => {
    if (this.tabs.length === 0) {
      return setTimeout(() => {
        this.init();
      }, 100);
    }
    this.switch(this.tabs[0]?.name || "");
    return;
  };

  override connectedCallback(): void {
    super.connectedCallback();
    this.init();
  }

  clickHandler = (ev: Event) => {
    const tab = ev.composedPath().find((ele) => ele instanceof MyTab) as MyTab | undefined;
    if (!tab) return;
    this.switch(tab.name);
  };

  override render = () =>
    html`<div class="wrapper" @click="${this.clickHandler}"><slot @slotchange=${this.init}></slot></div>`;
}

declare global {
  interface HTMLElementTagNameMap {
    "my-tab-group": MyTabGroup;
  }
}
