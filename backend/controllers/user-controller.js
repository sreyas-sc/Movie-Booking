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


export const googleSignIn = async (req, res, next) => {
  console.log("Received Google Sign-In request");

  const { email } = req.body;
  console.log("Received email:", email);

  if (!email || email.trim() === "") {
    console.log("Email is missing or empty");
    return res.status(422).json({ message: "Email is required" });
  }

  try {
    console.log("Searching for user with email:", email);
    // Check if a user with this email exists
    const user = await Users.findOne({ email });

    if (user) {
      console.log("User found with ID:", user._id);
      // User exists, return the user ID
      return res.status(200).json({ userId: user._id });
    } else {
      console.log("User not found with email:", email);
      // User does not exist
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error during Google Sign-In:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
