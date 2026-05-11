import { html, css, shadow } from "@unbndl/html";

export class RouteListElement extends HTMLElement {

  constructor() {

    super();

    shadow(this)
      .styles(RouteListElement.styles);

  }

  static observedAttributes = ["src"];

  attributeChangedCallback(name, _, newValue) {

    if (name === "src") {

      this.hydrate(newValue)
        .then((data) => {

          const view =
            RouteListElement.render(data);

          shadow(this).replace(view);

        });

    }

  }


  hydrate(src) {

    return fetch(src)

      .then((response) => {

        if (response.status !== 200) {

          throw `HTTP Error ${response.status}`;

        }

        return response.json();

      })

      .catch((error) => {

        console.log(
          `Could not fetch ${src}:`,
          error
        );

      });

  }


  static render(data) {

    const routes = data?.routes || [];

    return html`

      <section class="list">

        ${routes.map(renderRoute)}

      </section>

    `;

  }

  static styles = css`

  :host {

    grid-column: span 12;

    width: 100%;

    display: block;

  }

  .list {

    display: flex;

    flex-direction: column;

    gap: var(--space-md);

    width: 100%;

  }

`;

}


function renderRoute(route) {

  const { name, distance } = route;

  return html`

    <run-route distance=${distance}>

      ${name}

    </run-route>

  `;

}