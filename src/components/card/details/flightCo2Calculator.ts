import { DistanceCalculator } from "../distance/distanceCalculator";

class FlightParameters {
  a: number; // polynomial coefficient
  b: number; // polynomial coefficient
  c: number; // polynomial coefficient
  S: number; // average seat number
  PLF: number; // passenger load factor
  DC: number; // detour constant
  inv_CF: number; // 1 - cargo factor
  economyCW: number; // economy class weight
  businessCW: number; // business class weight
  firstCW: number; // first class weight
  EF: number; // emission factor
  P: number; // Pre production
  M: number; // multiplier
  constructor(
    a: number,
    b: number,
    c: number,
    S: number,
    PLF: number,
    DC: number,
    inv_CF: number,
    economyCW: number,
    businessCW: number,
    firstCW: number,
    EF: number,
    P: number,
    M: number) {
    this.a = a
    this.b = b
    this.c = c
    this.S = S
    this.PLF = PLF
    this.DC = DC
    this.inv_CF = inv_CF
    this.economyCW = economyCW
    this.businessCW = businessCW
    this.firstCW = firstCW
    this.EF = EF
    this.P = P
    this.M = M
  }
}

const shortHaulParams: FlightParameters = {
  a: 3.87871E-05,
  b: 2.9866,
  c: 1263.42,
  S: 158.44,
  PLF: 0.77,
  DC: 50,
  inv_CF: 0.951,
  economyCW: 0.960,
  businessCW: 1.26,
  firstCW: 2.40,
  EF: 3.150,
  P: 0.51,
  M: 2
}

const longHaulParams: FlightParameters = {
  a: 0.000134576,
  b: 6.1798,
  c: 3446.20,
  S: 280.39,
  PLF: 0.77,
  DC: 125,
  inv_CF: 0.951,
  economyCW: 0.800,
  businessCW: 1.54,
  firstCW: 2.40,
  EF: 3.150,
  P: 0.51,
  M: 2
}

export class FlightCO2Calculator {

  private static flightClassWeight(
    flightClass: Itinerary.ComfortClass, economy: number, business: number, first: number): number {
    return flightClass === 'BUSINESS' ? business : flightClass === 'FIRST' ? first : economy
  }

  private static normalize(value: number, lowerBound: number, upperBound: number): number {
    return (value - lowerBound) / (upperBound - lowerBound);
  }

  private static interpolate(a: number, b: number, value: number): number {
    return b * value + a * (1 - value);
  }

  private static flightParameters(distanceKm: number): FlightParameters {
    const lowerBound = 1500.0;
    const upperBound = 2500.0;
    if (distanceKm <= lowerBound) {
      return shortHaulParams;
    }
    if (distanceKm >= upperBound) {
      return longHaulParams;
    }
    const normalizedDistance = FlightCO2Calculator.normalize(
      distanceKm, lowerBound, upperBound);

    const s = shortHaulParams;
    const l = longHaulParams;

    return new FlightParameters(
      FlightCO2Calculator.interpolate(s.a, l.a, normalizedDistance),
      FlightCO2Calculator.interpolate(s.b, l.b, normalizedDistance),
      FlightCO2Calculator.interpolate(s.c, l.c, normalizedDistance),
      FlightCO2Calculator.interpolate(s.S, l.S, normalizedDistance),
      FlightCO2Calculator.interpolate(s.PLF, l.PLF, normalizedDistance),
      FlightCO2Calculator.interpolate(s.DC, l.DC, normalizedDistance),
      FlightCO2Calculator.interpolate(s.inv_CF, l.inv_CF, normalizedDistance),
      FlightCO2Calculator.interpolate(s.economyCW, l.economyCW, normalizedDistance),
      FlightCO2Calculator.interpolate(s.businessCW, l.businessCW, normalizedDistance),
      FlightCO2Calculator.interpolate(s.firstCW, l.firstCW, normalizedDistance),
      FlightCO2Calculator.interpolate(s.EF, l.EF, normalizedDistance),
      FlightCO2Calculator.interpolate(s.P, l.P, normalizedDistance),
      FlightCO2Calculator.interpolate(s.M, l.M, normalizedDistance));
  }

  private static calculateCO2e(distanceKm: number, flightClass: Itinerary.ComfortClass) {
    const fp = FlightCO2Calculator.flightParameters(distanceKm);
    const x = distanceKm + fp.DC;
    const CW = FlightCO2Calculator.flightClassWeight(
      flightClass,
      fp.economyCW,
      fp.businessCW,
      fp.firstCW,
    );
    return (fp.a * x * x + fp.b * x + fp.c) /
      (fp.S * fp.PLF) *
      fp.inv_CF *
      CW *
      (fp.EF * fp.M + fp.P);
  }

  static calculate(departure: Itinerary.Coords, arrival: Itinerary.Coords,
    flightType: Itinerary.CardTripType, flightClass: Itinerary.ComfortClass) {
    const multiplier =
      flightType === 'ONE_WAY' ? 1.0 : 2.0;
    const distanceKm = DistanceCalculator.calculate(departure, arrival);
    const roughValue = FlightCO2Calculator.calculateCO2e(distanceKm, flightClass) * multiplier;
    return Math.floor(roughValue) / 1000.0
  }
}
