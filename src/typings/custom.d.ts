import { JwtPayload } from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user?: any;
            roles?: string[];
            decodedToken?: JwtPayload;
        }
    }
}