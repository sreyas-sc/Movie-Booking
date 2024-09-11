import express from "express";
import { deleteUser, getAllUsers, getBookingsOfUser, login, signup, updateUser } from "../controllers/user-controller.js";

const 
userRouter = express.Router();

// To get the all users
userRouter.get("/", getAllUsers); //localhost:5000/user

// To signup a user
userRouter.post("/signup", signup);

// To update a users
userRouter.put("/:id", updateUser);

// To delete a user
userRouter.delete("/:id", deleteUser)

// login
userRouter.post("/login", login);

// To get the bookings of the user
userRouter.get("/bookings/:id", getBookingsOfUser);

export default userRouter