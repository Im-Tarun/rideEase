import React, { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    
	useEffect(() => {
        const newSocket = io('/'); 
        newSocket.on('connect', ()=>{
            console.log("connected to the server")
        })
        setSocket(newSocket); 
		return () => newSocket.close();
	}, []);
 

	return (
		<SocketContext.Provider value={{ socket }}>
			{children}
		</SocketContext.Provider>
	);
};
