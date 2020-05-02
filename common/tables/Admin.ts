export interface Admin {
    "idAdmin": number,
    "username": string,
    "password": string,
    "name": string,
}

export const DEFAULTADMIN: Admin =
{
    idAdmin: -1,
    username: "",
    password: "",
    name: "",
}