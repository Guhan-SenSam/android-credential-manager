import {CreateErrorResponse} from "../CreateResponse.types";
import {LoginErrorResponse} from "../LoginResponse.types";

export const createCredErrorHandler = (errorData: CreateErrorResponse) => {
    switch (errorData.type) {
        case "CreateCredentialCancellationException":
            throw new Error("User cancelled the operation");
        case "CreateCredentialInterruptedException":
            throw new Error("Operation was interrupted can be retried");
        default:
            throw new Error(errorData.message);
    }
}


export const loginErrorHandler = (errorData: LoginErrorResponse) => {
    switch (errorData.type) {
        case "GetCredentialCancellationException":
            throw new Error("User cancelled the operation");
        case "LoginCredentialInterruptedException":
            throw new Error("Operation was interrupted can be retried");
        case "NoCredentialException":
            throw new Error("No credentials found");
        default:
            throw new Error(errorData.message);
    }
}