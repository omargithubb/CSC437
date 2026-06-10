import { html, shadow } from "@unbndl/html";

export class TrackViewElement extends HTMLElement {
  static template = html`
    <template>
      <section class="track-container">
        <div class="card track-card">
          <h2>Start a Run</h2>
          <button class="track-btn">Start Tracking</button>
        </div>
      </section>
    </template>
  `;

  constructor() {
    super();
    shadow(this).template(TrackViewElement.template);
  }
}