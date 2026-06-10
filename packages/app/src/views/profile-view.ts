import { html, shadow } from "@unbndl/html";

export class ProfileViewElement extends HTMLElement {
  static template = html`
    <template>
      <section class="profile">
        <div class="card profile-card"><h2>Omar Gonzalez</h2></div>
        <div class="card profile-card"><span>Age</span><span>22</span></div>
        <div class="card profile-card"><span>Height</span><span>6'0"</span></div>
        <div class="card profile-card"><span>Fastest Mile</span><span>9 min 52 sec</span></div>
      </section>
    </template>
  `;

  constructor() {
    super();
    shadow(this).template(ProfileViewElement.template);
  }
}