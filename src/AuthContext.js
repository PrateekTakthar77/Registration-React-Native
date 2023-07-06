import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from "./config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const register = (name, email, password, mobile, role) => {
        setIsLoading(true);
        const data = {
            mobile: parseInt(mobile),
            password,
            name,
            email,
            role,
        };
        const options = {
            headers: { "content-type": "application/json" }
        }
        axios.post(`${BASE_URL}api/auth/register`, data)
            .then(res => {
                console.log("hello");
                let userInfo = res.data;
                console.log(res.data);
                console.log(userInfo.token);
                setUserInfo(userInfo);
                setUserToken(userInfo.token);
                AsyncStorage.setItem('userinfo', JSON.stringify(userInfo));
                AsyncStorage.setItem('userToken', userInfo.token);
                console.log('userToken' + userInfo.token);
            })
            .catch(e => {
                console.log(`hello: ${e}`);
                // console.log(`Response #####: ${e.response}`);
                console.log(`Response: ${JSON.stringify(e.response)}`);
                // console.log(`hello: ${e.data.message}`);
                setIsLoading(false);
            });
    };

    const logout = () => {
        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userToken');
        AsyncStorage.removeItem('userinfo');
        setIsLoading(false);
    };

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let userToken = await AsyncStorage.getItem('userToken');
            let userInfo = await AsyncStorage.getItem('userinfo');
            userInfo = JSON.parse(userInfo);

            if (userInfo) {
                setUserToken(userToken);
                setUserInfo(userInfo);
            }
            setIsLoading(false);
        } catch (e) {
            console.log(`Is logged in error: ${e}`);
        }
    };
    useEffect(() => {
        isLoggedIn();
    }, [])
    return (
        <AuthContext.Provider
            value={{ register, logout, isLoading, userToken, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
};
