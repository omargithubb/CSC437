import { Route } from "../models/index.js";
declare function index(): Promise<Route[]>;
declare function get(id: string): Promise<Route | undefined>;
declare function create(json: Route): Promise<Route>;
declare function update(id: string, route: Route): Promise<Route | undefined>;
declare function remove(id: string): Promise<void>;
declare const _default: {
    index: typeof index;
    get: typeof get;
    create: typeof create;
    update: typeof update;
    remove: typeof remove;
};
export default _default;
