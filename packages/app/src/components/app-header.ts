import { css, html, shadow } from "@unbndl/html";
import { createViewModel } from "@unbndl/view";
import { fromAuth } from "@unbndl/auth";

export class HeaderElement extends HTMLElement {

  viewModel = createViewModel({
    authenticated: false,
    username: ""
  }).with(fromAuth(this), "authenticated", "username");

  view = html`
    <header>
      <h2>Activity Tracker</h2>
      <nav class=${($: any) => $.authenticated ? "logged-in" : "logged-out"}>
        <p>Hello, ${($: any) => $.username || "traveler"}</p>
        <menu>
          <li class="when-signed-in">
            <button class="signout">Sign Out</button>
          </li>
          <li class="when-signed-out">
            <a href="/login.html">Sign In</a>
          </li>
        </menu>
      </nav>
    </header>
  `;

  constructor() {
    super();
    shadow(this)
      .styles(HeaderElement.styles)
      .replace(this.viewModel.render(this.view))
      .delegate(".signout", {
        click: () => this.signout()
      });
  }

  signout() {
    this.dispatchEvent(new CustomEvent("auth:message", {
      bubbles: true,
      composed: true,
      detail: ["auth/signout"]
    }));
  }

  static styles = css`
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid #ccc;
    }
    menu { list-style: none; padding: 0; margin: 0; }
    li { display: none; }
    .logged-in .when-signed-in,
    .logged-out .when-signed-out { display: block; }
    button, a { padding: 0.5rem 1rem; cursor: pointer; }
  `;
}