import express, {Request, Response} from "express";
import { testingRouters } from "./routes/all-deleteRoute";
import { userAuthRouter } from "./routes/auth-routers";
import { blogsRoute } from "./routes/blogs-routes";
import { commentsRoute } from "./routes/comments-routers";
import { postsRoute } from "./routes/posts-routers";
import { userRouter } from "./routes/users-router";

export const app = express()
                   
app.use(express.json());

app.use('/blogs', blogsRoute);
app.use('/posts', postsRoute);
app.use('/auth', userAuthRouter) //регистрация +
//app.use('/login', loginAuthRouter) //ввод логина в свайгере нет но мне кажется так должно быть
app.use('/users', userRouter) //ввод логина в свайгере нет но мне кажется так должно быть
app.use('/testing',testingRouters)
app.use('/comments', commentsRoute)


app.get('/', (req: Request, res: Response) => {
  res.send(`Очень Доброе утро ${new Date().toISOString()}!!!!!`)
})   