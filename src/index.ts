
import dotenv from 'dotenv'
import { runDB } from './repositories/db';
import { app } from './app';

dotenv.config()

const port = process.env.port || 3003 //const port = process.env.port || 3003


  
const startApp = async () =>{
  await runDB()
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}
startApp ()

