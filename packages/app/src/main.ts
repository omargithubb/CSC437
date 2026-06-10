import { define, html } from "@unbndl/html";
import { Auth } from "@unbndl/auth";
import { Store } from "@unbndl/store";
import { BrowserHistory, Switch } from "@unbndl/switch";
import { HeaderElement } from "./components/app-header.ts";
import { HomeViewElement } from "./views/home-view.ts";
import { RoutesViewElement } from "./views/routes-view.ts";
import { ProfileViewElement } from "./views/profile-view.ts";
import { TrackViewElement } from "./views/track-view.ts";
import { LeaderboardViewElement } from "./views/leaderboard-view.ts";
import { Model, init } from "./model.ts";
import { Msg } from "./messages.ts";
import { Cmd } from "./update.ts";
import update from "./update.ts";

const routes = [
  {
    path: "/app/routes",
    view: html`<routes-view></routes-view>`
  },
  {
    path: "/app/profile",
    view: html`<profile-view></profile-view>`
  },
  {
    path: "/app/track",
    view: html`<track-view></track-view>`
  },
  {
    path: "/app/leaderboard",
    view: html`<leaderboard-view></leaderboard-view>`
  },
  {
    path: "/app/",
    view: html`<home-view></home-view>`
  },
  {
    path: "/app",
    view: html`<home-view></home-view>`
  },
  {
    path: "/",
    redirect: "/app"
  }
];

define({
  "auth-provider": Auth.Provider,
  "history-provider": BrowserHistory.Provider,
  "app-header": HeaderElement,
  "home-view": HomeViewElement,
  "routes-view": RoutesViewElement,
  "profile-view": ProfileViewElement,
  "track-view": TrackViewElement,
  "leaderboard-view": LeaderboardViewElement,

  "store-provider": class AppStore extends Store.Provider<Model, Msg, Cmd> {
    constructor() {
      super(update, init);
    }
  },

  "router-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes as any);
    }
  }
});