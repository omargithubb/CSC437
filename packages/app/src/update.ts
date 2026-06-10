import { Route } from "server/models";
import { Model } from "./model.ts";
import { Msg } from "./messages.ts";

export type Cmd =
  | ["routes/load", { routes: Route[] }]
  | ["route/updated", { route: Route }];

export default function update(
  model: Readonly<Model>,
  message: Msg | Cmd,
  user: any
): any {
  const [type, payload, callbacks] = message as [string, any, any];

  switch (type) {
    case "routes/request":
      if (model.routes) break;
      return [{ ...model }, fetchRoutes(user)];

    case "routes/load":
      return { ...model, routes: payload.routes };

    case "route/edit":
      return { ...model, editing: payload.route };

    case "route/save":
      return [{ ...model }, saveRoute(payload, user, callbacks)];

    case "route/updated": {
      const updated = model.routes?.map(r =>
        r._id === payload.route._id ? payload.route : r
      );
      return { ...model, routes: updated, editing: undefined };
    }
    case "route/edit":
  return { ...model, editing: payload.route };

    default:
      const unhandled: never = type as never;
      throw new Error(`Unhandled message: "${unhandled}"`);
  }

  return model;
}

function fetchRoutes(user: any): Promise<Cmd> {
  const headers: Record<string, string> = user?.token
    ? { Authorization: `Bearer ${user.token}` }
    : {};

  return fetch("/api/routes", { headers })
    .then(res => {
      if (res.status === 200) return res.json();
      throw "No response from server";
    })
    .then(json => {
      return ["routes/load", { routes: json }] as unknown as Cmd;
    });
}

function saveRoute(
  payload: { route: Route },
  user: any,
  callbacks: { onSuccess?: () => void; onFailure?: (err: Error) => void }
): Promise<Cmd> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {})
  };

  return fetch(`/api/routes/${payload.route._id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(payload.route)
  })
    .then(res => {
      if (res.status === 200) return res.json();
      throw new Error(`Failed to save route: ${res.status}`);
    })
    .then(json => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
      return ["route/updated", { route: json }] as unknown as Cmd;
    })
    .catch(err => {
      if (callbacks?.onFailure) callbacks.onFailure(err);
      throw err;
    });
}