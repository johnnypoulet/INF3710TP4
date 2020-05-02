import { Member } from '../tables/Member'
import { Admin } from '../tables/Admin'
import { ERROR_TYPE } from '../error/errors'
export interface Message {
    title: string;
    body: string;
}

export interface AuthentificationMemberMessage {
    isValid: boolean;
    message: string;
    member:Member;
    token:string;
}


export interface AuthentificationAdminMessage {
    isValid: boolean;
    message: string;
    admin:Admin;
    token:string;
}

export interface InsertUpdateDeleteMessage {
    isInserted: boolean;
    error: ERROR_TYPE;
}