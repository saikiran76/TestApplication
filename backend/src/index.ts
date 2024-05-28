import { Hono } from 'hono'
import {userRouter} from "../src/routes/user"
import {blogRouter} from "../src/routes/blog"
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings:{
    DATABASE_URL: string,
    JWT_SECRET: string;
  }
}>()

app.use('/*', cors())
app.route("/api/v1/user", userRouter)
app.route("/api/v1/blog", blogRouter)
// app.use('/api/blog/*', async(c, next)=>{
//   /**
//    * get the header 
//    * verify the header
//    *          -- if the header is correct => control goes to the function
//    *          -- else return unauthorized acces with 403 status
//    */
//   const header = c.req.header("authorization") || "";
//   // Bearer token ["Bearer", "token"] => "Bearer" 0, "token" 1 (value, index) in array
//   const token = header.split(" ")[1]

//   //@ts-ignore
//   const response = await verify(header, c.env.JWT_SECRET)
//   if(response.id){
//     next()
//   } else {
//     return c.json({ error:"unauthorized buddy" })
//   }
// })

// app.use('/*', cors())



// c- context has your request, response
export default app
