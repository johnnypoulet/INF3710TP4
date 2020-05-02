export enum ALERTTYPE{
    SUCCESS,
    ERROR,
    WARNING,
    INFO,
    DEFAULT
}

export interface AlertInfo{
    "message":string,
    "alertType":ALERTTYPE,
    "durationInMs":number;
}

export enum ROLE{
    ADMIN,
    MEMBER,
    DEFAULT
}