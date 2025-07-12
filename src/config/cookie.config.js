export const cookieOptions = {
  httpOnly: true, // Prevents JavaScript access to the cookie
  secure: process.env.NODE_ENV === "production", // Ensures the cookie is sent over HTTPS
  maxAge: 24 * 60 * 60 * 1000, // 1 day
  sameSite: "lax", // Prevents CSRF attacks by ensuring the cookie is sent only for same-site requests
};
