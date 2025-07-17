// Importing the helper function that verifies Firebase token and fetches user data
const { verifyAndFetchUser } = require('../utils/firebaseHelpers');

// Middleware function to verify Firebase token on protected routes
const verifyFirebaseToken = async (req, res, next) => {
  // Get the token from the "Authorization" header (e.g., "Bearer <token>")
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If token is missing, deny access
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token and get user data (e.g., email, role, id)
    const user = await verifyAndFetchUser(token);

    // Attach user data to the request object for use in next middleware or route
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If token verification fails, send an error response
    console.error('Token verification error:', error.message);
    res.status(401).json({ message: error.message });
  }
};

// Export the middleware so you can use it in routes (CommonJS style)
module.exports = { verifyFirebaseToken };
