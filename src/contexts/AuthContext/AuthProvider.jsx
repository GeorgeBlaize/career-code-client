import React, { useState } from 'react';
import { AuthContext} from './AuthContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';
const AuthProvider = ( {children} ) => {

   const [loading,setloading] = useState(true);

    const createUser = (email,password)=>{
        setloading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    
    }

    const authInfo ={
        loading,
        createUser

    }
    return (
        <AuthContext value={authInfo}>
            {children}

        </AuthContext>
    );
};

export default AuthProvider;