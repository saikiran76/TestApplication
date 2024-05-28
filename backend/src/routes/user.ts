import { Hono } from 'hono'
import {PrismaClient} from "@prisma/client/edge"
import {withAccelerate} from "@prisma/extension-accelerate"
import { sign, verify } from 'hono/jwt'


export const userRouter = new Hono<{
    Bindings:{
      DATABASE_URL: string,
      JWT_SECRET: string;
    }
  }>()

userRouter.post("/api/v1/signup", async(c)=>{
const body = await c.req.json()

const prisma = new PrismaClient({ 
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())

try{
    const user = await prisma.user.create({
    data:{
        email: body.email,
        password: body.password,
        name: body.name
    },
    })

    const token = await sign({id: user.id}, c.env.JWT_SECRET)

    return c.text(token);

} catch(e){
    console.log("The error message", e)
} 

// return c.text("Hello hono")
//@ts-ignore
})

userRouter.post("/api/v1/signin", async(c)=>{
const body = await c.req.json();
const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())

try{
    const user = await prisma.user.findFirst({
    where:{
        email:body.email,
        password: body.password,
        name: body.name
    }
    })

    if(!user){
    c.status(403)
    return c.text("User Credentials doesn't match")
    }

    const jwt = await sign({
    id: user.id
    }, c.env.JWT_SECRET)

    return c.text(jwt)

} catch(e){
    return c.text("Either User already registered or internal error")

}

})