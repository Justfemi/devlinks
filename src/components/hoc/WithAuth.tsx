// withAuth.tsx
import React, { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthHOC = (props: any) => {
    const router = useRouter();
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          router.push('/login'); // Redirect to login if not authenticated
        } else {
          setLoading(false); // User is authenticated, stop loading
        }
      });

      return () => unsubscribe();
    }, [router]);

    if (loading) {
      return <div>Loading...</div>; // You can customize this loading state
    }

    return <WrappedComponent {...props} />;
  };

  return AuthHOC;
};

export default withAuth;
