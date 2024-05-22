const TweetService=require('../services/tweet-service');
const upload=require('../config/file-upload-S3-config');
const singleUploader=upload.single('image');

const tweetService=new TweetService();
const createTweet=async(req,res)=>{
    try {
        singleUploader(req,res,async (err,data)=>{
            if(err){
                return res.status(500).json({error:err});
            }
            const payload={...req.body};
            // console.log(payload);
            payload.image=req.file.location;
            const response=await tweetService.create(payload);        
            return res.status(201).json({
            success:true,
            message:"Successfully created a new tweet",
            data:response,
            err:{}
        })
        })     
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'Something went wrong',
            data:{},
            err:error
        })
    }
}

const getTweet=async(req,res)=>{
    try {
        const response=await tweetService.get(req.params.id);
        // console.log(req.params);
        return res.status(201).json({
            success:true,
            message:"Successfully fetched a new tweet",
            data:response,
            err:{}
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'Something went wrong',
            data:{},
            err:error
        })
    }
}
module.exports={createTweet,getTweet}