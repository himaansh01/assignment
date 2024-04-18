const express= require("express");
const app= express();
const userRouter= require("./routes")


app.use(express.json());
app.use("/user",userRouter);



app.listen(3000, ()=>{
    console.log("server running at port 3000");
});