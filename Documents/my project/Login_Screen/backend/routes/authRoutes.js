const express = require('express');
const router = express.Router();
const { firebaseLogin, logout } = require('../controllers/authController');
const { verifyFirebaseToken, authorize } = require('../middleware/auth.middleware');

// 🔄 Login via Firebase token
router.post('/firebase-login', firebaseLogin);

// 🔓 Logout endpoint
router.post('/logout', logout);

// 🔐 Super Admin only route
router.get(
  '/admin-only',
  verifyFirebaseToken,
  authorize(['super_admin']),
  (req, res) => {
    res.json({ message: 'Super admin access granted', user: req.user });
  }
);

// 🔐 Sub Admin only route
router.get(
  '/sub-admin-only',
  verifyFirebaseToken,
  authorize(['sub_admin']),
  (req, res) => {
    res.json({ message: 'Sub admin access granted', user: req.user });
  }
);

// 🔐 Shared Admin route
router.get(
  '/admin-shared',
  verifyFirebaseToken,
  authorize(['super_admin', 'sub_admin']),
  (req, res) => {
    res.json({ message: 'Shared admin access granted', user: req.user });
  }
);

module.exports = router;
