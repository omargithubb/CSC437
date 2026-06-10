import { css, html, shadow } from "@unbndl/html";
import { createViewModel, fromInputs } from "@unbndl/view";

export class LoginFormElement extends HTMLElement {

    viewModel = createViewModel<{ username: string; password: string }>({
    username: "",
    password: ""
    }).with(fromInputs(this) as any, "username", "password");

  view = html`
    <form>
      <slot></slot>
      <button type="submit">
        <slot name="submit-label">Login</slot>
      </button>
    </form>
  `;

  constructor() {
    super();
    shadow(this)
      .styles(LoginFormElement.styles)
      .replace(this.viewModel.render(this.view as any))      
      .listen({
        submit: (ev: Event) =>
          this.submitLogin(ev, this.getAttribute("api") || "#")
      });
  }

  submitLogin(event: Event, endpoint: string) {
    event.preventDefault();
    const data = this.viewModel.toObject();
    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.status !== 200) throw `Login failed: ${res.status}`;
        return res.json();
      })
      .then(json => {
        const { token } = json;
        this.dispatchEvent(new CustomEvent("auth:message", {
          bubbles: true,
          composed: true,
          detail: ["auth/signin", { token, redirect: "/app" }]
        }));
      })
      .catch(err => console.log(err));
  }

  static styles = css`
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    button {
      padding: 0.5rem;
      cursor: pointer;
    }
  `;
}