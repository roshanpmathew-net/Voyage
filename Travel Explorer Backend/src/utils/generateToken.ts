import jwt from "jsonwebtoken";

export const generateToken = (userId: string, role?: string) =>{

    
    return jwt.sign(
        {userId, role},
        process.env.JWT_SECRET!,
        {
            expiresIn: '7d'
        }
    )
}

export const generateRefreshToken = (userId: string)=>{
    return  jwt.sign(
        {userId},
        process.env.REFRESH_SECRET!,
        {
            expiresIn: '30d'
        }
    )
}