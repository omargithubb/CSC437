import { Route } from "server/models";
import { Model } from "./model.ts";
import { Msg } from "./messages.ts";
export type Cmd = ["routes/load", {
    routes: Route[];
}];
export default function update(model: Readonly<Model>, message: Msg | Cmd, user: any): any;
