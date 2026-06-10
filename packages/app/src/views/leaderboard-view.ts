import { html, shadow } from "@unbndl/html";

export class LeaderboardViewElement extends HTMLElement {
  static template = html`
    <template>
      <section>
        <h2>Leaderboard</h2>
        <p>Coming soon.</p>
      </section>
    </template>
  `;

  constructor() {
    super();
    shadow(this).template(LeaderboardViewElement.template);
  }
}