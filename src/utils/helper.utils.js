import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";

export const generateNanoId = (length) => {
  return nanoid(length || 6);
};

export const signToken = async (payload) => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return token;
  } catch (error) {
    throw new Error("Error while signing token");
  }
};

export const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};




export const makeRedirectableUrl = async (inputUrl) => {
  if (!inputUrl || typeof inputUrl !== "string") return null;

  // Clean the URL (remove spaces, lowercasing optional)
  inputUrl = inputUrl.trim();

  // If starts with http:// or https://, return as is
  if (/^https?:\/\//i.test(inputUrl)) {
    return inputUrl;
  }

  // If starts with www. but no protocol, add https
  if (/^www\./i.test(inputUrl)) {
    return `https://${inputUrl}`;
  }

  // If only domain, add https://
  return `https://${inputUrl}`;
}


