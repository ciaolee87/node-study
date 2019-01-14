import createHttpError from "http-errors";

export class Exception {
    constructor(errCode: string, args?: any) {

        createHttpError(errCode);
    }
}