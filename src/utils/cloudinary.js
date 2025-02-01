import {v2 as cloudinary} from 'cloudinary';
import exp from 'constants';
import fs from 'fs';

          
cloudinary.config({ 
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadoncloudinary = async (file) => {
    try{
        if(!file) return null;

       const response= await cloudinary.uploader.upload(file,{resource_type:"auto"})

        console.log("file uploaded successfully",response.url);
        return response.url;
    }
    catch(err){
        fs.unlinkSync(file);
        console.log(err);
        return null;
    }
};

export default uploadoncloudinary;
