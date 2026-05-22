import { Route } from "../models/index.js";
declare function index(): Promise<Route[]>;
declare function get(id: string): Promise<Route | undefined>;
declare const _default: {
    index: typeof index;
    get: typeof get;
};
export default _default;
