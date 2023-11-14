import express from 'express'


export class AppRoute {
    private static instance : express.Router
    static getInstance() : express.Router{
        if(!AppRoute.instance){
            AppRoute.instance = express.Router()
        }

        return AppRoute.instance

    }
}