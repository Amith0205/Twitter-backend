const User=require('../models/user.js');
const CrudRepository = require('./crud-repo.js');


class UserRepository extends CrudRepository{
    constructor(){
        super(User);
    }
    // async create(data){
    //     console.log('Inside user repo');
    //     const response=await User.create(data);
    //     console.log(response);
    //     return response;
    // }
    async findBy(data){
        try {
            const response=await User.findOne(data);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

module.exports=UserRepository;