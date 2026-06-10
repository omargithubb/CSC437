import { Route }
  from "../models/index.js";

  import {
  Schema,
  model
} from "mongoose";

const RouteSchema =
  new Schema<Route>(
    {

      name: String,

      distance: String

    },

    {
      collection: "routes"
    }
  );
const RouteModel =
  model<Route>(
    "Route",
    RouteSchema
  );

function index(): Promise<Route[]> {

  return RouteModel.find()

    .then((data) => {

      console.log(data);

      return data;

    });

}


function get(id: string): Promise<Route | undefined> {

  return RouteModel.findOne({ id })

    .then((route) => route || undefined);

}

function create(
  json: Route
): Promise<Route> {

  const route =
    new RouteModel(json);

  return route.save();

}

function update(
  id: string,
  route: Route
): Promise<Route | undefined> {

  return RouteModel

    .findByIdAndUpdate(
      id,
      route,
      { new: true }
    )

    .then((updated) => {

      if (!updated)

        throw `${id} not updated`;

      return updated as Route;

    });

}

function remove(
  id: string
): Promise<void> {

  return RouteModel

    .findByIdAndDelete(id)

    .then((deleted) => {

      if (!deleted)

        throw `${id} not deleted`;

    });

}


export default {
  index,
  get,
  create,
  update,
  remove
};