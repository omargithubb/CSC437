import { Route } from "server/models";

export type Msg =
  | ["routes/request"]
  | ["routes/load", { routes: Route[] }]
  | ["route/edit", { route: Route }]
  | ["route/save", { route: Route }, {
      onSuccess?: () => void;
      onFailure?: (err: Error) => void;
    }];