export default interface ITour{
    createdAt?: string,
    date?: string,
    name: string,
    avatar?: string,
    id: string,
    firstName?: string,
    lastName?: string,
    cardNumber?: string,
    birthDate?: string|null,
    age?: number|null,
    citizenship?: string|null,
    description: string,
    tourOperator: string,
    price: string,
    img: string,
    type?: string
}

export interface INearestTour extends ITour{
  locationId: string
}

export interface ITourLocation {
  name: string,
  id: string
}

export interface INearestTourExtend extends INearestTour{
  country?: ITourLocation|undefined
}
