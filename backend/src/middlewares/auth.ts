import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

declare global {
    namespace Express {
        interface Request {
            userId: string
        }
    }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies['auth-token'];
    if (!token) return res.status(401).json({ message: 'Unauthorized' })
    try {
        const verified = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY as string,
        )
        req.userId = (verified as JwtPayload).userId
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
}
export default verifyToken
