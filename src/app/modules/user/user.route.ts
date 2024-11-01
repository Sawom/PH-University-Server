import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

const shenaBahiniMiddleware = (req: Request, res: Response, next: NextFunction) =>{
    
    // validation with higher order function
    next();
}

router.post('/create-student', shenaBahiniMiddleware, UserControllers.createStudent);

export const UserRoutes = router;