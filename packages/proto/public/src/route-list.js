import {
  html,
  css,
  shadow
} from "@unbndl/html";

import {
  fromAuth
} from "@unbndl/auth";

import {
  createViewModel
} from "@unbndl/view";

export class RouteListElement
  extends HTMLElement {

  viewModel = createViewModel({

    authenticated: false,

    token: undefined,

    routes: []

  }).with(
    fromAuth(this),
    "authenticated",
    "token"
  );

  constructor() {

    super();

    shadow(this)
      .styles(RouteListElement.styles);

    this.viewModel.createEffect(($) => {

      const src =
        this.getAttribute("src");

      if ($.authenticated && src) {

        this.hydrate(src)

          .then((data) => {

            const view =
              RouteListElement.render(data);

            shadow(this).replace(view);

          });

      }

    });

  }

  get authorization() {

    const $ =
      this.viewModel.toObject();

    if ($.authenticated) {

      return {

        Authorization:
          `Bearer ${$.token}`

      };

    }

    return {};

  }

  hydrate(src) {

    return fetch(src, {

      headers:
        this.authorization

    })

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

    const routes = data || [];

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