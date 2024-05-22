const JWT=require('passport-jwt');
const User=require('../models/user')
const JwtStrategy=JWT.Strategy;
const ExtractJwt=JWT.ExtractJwt;
const dotenv=require('dotenv');
dotenv.config();

const opts={
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:process.env.SECRET
}

const passportAuth=(passport)=>{
    try {
        passport.use(new JwtStrategy(opts,async (jwt_payload,done)=>{
            const user=await User.findById(jwt_payload.id);
            if(!user){
                done(null,false);
            }else{
                done(null,user);
            }
        }))
    } catch (error) {
        throw error;
    }
   
}

module.exports=passportAuth;