const LikeService=require ('../services/like-service');

const likeService=new LikeService();
const toggleLike=async(req,res)=>{
    try {
        // console.log(req.user.id);
        const response=await likeService.toggleLike(req.query.modelId,req.query.modelType,req.user.id);
        return res.status(200).json({
            success:true,
            data:response,
            err:{},
            message:'Successfully toggled like'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            data:{},
            err:error,
            message:'Something went wrong'
        })
    }
}

module.exports={toggleLike};