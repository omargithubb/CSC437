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
router.post("/", (req, res) => {
    const newRoute = req.body;
    Routes.create(newRoute)
        .then((route) => res.status(201).json(route))
        .catch((err) => res.status(500).send(err));
});
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const updatedRoute = req.body;
    Routes.update(id, updatedRoute)
        .then((route) => res.json(route))
        .catch((err) => res.status(404).send(err));
});
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    Routes.remove(id)
        .then(() => res.status(204).end())
        .catch((err) => res.status(404).send(err));
});
export default router;
