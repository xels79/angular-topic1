export default interface ITour{
    createdAt: string|undefined,
    date: string|undefined,
    name: string,
    avatar: string|undefined,
    id: string,
    firstName: string|undefined,
    lastName: string|undefined,
    cardNumber: string|undefined,
    birthDate: string|null|undefined,
    age: number|null|undefined,
    citizenship: string|null|undefined,
    description: string,
    tourOperator: string,
    price: string,
    img: string,
    type: string|undefined
}