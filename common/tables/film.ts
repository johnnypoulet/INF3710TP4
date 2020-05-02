export interface Film {
    "idfilm":number
    "title": string,
    "dateprod": string,
    "duration": number,
    "genre": string,
    "youtubeid": string,
}

export const DEFAULTFILM: Film =
{
    idfilm: -1,
    title: "",
    dateprod: "",
    duration: 0,
    genre:"",
    youtubeid:""
}

export interface FilmInfo {
    "film":Film,
    "Actors":string[],
    "Productors":string[],
    "Directors":string[];
    "PhotoDirectors":string[];
    "OscarNomination": {
        "BestMovie":{
            "date":Date[],
            "won":boolean[]
        };
        "BestActor":{
            "date":Date[],
            "won":boolean[]
        };
        "BestDirector":{
            "date":Date[],
            "won":boolean[]
        };
    }
}

export const DEFAULTFILMINFO: FilmInfo =
{
    film:DEFAULTFILM,
    Actors:[],
    Productors:[],
    Directors:[],
    PhotoDirectors:[],
    OscarNomination:{
        BestMovie:{
            date:[],
            won:[]
        },
        BestActor:{
            date:[],
            won:[]
        },
        BestDirector:{
            date:[],
            won:[]
        },
    }
}


export interface RentalInfo{
    "idrental":number;
    "idcreditcard":number;
    "idfilm":number;
    "rentaldate":Date;
    "idmember":number;
    "currenttime":number;
    "watchcount":number;
}