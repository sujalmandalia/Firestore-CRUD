import  express  from "express";
import userRoutes from "./users/routes"
import ErrorHandler from "./utils/customErrorHandler";
import { errorMiddleware } from "./middleware/errorMiddleware";
const app = express()

const PORT = process.env.PORT||3000
app.use(express.json())

app.use("/api/v1/users",userRoutes)

app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`)
})

app.use((req, res, next) => {
  next(new ErrorHandler("Page Not Found", 404))
});

// global error handler
app.use(errorMiddleware);