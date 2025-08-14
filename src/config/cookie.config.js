const isProd = process.env.NODE_ENV === "production"
export const cookieOptions = {
  httpOnly: true, // Prevents JavaScript access to the cookie
  secure: isProd, // Ensures the cookie is sent over HTTPS
  sameSite: isProd ? "none" : 'lax',
  maxAge: 24 * 60 * 60 * 1000, // 1 day
};


