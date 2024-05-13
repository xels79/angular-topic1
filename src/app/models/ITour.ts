export interface IBTour {
  name: string,
  description: string,
  tourOperator: string,
  price: string,
  img: string,
  type?: string
}
export default interface ITour extends IBTour{
    createdAt?: string,
    date?: string,
    avatar?: string,
    id: string,
    firstName?: string,
    lastName?: string,
    cardNumber?: string,
    birthDate?: string|null,
    age?: number|null,
    citizenship?: string|null,
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
