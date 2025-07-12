import { findUserByEmail, saveUser } from "../dao/user.dao.js";
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

  const token = await signToken({ id: newUser._id });
  return {token, user: newUser};
};

export const login_user = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user || user.password !== password) {
    throw new Error("Invalid email or password");
  }
  const token = await signToken({ id: user._id });
  return {token,user};
};
