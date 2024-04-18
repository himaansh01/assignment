const express= require("express");
const router = express.Router();
const zod = require("zod");
const {User} = require("./db")
const jwt=require("jsonwebtoken");
const {JWT_SECRET}=require("./config");
const { authMiddleware } = require("./middleware");

const signupSchema = zod.object({
    username:zod.string().email(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
})



router.post("/signup", async(req,res)=>{
    const {success}= signupSchema.safeParse(req.body);
    if (!success){
        return res.json({
            message: "incorrect inputs"
        });
    }
    const existingUser = await User.findOne({
        username:req.body.username
    })

    if(existingUser){
        return res.json({
            message:"email already taken"
        });
    }
    const user= await User.create({
        username:req.body.username,
        password:req.body.password,
        firstName:req.body.firstName,
        lastName:req.body.lastName
    });


    const userId=user._id;

    const token = jwt.sign({
        userId
    },JWT_SECRET);
    
    res.json({
        message:"user created successfully",
        token:token
    });
})



const signinSchema=zod.object({
    username:zod.string().email(),
    password:zod.string()
})



router.post("/signin",async (req,res)=>{
    const {success} = signinSchema.safeParse(req.body);
    if(!success){
        return res.json({
            message:"incorrect inputs"
        })
    }
    const user = await User.findOne({
        username:req.body.username,
        password:req.body.password
    });
    if(user){
        const token = jwt.sign({
            userId:user._id
        },JWT_SECRET);
        res.json({
            token:token
        })
        return;

    }
    res.status(411).json({
        message:"error while logging in"
    })
})


router.get("/info", authMiddleware, async (req,res)=>{
    const users= await User.find({},{password:0});
    res.json({
        users,
        }
    );
})









module.exports= router;