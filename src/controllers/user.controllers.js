import asyncHandler from "../utils/asyncHandler.js";
import APIError from "../utils/APIError.js";
import {User} from "../models/User.models.js"
import uploadoncloudinary from "../utils/cloudinary.js";
import APIResponse from "../utils/APIResponse.js";
   const register = asyncHandler(async (req, res) => {
     // get user details from frontend
     //validation-not empty
     //check if user already exists: username ,email
     //check for images , check for avatar
     //upload them to cloudinary
     //create user object - create entry in db
     //remove password and refresh token field from response
     //check for use creation
     //return res
     
     const {fullname, email,username,password} = req.body

     if([fullname,email,username,password].some((field)=>field?.trim()==="")){
        throw new APIError(400,"all fields are required")

     }
     const existeduser=User.findOne({$or:[{username},{email}]})

     if(existeduser){
        throw new APIError(409,"username or email already existed")
     }

     const avatarLocalPath=req.files?.avatar[0]?.path;
      
     const coverimageLocalPath=req.files?.coverimage[0]?.path;

     if(!avatarLocalPath){
         throw new APIError(400,"avatar is required")
        //upload to cloudinary
     }
     else{
         //upload to cloudinary
         const avatar=await uploadoncloudinary(avatarLocalPath);

         const coverimage=await uploadoncloudinary(coverimageLocalPath);
         if(!avatar){
             throw new APIError(500,"avatar upload failed")
         }

      const user = await User.create({
            fullname,
            username,
            email,
            avatar,
            coverimage:coverimage || null,
            password
         })

         const createduser=await User.find(user._id).select("-password -refreshToken");
         if(!createduser){
             throw new APIError(500,"user creation failed")
         }

         return res.status(201).json(new APIResponse(201,createduser,"user created successfully"))
     }
   });


   export default register;