import {
  findUserByEmail,
  findUserByEmailAndPassword,
  saveUser,
} from "../dao/user.dao.js";
import { signToken } from "../utils/helper.utils.js";

export const createUser = async (username, email, password) => {
  const user = await findUserByEmail(email);
  if (user) {
    throw new Error("User Already exists with this email");
  }

  const newUser = await saveUser(username, email, password);
  if (!newUser) {
    throw new Error("User creation failed at createUser service");
  }

  const userData = newUser.toObject();
  delete userData.password;
  const token = await signToken({ id: newUser._id });
  return { token, userData };
};

export const login_user = async (email, password) => {
  const user = await findUserByEmailAndPassword(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isPasswordValid = user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new Error("Invalid Email or Password");
  }
  const token = await signToken({ id: user._id });
  return { token, user };
};
