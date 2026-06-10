import { Route } from "server/models";

export interface Model {
  routes?: Route[];
  editing?: Route;
}

export const init: Model = {};