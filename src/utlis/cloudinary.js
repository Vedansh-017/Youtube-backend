import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';


const oploadOnCloudinary=(async (localFilePath)=> {
try{
    if(!localFilePath){
        return NULL;
    }
   const response=await cloudinary.uploader.upload(localFilePath,{
        resource_type:'auto',
    })
    console.log('File uploaded successfully:', result.secure_url);
    return response;
}catch(error){
    fs.unlink(localFilePath)
    return NULL;
}
})