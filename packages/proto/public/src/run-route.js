import { html, css, shadow } from "@unbndl/html";

export class RunRouteElement extends HTMLElement {


  static template = html`

    <template>

      <div class="card">

        <div class="route-name">
          <slot></slot>
        </div>

        <div class="route-distance"></div>

      </div>

    </template>

  `;


  static styles = css`

    :host {
      display: block;
      width: 100%;
    }

    * {
      margin: 0;
      box-sizing: border-box;
    }

    .card {

      display: flex;

      justify-content: space-between;

      align-items: center;

      width: 100%;


      padding: var(--space-md);

      background-color: var(--color-gray);

      border: 2px solid black;

      color: var(--color-primary);

      margin-bottom: var(--space-md);


    }

    .route-name {
      font-weight: 600;
    }

  `;

  static observedAttributes = ["distance"];


  constructor() {

    super();

    shadow(this)
      .template(RunRouteElement.template)
      .styles(RunRouteElement.styles);

  }


  connectedCallback() {

    this.updateDistance();

  }


  attributeChangedCallback() {

    this.updateDistance();

  }


  updateDistance() {

    if (!this.shadowRoot) return;

    const distanceElement =
      this.shadowRoot.querySelector(".route-distance");

    if (!distanceElement) return;

    distanceElement.textContent =
      this.getAttribute("distance");

  }

}