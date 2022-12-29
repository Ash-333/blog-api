const router=require('express').Router();
const User=require('../model/User')
const bcrypt=require('bcrypt')

//register
router.post('/register',async(req,res)=>{
    try {
        const salt=await bcrypt.genSalt(10)
        const hashPass=await bcrypt.hash(req.body.password,salt)
        const newUser=new User({
            userName:req.body.userName,
            email:req.body.email,
            password:hashPass
        })

        const user=await newUser.save()
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

//login
router.post('/login',async(req,res)=>{
    try {
        const user=await User.findOne({userName:req.body.userName})
        !user && res.status(400).json("invalid credentials")

        const validate=await bcrypt.compare(req.body.password,user.password)
        !validate && res.status(400).json("invalid credentials")

        const {password,...others}=user._doc
        res.status(200).json(others)
    } catch (err) {
        res.status(500).json({msg:err})
    }
})

module.exports=router