import User from "../model/userModel.js";
import AsyncHandler from "express-async-handler";
import generateToken from "../utils/generateJwtToken.js";
import bcryptjs from "bcryptjs";

//@desc Authenticate  user
//@route POST /api/user/login
//@access public
const authUser = AsyncHandler(async (req, res) => {
  console.log("in auth user");
  console.log(req.body);
  const { email, password } = req.body;

  console.log(email,password);

  const user = await User.findOne({ email: email });
  console.log(user);

  console.log("USEER FOUNDED CORRECLTY");

  if (user && (await user.matchPassword(password))) {
    console.log("USER AUTHERISATION SUUCESS FULL");
    res.json({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      name: user.name,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or pasword");
  }
});

//@desc GET user Profile
//@route Get /api/user/profile
//@access priavte
const getUserProfile = AsyncHandler(async (req, res) => {
  console.log("IN GET PROFLE");
  console.log(req);

  console.log(req.current_user.email);
  if (req.current_user) {
    console.log("IN IF");
    res.json({
      _id: req.current_user._id,
      email: req.current_user.email,
      isAdmin: req.current_user.isAdmin,
      name: req.current_user.name,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

//@desc Add  user
//@route POST /api/user/
//@access public
const addNewUser = AsyncHandler(async (req, res) => {
  // await User.insertMany

  console.log("ADD NEW USER");
  console.log(req.body);


  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User Already Exist");
  }
  console.log("here");
  
      console.log("in try");
    const user = await User.create({
        name,
        email,
        password
      });
 
  console.log(user);
  
  console.log("AFTER CREATE");
  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      name: user.name,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});


//@desc update user Profile
//@route PUT /api/user/profile
//@access priavte
const updateUserProfile = AsyncHandler(async (req, res) => {
  console.log("IN PUT PROFLE");

  console.log(req.query);
  const user=await User.findById(req.current_user._id)
  if (user) {
    user.name=req.query.name||user.name
    user.email=req.query.email||user.email
    if(req.query.password){
      user.password=req.query.password
    }


    console.log("UPDATION COMPLETD");

   
    const updatedUser= await user.save()
    res.json({
      _id: updatedUser._id,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
      name: updatedUser.name,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});


//@desc get All USERS
//@route GTE /api/users
//@access priavte only for admins

const getAllUsers=AsyncHandler(async(req,res)=>{


  console.log("in get all users");


const users=await User.find({})

res.json(users)

})
//@desc get All USERS
//@route DELETE /api/users
//@access priavte only for admins

const deleteUser=AsyncHandler(async(req,res)=>{


  console.log("Delete one user users");

console.log(req.params.id);
try{
const user=await User.findById(req.params.id)

if(user){
await user.remove()
res.json({message:"User Removed"})
}else{
  res.status(404)
  throw new Error("user nopt found")
}

}catch(err){
  res.status(404)
  throw new Error("user nopt found")
}

})


//@desc get  USER By ID
//@route GET /api/users/:id
//@access priavte only for admins


const getUserByid=AsyncHandler(async(req,res)=>{
console.log(req.params.id)
  const user=await User.findById(req.params.id)
  if(user){
    res.json(user)

  }else{
    res.status(401)
    throw new Error('NO found')
  }
 

})




//@desc update user details
//@route PUT /api/user/:id
//@access priavte-admin
const updateUser = AsyncHandler(async (req, res) => {
  console.log("IN PUT-ADMIN PROFLE");

  
  const user=await User.findById(req.params.id)
  if (user) {
    user.name=req.body.name||user.name
    user.email=req.body.email||user.email
    user.isAdmin=req.body.isAdmin

   

   
    const updatedUser= await user.save()
    console.log("UPDATION COMPLETD");
    res.json({
      _id: updatedUser._id,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      name: updatedUser.name,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});




export { authUser, getUserProfile, addNewUser,updateUserProfile,getAllUsers,deleteUser,getUserByid,updateUser };
