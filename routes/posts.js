const router=require('express').Router();
const User=require('../model/User')
const Post=require('../model/Post')


//create post
router.post('/',async(req,res)=>{
    const newPost=new Post(req.body)

    try {
        const savePost=await newPost.save()
        res.status(200).json(savePost)
    } catch (err) {
        res.status(500).json({msg:err})
    }
})

//update post
router.put('/:id',async(req,res)=>{
    try {
        const post =await Post.findById(req.params.id)
        if(post.userName===req.body.userName){
            try {
                const updatePost=await Post.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                },{
                    new:true
                })
                res.status(200).json(updatePost)
            } catch (err) {
                res.status(500).json({msg:err})
            }
        }else{
            res.status(401).json("access denied")
        }
    } catch (err) {
        res.status(500).json({msg:err})
    }
})

//delete post
router.delete('/:id',async(req,res)=>{
    try {
        const post =await Post.findById(req.params.id)
        if(post.userName===req.body.userName){
            try {
                await post.delete()
                res.status(201).json("Post has been deleted")
            } catch (err) {
                res.status(500).json({msg:err})
            }
        }else{
            res.status(401).json("access denied")
        }
    } catch (err) {
        res.status(500).json({msg:err})
    }
})

//get post
router.get('/:id',async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json({msg:err})
    }
})

//get all post
router.get('/',async(req,res)=>{
    const userName=req.query.user   
    const catName=req.query.cat
    try {
        let posts
        if(userName){
            posts=await Post.find({userName})
        }else if(catName){
            posts=await Post.find({categories:{
                $in:[catName]
            }})
        }else{
            posts=await Post.find()
        }
        res.status(200).json(posts)
    } catch (err) {
        res.status(400).json({msg:err})
    }   
})



module.exports=router