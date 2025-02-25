export type CreateResponse  = UsernamePasswordCreateResponse | PassKeyCreateResponse | CreateErrorResponse;

export interface CreateErrorResponse {
    name: "Error",
    type: string;
    message: string;
}

export interface UsernamePasswordCreateResponse {
    name: "UsernamePassword",
    username: string;
    password: string;
}

export interface PassKeyCreateResponse {
    name: "PassKey",
    requestJSON: string;
}