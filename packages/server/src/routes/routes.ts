import express, { Request, Response } from "express";

import { Route } from "../models";

import Routes from "../services/route-svc.ts";

const router = express.Router();


router.get("/", (_, res: Response) => {

  Routes.index()

    .then((list: Route[]) => res.send(list))

    .catch((err) => res.status(500).send(err));

});


router.get("/:id", (req: Request, res: Response) => {

    const id = req.params.id as string;

    Routes.get(id)

    .then((route: Route | undefined) => {

      if (!route) {

        res.status(404).send();

      } else {

        res.send(route);

      }

    })

    .catch((err) => res.status(500).send(err));

});


export default router;

