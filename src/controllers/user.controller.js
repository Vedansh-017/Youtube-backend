import { asyncHandler } from "../utlis/asyncHandler.js";
import ApiError from "../utlis/ApiError.js";
import { User } from "../models/user.module.js";
import { uploadOnCloudinary } from "../utlis/cloudinary.js";
import { ApiResponse } from "../utlis/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);
    
    // get userr data from request body
    // validatio -not empty fields
    // check if user already exists: username or email
    // check for imsges ,check for avatar
    // upload them to cloudinary
    // create user in the database
    //remove password and refersh token field from response
    //check for user 
    //return res

    const {fullName, username, email, password} = req.body
    console.log("email", email);
    if(
        [fullName, username, email, password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "Full name is required")
    }
    const existedUser=await User.findOne({$or:[{username},{email}]}).then((user)=>{
        if(existedUser){
            throw new ApiError(409, "User already exists")
        }
    })
    const avatarLocalPath= req.files?.avatar[0]?.path
    const coverImageLocalPath= req.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required")
    }
    const avatar=await uploadOnCloudinary(avatarLocalPath)
    const coverImage=coverImageLocalPath? await uploadOnCloudinary(coverImageLocalPath):null

    const user=await User.create({       
        username:username.toLowercase(),
        email,
        fullName,
        password,
        avatar:avatar.secure_url,
        coverImage:coverImage?.secure_url || null,
    })
    const createdUser=await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError(500, "something went wrong")
    }
    return res.status(201).json(new ApiResponse(201, createdUser ,"User created successfully"))
})

  

export default registerUser