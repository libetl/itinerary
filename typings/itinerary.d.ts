declare namespace Itinerary {

  export interface Props {
    readonly actionType: ActionType,
    readonly items: Item[],
    readonly stayClosed?: boolean,
    readonly translate?: TranslateFunction,
    readonly resizeInFontSize?: boolean,
    readonly googleMapsApiKey?: string,
    readonly supplierLogoFunction?: SupplierLogoFunction,
  }

  export interface Item {
    readonly productType: ProductType
    readonly linkedTo?: ProductType,
    readonly tripType?: CardTripType,
    readonly segments?: Segment[],
    readonly specificity?: UiAttribute[],
    readonly openAfterLoad?: boolean,
    readonly checkinInstruction?: CheckinInstruction,
    readonly fareAndSalesConditions?: FareAndSalesConditions
    readonly travelers: Traveler[],
    readonly headOvalBorder?: boolean,
    readonly lastOne?: boolean,
    readonly firstOne?: boolean,
    readonly translate?: (text?: string) => string,
    readonly resizeInFontSize?: boolean,
    readonly hasParent?: boolean,
    readonly googleMapsApiKey?: string,
    readonly supplierLogoFunction?: SupplierLogoFunction
  }
  export type SupplierLogoFunction = (type: Itinerary.ProductType | undefined, code: string) => string;

  export type TranslateFunction = (messageKey?: string) => string
  export type ResizerFunction = (size: number, type?: 'height' | 'width') => string
  export type ActionType = 'BOOK' | 'CHANGE' | 'CANCEL'
  export type ProductType = 'HOTEL' | 'CAR' | 'FLIGHT' | 'TRAIN' | 'INSURANCE' | 'GROUND'

  export interface Traveler {
    readonly firstName: string,
    readonly lastName: string
  }

  export interface CheckinInstruction {
    readonly text: string
  }

  export interface FareAndSalesConditions {
    readonly title: string,
    readonly text: string,
    readonly openAfterLoad?: boolean,
  }

  export interface Segment {
    readonly origin?: Location,
    readonly supplier?: SupplierInformation,
    readonly destination?: Location,
    readonly start?: DateTime,
    readonly end?: DateTime
  }

  export interface SupplierInformation {
    readonly name?: string,
    readonly vendorTransitNumber?: string | number,
    readonly code?: string,
    readonly operatingCompany?: string,
    readonly cabinClass?: string,
    readonly classCode?: ComfortClass,
    readonly vehicle?: string,
    readonly amenities?: UiAttribute[],
    readonly additionalFeatures?: string[]
  }

  export interface UiAttribute {
    readonly icon: string,
    readonly text: string
  }

  export interface Location {
    readonly cityName?: string,
    readonly name?: string,
    readonly code?: string,
    readonly address?: string
    readonly coordinates?: Coords
  }

  type ComfortClass = 'ECONOMY' | 'BUSINESS' | 'FIRST'
  type CardTripType = 'ONE_WAY' | 'ROUND_TRIP'
  type Coords = { latitude: number, longitude: number }

  export interface DateTime {
    readonly date: Date,
    readonly time: Time,
    readonly timezone?: string
  }

  export interface Date {
    readonly day: number,
    readonly month: number,
    readonly year: number
  }

  export interface Time {
    hour: number
    readonly minutes: number
  }
}
