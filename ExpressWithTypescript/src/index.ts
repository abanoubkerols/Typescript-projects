import express from "express";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";
import './controllers/loginController'
import { AppRoute } from "./appRouter";
import './controllers/rootController'
const app = express();
app.use(bodyParser.urlencoded({extended :true}))
app.use(cookieSession({keys : ['go']}))



app.use(AppRoute.getInstance())



app.listen(3000, () => {
  console.log("the app work");
});

    