import { Request, Response, Router } from 'express';
import {ErrorsType, validationRepository} from "../repositories/validation-repository";

export const validationRouter = Router({});

validationRouter.post('/', async (req: Request, res: Response) => {
    const errors:ErrorsType = await validationRepository.validateData(req.body.cardNumber, req.body.month, req.body.year, req.body.cvv);
    if(errors) {
        res.json({errors})
    } else {
        res.sendStatus(200)
    }
});