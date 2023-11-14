import "reflect-metadata";
import { MetadataKeys } from "./metadataKeys";
import { RequestHandler } from "express";

export function use(middleware: RequestHandler) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    const middlewares = Reflect.getMetadata(
      MetadataKeys.middleWare,
      target,
      key
    ) || []

    middlewares.push(middleware)
    Reflect.defineMetadata(MetadataKeys.middleWare , [...middlewares ,  middleware] , target , key)

  };
}
