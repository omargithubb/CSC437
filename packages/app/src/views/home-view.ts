import { css, html, shadow } from "@unbndl/html";

export class HomeViewElement extends HTMLElement {
  static template = html`
    <template>
      <section class="nav-grid">
        <a class="card" href="/app/track">
          <span>Track</span>
        </a>
        <a class="card" href="/app/profile">
          <span>Profile</span>
        </a>
        <a class="card" href="/app/routes">
          <span>Routes</span>
        </a>
        <a class="card" href="/app/leaderboard">
          <span>Leaderboard</span>
        </a>
      </section>
    </template>
  `;

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .nav-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      padding: 1rem;
    }

    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background-color: var(--color-gray, #f0f0f0);
      border: 2px solid black;
      text-decoration: none;
      color: var(--color-primary, black);
      font-weight: 600;
      font-size: 1.2rem;
    }

    .card:hover {
      background-color: var(--color-accent, #ddd);
    }
  `;

  constructor() {
    super();
    shadow(this)
      .template(HomeViewElement.template)
      .styles(HomeViewElement.styles);
  }
}