import React, {createContext, useState} from 'react';
import jwt from 'jsonwebtoken';

export const UserContext = createContext<any>({});

export function UserProvider(props:JSX.ElementChildrenAttribute): JSX.Element{
    const [isLoggedIn, setLogging] = useState(false)
    const [user, setUser] = useState({})
    const auth = (token:string)=>{ 
    const decoded:any= jwt.verify(token, 'pizza')
    setLogging(true)
    setUser({uid:decoded.uid, username:decoded.username, token:token})
    } 

    return <UserContext.Provider value={{auth, isLoggedIn, user}} >
        {props.children}
    </UserContext.Provider>
}


