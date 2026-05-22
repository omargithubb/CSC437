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


export default { index, get };