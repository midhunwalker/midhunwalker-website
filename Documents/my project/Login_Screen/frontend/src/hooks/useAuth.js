import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth'; 
import { auth, db } from '../firebaseConfig';       
import { doc, getDoc } from 'firebase/firestore';   


const useAuth = () => {
  
  const [user, setUser] = useState(null);        
  const [error, setError] = useState(null);      
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    // Listener that triggers when auth state changes (user logs in/out)
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        
        try {
          // Reference to the user document in Firestore based on UID
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          // Fetch the user document
          const userSnap = await getDoc(userDocRef);

          if (userSnap.exists()) {
            const firestoreData = userSnap.data();
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              name: firestoreData.name,
              role: firestoreData.role,
            });
          } else {
            setError('User not found in Firestore');
            setUser(null);
          }
        } catch (err) {
          console.error('Error fetching Firestore user:', err);
          setError('Failed to fetch user data');
          setUser(null);
        }
      } else {
        // If user is logged out
        setUser(null);
      }

      // Data loading is complete
      setLoading(false);
    }, (err) => {
      // Handle onAuthStateChanged listener errors
      setError(err?.message || 'Unknown error');
      setLoading(false);
    });

    // Cleanup function to remove the listener when component unmounts
    return () => unsubscribe();
  }, []);

  // Return the current user, loading state, and any error encountered
  return { user, loading, error };
};

export default useAuth;
