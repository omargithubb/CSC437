import { css, html, shadow } from "@unbndl/html";
import { createViewModel } from "@unbndl/view";
import { fromStore } from "@unbndl/store";
import { Route } from "server/models";
import { Model } from "../model.ts";

export class RoutesViewElement extends HTMLElement {

  viewModel = createViewModel<{ routes?: Route[]; editing?: Route }>({
    routes: undefined,
    editing: undefined
  }).with(fromStore<Model>(this), "routes", "editing");

  constructor() {
    super();
    shadow(this).styles(RoutesViewElement.styles);

    this.viewModel.createEffect(($: any) => {
      if ($.editing) {
        shadow(this).replace(this.renderForm($.editing));
      } else {
        shadow(this).replace(RoutesViewElement.renderList($.routes));
      }
    });

    shadow(this).listen({
      submit: (ev: Event) => this.handleSubmit(ev)
    });
    shadow(this).delegate(".edit-btn", {
  click: (ev: Event) => {
    const btn = ev.target as HTMLElement;
    const id = btn.getAttribute("data-id");
    const routes = (this.viewModel.toObject() as any).routes as Route[];
    const route = routes?.find(r => r._id === id);
    if (route) {
      this.dispatchEvent(new CustomEvent("store:message", {
        bubbles: true,
        composed: true,
        detail: ["route/edit", { route }]
      }));
    }
  }
});

shadow(this).delegate(".cancel", {
  click: () => {
    this.dispatchEvent(new CustomEvent("store:message", {
      bubbles: true,
      composed: true,
      detail: ["route/edit", { route: undefined }]
    }));
  }
});
  }

  connectedCallback() {
    this.dispatchEvent(new CustomEvent("store:message", {
      bubbles: true,
      composed: true,
      detail: ["routes/request"]
    }));
  }

  handleSubmit(ev: Event) {
    ev.preventDefault();
    const form = ev.target as HTMLFormElement;
    const inputs = Array.from(form.elements).filter(
      el => "name" in el && (el as HTMLInputElement).name
    ) as HTMLInputElement[];
    const entries = inputs.map(el => [el.name, el.value]);
    const data = Object.fromEntries(entries);

    const editing = (this.viewModel.toObject() as any).editing;
    if (editing) {
      this.dispatchEvent(new CustomEvent("store:message", {
        bubbles: true,
        composed: true,
        detail: [
          "route/save",
          { route: { ...editing, ...data } },
          { onSuccess: () => console.log("Route saved!") }
        ]
      }));
    }
  }

  renderForm(route: Route) {
    return html`
      <section class="edit-form">
        <h2>Edit Route</h2>
        <form>
          <label>
            Name
            <input name="name" value=${route.name} />
          </label>
          <label>
            Distance
            <input name="distance" value=${route.distance} />
          </label>
          <button type="submit">Save</button>
          <button type="button" class="cancel">Cancel</button>
        </form>
      </section>
    `;
  }

  static renderList(routes: Route[] | undefined) {
    const list = routes || [];
    return html`
      <section class="list">
        ${list.map(r => html`
          <div class="card route-card">
            <span class="route-name">${r.name}</span>
            <span class="route-distance">${r.distance}</span>
            <button class="edit-btn" data-id=${r._id || ""}>Edit</button>          </div>
        `)}
      </section>
    `;
  }

  static styles = css`
    .list { display: flex; flex-direction: column; gap: 1rem; }
    .route-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
    }
    .edit-form form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
    }
    label {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    input { padding: 0.5rem; }
    button { padding: 0.5rem 1rem; cursor: pointer; }
  `;
}