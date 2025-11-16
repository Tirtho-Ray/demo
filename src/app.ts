import express, { NextFunction, type Request, type Response } from "express"
import cors from "cors"
import router from "./app/router";

const app = express();

app.use(express.json())

app.get("/",(req:Request,res:Response) =>{
    res.send({
        message:"this is main get route"
    })
} );


app.use('/api/v1',router)


app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        message: "route not found"
    });
});


export default app;