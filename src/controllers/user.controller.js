import ApiError from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';
import { uploadFileOnCloud } from '../utils/cloudinary.js'
import ApiResponse from '../utils/ApiResponse.js';


const registerUser = asyncHandler(async (req, res)=>{
     const { username , fullname, email, password} = req.body;

     if(
      [username, fullname, email, password].some((field)=> field?.trim() === '')
     ){
      throw new ApiError(400, 'All fields are required')
     }


     const isUserExisted = User.findOne({
      $or: [{username}, {email}]
     })

     if(isUserExisted){
        throw new ApiError(409, 'Already have an account with this email or username')
     }

     const avatarLocalPath = req.files?.avatar[0]?.path;
     const coverImageLocalPath = req.files?.coverImage[0]?.path;

     if(!avatarLocalPath){
      throw new ApiError(400, 'Avatar is required');
     }

     const avatar = uploadFileOnCloud( avatarLocalPath );
     const coverImage = uploadFileOnCloud( coverImageLocalPath );

     if(!avatar){
      throw new ApiError(400, 'Avatar is required');
     }

     const user = User.create({
      fullname,
      avatar: avatar.url,
      coverImage: coverImage?.url || '',
      username :username.toLowerCase(),
      password,
      email
     });

     const userCreated = User.findById(user._id).select(
       "-password -refreshToken"
     );

     if(!userCreated){
      throw new ApiError(500, 'Something went wrong while registering user');
     }

     res.status(200).json(new ApiResponse(200, userCreated, 'User Registerd Successfully'))
})

export default registerUser;