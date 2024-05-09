export interface IUser{
    username:string,
    pswd?:string,
    realname:string,
    email:string,
    cardNumber?:string
    _id?:string,
    __v?:number,
}
export interface ILSUser{
    access_token: string,
    user: IUser
}

export interface IStatisticUser{
    id: number,
    name: string,
    username: string,
    email: string,
    address: IStatisticUseAddress,
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string
    }
}

export interface IStatisticUseAddress{
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
        lat: string,
        lng: string
    }
}

export interface ICustomStatisticUser{
    name: string,
    company: string,
    phone: string,
    id: number,
    city: string,
    street: string
}
