import exp from 'express'
import { config } from 'dotenv'
import { connect } from 'mongoose'
import { userApp } from './APIs/userAPI.js'
import { authorApp } from './APIs/authorAPI.js'
import { adminApp } from './APIs/adminAPI.js'
import { commonApp } from './APIs/commonAPI.js'
import cors from "cors";
import CookieParser from 'cookie-parser'
config()
const app = exp()
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}))
//add cookie parser middleware
app.use(CookieParser())
//body parser middleware
app.use(exp.json())

//path level middlewares
app.use("/user-api", userApp);
app.use("/author-api", authorApp);
app.use("/admin-api", adminApp);
app.use("/auth", commonApp);
//connect to database
const connectDB = async () => {
  try {
    await connect(process.env.DB_URL);
    console.log("DB connected ")
    //assign port
    const port = process.env.PORT || 5000
    app.listen(port, () => {
      console.log(`Server listening on ${port}..`)

    });
  }
  catch (err) {
    console.log("err in db connect", err)
  }
};

connectDB();


//to handle invalid path
app.use((req, res, next) => {
  console.log(req.url)
  res.status(404).json({ message: `path ${req.url} is invalid` })
})
//to handle errors
app.use((err, req, res, next) => {
  console.log(err);
  res.status(400).json({ message: "error occured", err: "Server side error" })
})
