// import React, { useEffect, ReactNode } from 'react';
// import { useRouter } from 'next/router';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../../../firebase';


// const withAuth = (WrappedComponent: React.ComponentType) => {
//   const AuthHOC = (props: any) => {
//     const router = useRouter();
//     const [loading, setLoading] = React.useState(true);
//     const [isMounted, setIsMounted] = React.useState(false);

//     useEffect(() => {
//       setIsMounted(true);
//     }, []);

//     useEffect(() => {
//       if (!isMounted) return;

//       const unsubscribe = onAuthStateChanged(auth, (user) => {
//         if (!user) {
//           router.push('/login');
//         } else {
//           setLoading(false);
//         }
//       });

//       return () => unsubscribe();
//     }, [router, isMounted]);

//     if (loading) {
//       return <div>Loading...</div>;
//     }

//     return <WrappedComponent {...props} />;
//   };

//   return AuthHOC;
// };

// export default withAuth;

