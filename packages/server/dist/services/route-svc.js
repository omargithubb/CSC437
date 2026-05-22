import { Schema, model } from "mongoose";
const RouteSchema = new Schema({
    name: String,
    distance: String
}, {
    collection: "routes"
});
const RouteModel = model("Route", RouteSchema);
function index() {
    return RouteModel.find()
        .then((data) => {
        console.log(data);
        return data;
    });
}
function get(id) {
    return RouteModel.findOne({ id })
        .then((route) => route || undefined);
}
export default { index, get };
