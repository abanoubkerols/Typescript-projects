import 'reflect-metadata'
import { methods } from './methods'
import { MetadataKeys } from './metadataKeys'
import { RequestHandler } from 'express'


interface RouteDescriptor extends PropertyDescriptor{
    value?: RequestHandler 

}


function routeBinder(method :string){
    return function get(path :string){
        return function(target : any , key :string , desc :RouteDescriptor){
            Reflect.defineMetadata(MetadataKeys.path ,  path , target ,key)
            Reflect.defineMetadata(MetadataKeys.Method , method , target ,key)

        }
    }
}



export const get = routeBinder(methods.get)
export const post = routeBinder(methods.post)
export const put = routeBinder(methods.put)
export const patch = routeBinder(methods.patch)
export const del = routeBinder(methods.del)