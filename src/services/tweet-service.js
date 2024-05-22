const {TweetRepository,HashtagRepository}=require('../repository/index');

class TweetService{
    constructor(){
        this.tweetRepository=new TweetRepository();
        this.hashtagRepository=new HashtagRepository();
    }
    async create(data){

        const content=data.content;
        let tags=content.match(/#[a-zA-Z0-9_]+/g);
        if(!tags){
            const tweet=await this.tweetRepository.create(data);
            return tweet;
        }
        tags=tags.map((tag)=>tag.substring(1).toLowerCase());
        const tweet=await this.tweetRepository.create(data);
        // console.log(tweet);

        let alreadyPresentTags=await this.hashtagRepository.findByName(tags);        
        let titleOfPresentTags=alreadyPresentTags.map((tag)=>tag.title);
        


        let newTags=tags.filter(tag=>!titleOfPresentTags.includes(tag));
        

        newTags=newTags.map(tag=>{
            return {title:tag,tweets:[tweet.id]}
        });       

        
        await this.hashtagRepository.bulkCreate(newTags);
        
        alreadyPresentTags.forEach((tag)=>{
            tag.tweets.push(tweet.id);
            tag.save();
        })
        return tweet;
    }

    async get(tweetId){
        const tweet=await this.tweetRepository.getWithComments(tweetId);
        return tweet;
    }
}

module.exports=TweetService;