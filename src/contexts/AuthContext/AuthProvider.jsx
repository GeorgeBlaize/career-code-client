import React, { useEffect, useState } from 'react';
import { AuthContext} from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ( {children} ) => {

   const [loading,setloading] = useState(true);
   const [user,setUser] = useState(null);



    const createUser = (email,password)=>{
        setloading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    
    }

    const signInUser = (email,password)=>{
        setloading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    const signInWithGoogle = () => {
        setloading(true);
        return auth.signInWithPopup(auth,googleProvider);
    }

    const signOutUser = () => {
        setloading(true);
        return auth.signOut();
    }
    
    useEffect( () => {
        const unSubscribe = onAuthStateChanged(auth,currentUser =>{
            setUser(createUser);
            setloading(false);
            console.log('user in the auth state changed',currentUser);
        })

        return () => {
            unSubscribe();
        }
    },[])

    const authInfo ={
        loading,
        user,
        createUser,
        signInUser,
        signInWithGoogle,
        signOutUser

    }
    return (
        <AuthContext value={authInfo}>
            {children}

        </AuthContext>
    );
};

export default AuthProvider;