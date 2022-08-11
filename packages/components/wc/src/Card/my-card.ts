import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

/**
 * An card element.
 *
 * @slot - main contents
 * @slot header - header contents
 */
@customElement("my-card")
export class MyCard extends LitElement {
  static override styles = css`
    :host {
      width: 100%;
      height: auto;
    }
    .card{
        width: 100%;
        height: 100%;
    }
    .card__imgframe{
        width: 100%;
        height: auto;
        padding-top: 56.25%;
        background: url(https://placehold.jp/640x360.png) no-repeat center;
        background-size: cover;
        box-sizing: border-box;
    }
    .card__textbox{
        width: 100%;
        height: auto;
        padding: calc(var(--spacing-md) * 1px);
        background: var(--colors-white);
        box-sizing: border-box;
    }
    .card__textbox > * + *{
        margin-top: calc(var(--spacing-sm) * 1px);
    }
    .card__titletext{
        font-size: var(--font-sizes-h2);
        font-weight: var(--font-weights-heading-bold);
        line-height: var(--line-heights-heading);
    }
    .card__overviewtext{
        font-size: calc(var(--font-sizes-sm) * 1px);
        line-height: calc(var(--line-heights-body) * 1px);
    }
    .card-skin{
        overflow: hidden;
        border-radius: calc(var(--border-radius-lg) * 1px);
        box-shadow: 0 4px 15px rgba(0,0,0,.2);
    }
  `;

  override render() {
    return html`
        <div class="card card-skin">
            <div class="card__imgframe"></div>
            <div class="card__textbox">
                <div class="card__titletext">
                    <slot name="header"></slot>
                </div>
                <div class="card__overviewtext">
                    <slot></slot>
                </div>
            </div>
        </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-card": MyCard;
  }
}
