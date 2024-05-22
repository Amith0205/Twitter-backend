const Like=require('../models/like');
const CrudRepository  = require('./crud-repo.js');

class LikeRepository extends CrudRepository{
    constructor(){
        super(Like);
    }
    async findByUserAndLikeable(data){
        try {
            const like=Like.findOne(data) ;
            return like;
        } catch (error) {
            throw error;
        }
    }
}

module.exports=LikeRepository;