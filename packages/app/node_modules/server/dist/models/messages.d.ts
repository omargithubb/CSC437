import { Route } from "server/models";
export type Msg = ["routes/request"] | ["routes/load", {
    routes: Route[];
}];
