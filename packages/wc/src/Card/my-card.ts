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
        padding: 20px 18px;
        background: #ffffff;
        box-sizing: border-box;
    }
    .card__textbox > * + *{
        margin-top: 10px;
    }
    .card__titletext{
        font-size: 20px;
        font-weight: bold;
        line-height: 125%;
    }
    .card__overviewtext{
        font-size: 12px;
        line-height: 150%;
    }
    .card-skin{
        overflow: hidden;
        border-radius: 8px;
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
