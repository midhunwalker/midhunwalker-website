// This function will verify the Firebase token and return the user from Firestore
const { verifyAndFetchUser } = require('../utils/firebaseHelpers');

// Controller function for handling Firebase login requests
const firebaseLogin = async (req, res) => {
  // Get the Authorization header from the request
  const authHeader = req.headers.authorization;

  // Extract the token from the header if it starts with "Bearer "
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  // If there's no token, return a 401 Unauthorized error
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided',
    });
  }

  try {
    // Call the helper function to verify the token and fetch user data
    const user = await verifyAndFetchUser(token);

    // If successful, return the user data along with the token
    res.status(200).json({
      success: true,
      message: 'Firebase login verified',
      user,
      token,
    });
  } catch (error) {
    // If token verification or user fetch fails, log error and return 401
    console.error('Login error:', error.message);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

// Export the controller function so it can be used in your routes
module.exports = { firebaseLogin };
