const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const multer=require('multer')
const path=require('path')
const cors=require('cors')
const app=express()
const authRoute=require('./routes/auth')
const userRoute=require('./routes/user')
const postRoute=require('./routes/posts')
const categoryRoute=require('./routes/categories')

dotenv.config()
app.use(cors());
app.use(express.json())
app.use("/images",express.static(path.join(__dirname,"/images")))

mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:true
}).then(console.log("connceted to mongodb"))
.catch((err)=>console.log(err))

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images");
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name)
    }
})

const upload=multer({storage:storage})
app.post('/api/upload',upload.single('file'),(req,res)=>{
    res.status(200).json("file has been uploaded")
})

app.use("/api/auth",authRoute)
app.use("/api/user",userRoute)
app.use("/api/post",postRoute)
app.use("/api/category",categoryRoute)

app.listen("5000",()=>{
    console.log("Backend is running")
})