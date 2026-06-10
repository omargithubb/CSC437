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
function create(json) {
    const route = new RouteModel(json);
    return route.save();
}
function update(id, route) {
    return RouteModel
        .findByIdAndUpdate(id, route, { new: true })
        .then((updated) => {
        if (!updated)
            throw `${id} not updated`;
        return updated;
    });
}
function remove(id) {
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
