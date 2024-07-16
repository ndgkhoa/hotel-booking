import { Response } from 'express';
import jwt from 'jsonwebtoken'

export const generateToken = (userId: string): string => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY as string, {
        expiresIn: '1h',
    })
    return token
}

export const setAuthTokenCookie = (res: Response, token: string): void => {
    res.cookie('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400000,
    })
}