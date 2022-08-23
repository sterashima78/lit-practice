import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";


const toggle = (dispatch: (c: CustomEvent) => void, isOpen: boolean) => {
  const open = !isOpen
  if (open) {
    dispatch(new CustomEvent("open"));
  } else {
    dispatch(new CustomEvent("close"));
  }
  dispatch(
    new CustomEvent("toggle", {
      detail: {
        isOpen: open,
      },
    }),
  );
  return open
}


if (import.meta.vitest) {
  const { describe, test, expect, vi } = import.meta.vitest
  describe('MyAccordion', () => {
    describe('toggle function', () => {
      test("to open", ()=> {
        const dispatch = vi.fn()
        expect(toggle(dispatch, false)).toBeTruthy()
        expect(dispatch.mock.calls[0]?.[0].type).toEqual("open")
        expect(dispatch.mock.calls[0]?.[0].detail).toEqual(null)
        expect(dispatch.mock.calls[1]?.[0].type).toEqual("toggle")
        expect(dispatch.mock.calls[1]?.[0].detail).toEqual({ isOpen: true })
      })

      test("to close", ()=> {
        const dispatch = vi.fn()
        expect(toggle(dispatch, true)).toBeFalsy()
        expect(dispatch.mock.calls[0]?.[0].type).toEqual("close")
        expect(dispatch.mock.calls[0]?.[0].detail).toEqual(null)
        expect(dispatch.mock.calls[1]?.[0].type).toEqual("toggle")
        expect(dispatch.mock.calls[1]?.[0].detail).toEqual({ isOpen: false })
      })
    })
  })
}


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

  /**
   * アコーディオンが開いている状態であるか否かを示す
   */
  @property({ type: Boolean, attribute: "is-open" })
  isOpen = false;

  toggle() {
    /** @type {CustomEvent<void>} open - 開いたとき */
    /** @type {CustomEvent<void>} close - 閉じたとき */
    /** @type {CustomEvent<{ isOpen: boolean }>} toggle - 開閉したとき */
    this.isOpen = toggle((c)=> this.dispatchEvent(c), this.isOpen)
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

if (import.meta.vitest) {
  /**
   * @vitest-environment happy-dom
   */

  const { describe, test, expect, vi } = import.meta.vitest
  describe('MyAccordion', () => {
    test('toggle', () => {
      const accordion = new MyAccordion()
      const dispatchEvent = vi.spyOn(accordion, "dispatchEvent")
      expect(accordion.isOpen).toBeFalsy()
      expect(dispatchEvent).not.toBeCalled()
      dispatchEvent.mockClear()
      accordion.toggle()
      expect(dispatchEvent.mock.calls[0]?.[0]?.type).toEqual("open")
      expect((dispatchEvent.mock.calls[0]?.[0] as any).detail).toEqual(null)
      expect(dispatchEvent.mock.calls[1]?.[0]?.type).toEqual("toggle")
      expect((dispatchEvent.mock.calls[1]?.[0] as any).detail).toEqual({ isOpen: true })

      expect(accordion.isOpen).toBeTruthy()
      dispatchEvent.mockClear()
      accordion.toggle()
      expect(dispatchEvent.mock.calls[0]?.[0]?.type).toEqual("close")
      expect((dispatchEvent.mock.calls[0]?.[0] as any).detail).toEqual(null)
      expect(dispatchEvent.mock.calls[1]?.[0]?.type).toEqual("toggle")
      expect((dispatchEvent.mock.calls[1]?.[0] as any).detail).toEqual({ isOpen: false })

      expect(accordion.isOpen).toBeFalsy()
    })
  })
}

declare global {
  interface HTMLElementTagNameMap {
    "my-accordion": MyAccordion;
  }
}
