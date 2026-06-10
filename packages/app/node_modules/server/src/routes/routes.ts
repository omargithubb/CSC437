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

router.post(
  "/",

  (req: Request, res: Response) => {

    const newRoute = req.body;

    Routes.create(newRoute)

      .then((route: Route) =>

        res.status(201).json(route)

      )

      .catch((err) =>

        res.status(500).send(err)

      );

  }
);

router.put(
  "/:id",

  (req: Request, res: Response) => {

    const id =
      req.params.id as string;

    const updatedRoute =
      req.body;

    Routes.update(
      id,
      updatedRoute
    )

      .then((route) =>

        res.json(route)

      )

      .catch((err) =>

        res.status(404).send(err)

      );

  }
);

router.delete(
  "/:id",

  (req: Request, res: Response) => {

    const id =
      req.params.id as string;

    Routes.remove(id)

      .then(() =>

        res.status(204).end()

      )

      .catch((err) =>

        res.status(404).send(err)

      );

  }
);


export default router;

