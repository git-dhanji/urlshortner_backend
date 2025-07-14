import User from "../models/user.models.js";

export const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};
export const findUserByEmailAndPassword = async (email) => {
  const user = await User.findOne({ email }).select("+password");
  return user;
};

export const saveUser = async (username,email,password) => {
  const user = await User.create({ username,email,password });
  if(!user) {
    throw new Error("User creation failed at saveUserDao fn");
  }
  await user.save();
  return user;
};

export const findUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};


