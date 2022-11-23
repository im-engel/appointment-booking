import {Response} from 'express';
import constants from "./constants"

const errorResponse = (res: Response, desc: string) => {
    return res.status(constants.ERROR_CODE[desc] ?? 500).send({errors: [desc]})
}

export default errorResponse