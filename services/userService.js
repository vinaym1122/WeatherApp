import dotenv from 'dotenv';
import users from '../model/users.js';
import roles from '../model/roles.js';
import { generateToken, validateToken } from './jwtService.js';


export async function registerUser(data) {
    let response;
    try{
        if (!data || typeof data !== "object" || Array.isArray(data)) {
            return {code: 400, message: "Request body must be a JSON object"};
        }

        await users.create({...data, role: 1});
        response = {code: 200, message: "User registered successfully"};

    }catch(e){
        response = {code: 500, message:e.message};
    }
    return response;
}

export async function validateUser(email, password) {
    let response;
    try{ 
        if (typeof email !== "string" || typeof password !== "string" || !email.trim() || !password) {
            return {code: 400, message: "Email and password are required"};
        }

        const u = await users.findOne({email: email.trim().toLowerCase(), password});
        if(!u){
            return {code: 401, message: "Invalid email or password"};
        }
        const token = await generateToken(u.email, u.role);
        response = {code: 200, message: "Login Success", token : token};

    } catch(e){
        response = {code: 500, message:e.message};

    }
    return response;
}

export async function getFullname(token) {
    let response;
    try{
        if (typeof token !== "string" || !token.trim()) {
            return {code: 400, message: "Token is required"};
        }
        const payload = await validateToken(token);
        const user = await users.findOne({email: payload.email});
        if (!user) {
            return {code: 404, message: "User not found"};
        }
        response = {code: 200, message: "User found", fullname: user.fullname};

    } catch(e){
        response = {code: 500, message:e.message};
    }
    return response;
}
export async function getProfile(token) {
    let response;
    try {
        if (typeof token !== "string" || !token.trim()) {
            return { code: 400, message: "Token is required" };
        }

        const payload = await validateToken(token);
        const user = await users.findOne({ email: payload.email });

        if (!user) {
            return { code: 404, message: "User not found" };
        }

        const roleData = await roles.findOne({ role: Number(user.role) });

        const roleName = roleData ? roleData.rolename : "User";

        response = {
            code: 200,
            data: {
                fullname: user.fullname,
                mobile: user.mobile,
                mobileno: user.mobile,
                email: user.email,
                emailid: user.email,
                photo: "default-profile.png",
                role: roleName,
                roleName: roleName
            }
        };
    }
    catch (e) {
        response = { code: 500, message: e.message };
    }
    return response;
}