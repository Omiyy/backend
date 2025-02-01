import mongoose  from "mongoose";
import bycrypt from "bcrypt";
import 



const UserSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true, 
            index:true 
        },
        email:{
            type:String,
            required:true,
            unique:true,
            trim:true
        },
        fullname:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:[true,"password is required"]
        },
        avatar:{
            type:String,

        },
        refreshToken:{
            type:String,
        },
        watchHistory:{
            type :[{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Video"
            }],
            default:[],
        }

    }
,{timestamps:true});

UserSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bycrypt.hash(this.password,10);
    }
    next();
});

UserSchema.methods.isPasswordMatch = async function(password){
    return await bycrypt.compare(password,this.password);
}

UserSchema.methods.generateAccessToken = function(){
    return JsonWebTokenError.sign({
        _id:this._id,
        username:this.username,
        email:this.email,
        fullname:this.fullname,

    },process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRES_IN
    })
};
UserSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id:this._id,
       

    },process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:process.env.REFRESH_TOKEN_EXPIRES_IN
    })
}

export const User = mongoose.model("User",UserSchema);