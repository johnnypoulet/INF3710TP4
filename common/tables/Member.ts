export interface Member {
    "idMember": number,
    "email": string,
    "password": string,
    "type": string,
    "address": {
        "idAddress":number,
        "address": string,
        "city": string,
        "province": string,
        "pc": string,
        "country": string,
    },
    "name": string,
}

export const DEFAULTMEMBER: Member =
{
    idMember: -1,
    email: "",
    password: "",
    type:"",
    address: {
        idAddress: -1,
        address: "",
        city: "",
        province: "",
        pc: "",
        country: "",
    },
    name: "",
}