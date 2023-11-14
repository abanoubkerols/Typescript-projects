import "reflect-metadata";
import { AppRoute } from "../../appRouter";
import { methods } from "./methods";
import { MetadataKeys } from "./metadataKeys";
import { NextFunction, RequestHandler, Request, Response } from "express";

function bodyValidators(keys: string): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send("Invalid Request");
      return;
    }

    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send("Invalid Request");
        return;
      }
    }
    next();
  };
}

export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRoute.getInstance();
    Object.getOwnPropertyNames(target.prototype).forEach((key) => {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key
      );
      const method: methods = Reflect.getMetadata(
        MetadataKeys.Method,
        target.prototype,
        key
      );
      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleWare, target.prototype, key) ||
        [];

      const required = Reflect.getMetadata(
        MetadataKeys.validator,
        target.prototype,
        key
      ) || []

      const validator = bodyValidators(required)

      if (path) {
        router[method](`${routePrefix}${path}`, ...middlewares, validator,  routeHandler);
      }
    });
  };
}
