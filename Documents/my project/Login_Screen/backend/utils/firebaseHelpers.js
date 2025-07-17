const { admin, db } = require('./firebaseAdmin');

const verifyAndFetchUser = async (token) => {
  const decoded = await admin.auth().verifyIdToken(token);
  const email = decoded.email;

  if (!email) throw new Error('Token missing email');

  const snapshot = await db.collection('users')
    .where('email', '==', email)
    .limit(1)
    .get();

  if (snapshot.empty) throw new Error('User not found in Firestore');

  const userDoc = snapshot.docs[0];
  const userData = userDoc.data();

  return {
    uid: decoded.uid,
    email,
    role: userData.role,
    name: userData.name || '',
    id: userDoc.id
  };
};

module.exports = { verifyAndFetchUser };
