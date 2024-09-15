// import Bookings from '../models/Bookings.js';
// import Users from '../models/User.js';
// import bcrypt from 'bcryptjs';

// export const getAllUsers = async(req, res, next) =>{
//     let users;
//     try{
//         users = await users.find();
//     }
//     catch(err){
//         return console.log(err);
//     }

//     if(!Users){
//         return res.status(500).json({message: "Unexpected error occured"})
//     }
//     return res.status(200).json({ users }) 

// };

// export const signup = async(req, res, next) =>{
//     const {phone, email, password } = req.body;
//     if(
//         !phone && phone.trim()==="" && 
//         !email && email.trim()===""  && 
//         !password && password.trim()===""
//     ){
//         return res.status(422).json({message: "Please fill in all fields"})
// }

// const hashedPassword = bcrypt.hashSync(password);
// let user;
// try{
//     user = new users({
//         phone,
//         email,
//         password: hashedPassword
//     });
//     user= await user.save(); //save a doc inside the collection
// } 
// catch(err){
//     return console.log(err);
// }
// if (!user){
//     return res.status(500).json({message: "Unexpected error occured"})
// }
//     return res.status(201).json({ id: user._id });
// };

// export const updateUser = async (req, res, next) =>{
//     //req.params is an object that contains the details about the params url
//     const id= req.params.id;
//     const {phone, email, password } = req.body;
//     if(
//         !phone && phone.trim()==="" && 
//         !email && email.trim()===""  && 
//         !password && password.trim()===""
//     ){
//         return res.status(422).json({message: "Please fill in all fields"})
// }

// const hashedPassword = bcrypt.hashSync(password)
// let user;
//     try{
//         user = await users.findByIdAndUpdate(id, {
//             phone, 
//             email, 
//             password: hashedPassword
//         })

//     }
//     catch (err){
//         return console.log(err);
//     }
//     if(!user){
//         return res.status(500).json({
//             message: "Unexpected error occured"
//         });
        
//     }res.status(200).json({
//         message:"updated successfully"
//     })

// };

// export const deleteUser = async(req, res, next) =>{
//     const id = req.params.id;
//     let user;
//     try{
//         user = await User.findByIdAndRemove(id);
//     }
//     catch(err){
//         return console.log(err)
//     }
//     if (!user){
//         return res.status(500).json({ message : "Something went wrong on delte"})
//     }
//     return res.status(200).json({ message : "User deleted successfully"})

// }

// export const login = async(req, res, next) =>{
//     const {email, password} = req.body;

//     if(
//         !email && email.trim()===""  && 
//         !password && password.trim()===""
//     ){
//         return res.status(422).json({message: "Please enter both email and password"})
//     }

//     let existingUser;
//     try{
//         existingUser = await users.findOne({ email });
//     }
//     catch(err){
//         return console.log(err)
//     }

//     if(!existingUser){
//         return res.status(404)
//         .json({message: "Unable to find user from this ID"}) 
//     }

//     const isPasswordCorrect= bcrypt.compareSync(password, existingUser.password)
//     if(!isPasswordCorrect){
//         return res.status(400).json({message : "Invalid credentials"})

//     }
//     return res.status(200).json({ message:"Login success"})
// };



// export const getBookingsOfUser = async (req, res, next) =>{
//     const id = req.params.id;
//     let bookings;

//     try{
//         bookings = await Bookings.find({user: id})

//     }
//     catch(err){
//         return console.log(err)
//     }

//     if(!bookings){
//         return  res.status(500).json({message: "No bookings found for this user"})

//     }
//     return res.status(200).json({ bookings })
// }


///If others not working, use the above code as legacy code**********************************************************************************

import Bookings from '../models/Bookings.js';
import Users from '../models/User.js'; // Ensure this import is correct
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await Users.find(); // Use `Users` instead of `users`
  } catch (err) {
    return console.log(err);
  }

  if (!users) {
    return res.status(500).json({ message: "Unexpected error occurred" });
  }
  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  const { phone, email, password } = req.body;
  if (!phone || phone.trim() === "" || !email || email.trim() === "" || !password || password.trim() === "") {
    return res.status(422).json({ message: "Please fill in all fields" });
  }

  const hashedPassword = bcrypt.hashSync(password);
  let user;
  try {
    user = new Users({ // Use `Users` instead of `user`
      phone,
      email,
      password: hashedPassword
    });
    user = await user.save(); // Save a doc inside the collection
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Unexpected error occurred" });
  }
  return res.status(201).json({ id: user._id });
};


// 
export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { phone, email, password } = req.body;
  if (!phone || phone.trim() === "" || !email || email.trim() === "" || !password || password.trim() === "") {
    return res.status(422).json({ message: "Please fill in all fields" });
  }


  //  Update the user
  const hashedPassword = bcrypt.hashSync(password);
  let user;
  try {
    user = await Users.findByIdAndUpdate(id, { // Use `Users` instead of `users`
      phone,
      email,
      password: hashedPassword
    });
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Unexpected error occurred" });
  }
  return res.status(200).json({ message: "Updated successfully" });
};


//for deleting the user
export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await Users.findByIdAndRemove(id); // Use `Users` instead of `User`
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Something went wrong on delete" });
  }
  return res.status(200).json({ message: "User deleted successfully" });
};


// for the user login
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || email.trim() === "" || !password || password.trim() === "") {
    return res.status(422).json({ message: "Please enter both email and password" });
  }

  let existingUser;
  try {
    existingUser = await Users.findOne({ email }); // Use `Users` instead of `users`
  } catch (err) {
    return console.log(err);
  }

  if (!existingUser) {
    return res.status(404).json({ message: "Unable to find user from this email" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  return res.status(200).json({ message: "Login success",
    userId: existingUser._id 
   });
};


//  to get the bookings of the user
export const getBookingsOfUser = async (req, res, next) => {
  const id = req.params.id;
  let bookings;

  try {
    bookings = await Bookings.find({ user: id });
  } catch (err) {
    return console.log(err);
  }

  if (!bookings) {
    return res.status(500).json({ message: "No bookings found for this user" });
  }
  return res.status(200).json({ bookings });
};


