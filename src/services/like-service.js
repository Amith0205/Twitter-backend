const  TweetRepository  = require("../repository/tweet-repository");
const  LikeRepository  = require("../repository/like-repository");

class LikeService{
    constructor(){
        this.likeRepository=new LikeRepository();
        this.tweetRepository=new TweetRepository();
    }

    async toggleLike(modelId,modelType,userId){
        // console.log(userId);
        if(modelType=='Tweet'){
            var likeable=await this.tweetRepository.find(modelId);
            
        }else if(modelType=='Comment'){
            
        }else{
           throw new Error('unknown model type') ;
        }
        const AlreadyLiked=await this.likeRepository.findByUserAndLikeable({
            user:userId,
            onModel:modelType,
            likeable:modelId
        });
        // console.log(AlreadyLiked);

        if(AlreadyLiked){
            // console.log(AlreadyLiked.likeable)
            likeable.likes.pull(AlreadyLiked.id);
           await likeable.save();
           await this.likeRepository.destroy(AlreadyLiked.id);
           var isRemoved=true;
        }else{
            const newLike=await this.likeRepository.create({
                user:userId,
                onModel:modelType,
                likeable:modelId
            });
            likeable.likes.push(newLike);
            await likeable.save();

            var isRemoved=false;
        }
        return isRemoved;
    }
}

module.exports=LikeService;