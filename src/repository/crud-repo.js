class CrudRepository{
    constructor(model){
        this.model=model;
    }
    async create(data){
        try{
            // console.log(this.model);
            const result=await this.model.create(data);
            return result;
        }catch(error){
            console.log("Something went wrong in crud repo create");
            throw error;
        }
    }
    async destroy(id){
        try {
            const result=await this.model.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.log("Something went wrong in crud repo delete");
            throw error;
        }
    }
    async get(id){
        try {
            const result=await this.model.findById(id);
            return result;  
        } catch (error) {
            console.log("Something went wrong in crud repo get");
            throw error;
        }
    }
    async getAll(){
        try {
            const result=await this.model.find({});
            return result;
        } catch (error) {
            console.log("Something went wrong in crud repo get All");
            throw error;
        }
    }
    async update(id,data){
        try {
            const result=await this.model.findByIdAndUpdate(id,data,{new:true});
            return result;
        } catch (error) {
            console.log("Something went wrong in crud repo get");
            throw error;
        }
    }
}

module.exports=CrudRepository;