import express from "express";
import Routes from "../services/route-svc.js";
const router = express.Router();
router.get("/", (_, res) => {
    Routes.index()
        .then((list) => res.send(list))
        .catch((err) => res.status(500).send(err));
});
router.get("/:id", (req, res) => {
    const id = req.params.id;
    Routes.get(id)
        .then((route) => {
        if (!route) {
            res.status(404).send();
        }
        else {
            res.send(route);
        }
    })
        .catch((err) => res.status(500).send(err));
});
export default router;
