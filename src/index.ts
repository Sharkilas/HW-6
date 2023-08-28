import express, {Response, Request} from 'express';
import dotenv from 'dotenv'
import { blogsRoute } from './routes/blogs-routes';
import { postsRoute } from './routes/posts-routers';
import { testingRouters } from './routes/all-deleteRoute';
import { runDB } from './repositories/db';
import { userAuthRouter} from './routes/auth-routers';
import { loginAuthRouter } from './routes/loginAuth-router';
import { userRouter } from './routes/users-router';


export const app = express()
const port = process.env.port || 3003 //const port = process.env.port || 3003
dotenv.config()
                   
app.use(express.json());



app.use('/blogs', blogsRoute);
app.use('/posts', postsRoute);
app.use('/auth', userAuthRouter) //регистрация +
//app.use('/login', loginAuthRouter) //ввод логина в свайгере нет но мне кажется так должно быть
app.use('/users', userRouter) //ввод логина в свайгере нет но мне кажется так должно быть
app.use('/testing',testingRouters)


app.get('/', (req: Request, res: Response) => {
  res.send(`Очень Доброе утро ${new Date().toISOString()}!!!!!`)
})    


  
const startApp = async () =>{
  await runDB()
  app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  })
}
startApp ()

