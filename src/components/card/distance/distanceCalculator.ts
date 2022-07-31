export class DistanceCalculator {


  private static distanceInMetersBetween(lhs: Itinerary.Coords, rhs: Itinerary.Coords): number {

    const rad_per_deg = Math.PI / 180.0;  // PI / 180
    const rkm = 6371.0;// Earth radius in kilometers
    const rm = rkm * 1000.0;// Radius in meters

    const dlat_rad = (rhs.latitude - lhs.latitude) * rad_per_deg; // Delta, converted to rad
    const dlon_rad = (rhs.longitude - lhs.longitude) * rad_per_deg;

    const lat1_rad = lhs.latitude * rad_per_deg;
    const lat2_rad = rhs.latitude * rad_per_deg;

    const sinDlat = Math.sin(dlat_rad / 2);
    const sinDlon = Math.sin(dlon_rad / 2);

    const a = sinDlat * sinDlat + Math.cos(lat1_rad) * Math.cos(lat2_rad) * sinDlon * sinDlon;
    const c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return rm * c;
  }

  private static distanceInKmBetween(lhs: Itinerary.Coords, rhs: Itinerary.Coords) {
    return DistanceCalculator.distanceInMetersBetween(lhs, rhs) / 1000.0;
  }

  private static detourConstant(distanceKm: number): number {
    const lowerBound = 1500.0;
    const upperBound = 2500.0;

    const shortHaulDetourConstant = 50

    const longHaulParamsDetourConstant = 125

    if (distanceKm <= lowerBound) {
      return shortHaulDetourConstant;
    }
    if (distanceKm >= upperBound) {
      return longHaulParamsDetourConstant;
    }
    const normalizedDistance = (distanceKm - lowerBound) / (upperBound - lowerBound)

    const s = shortHaulDetourConstant;
    const l = longHaulParamsDetourConstant;

    return l * normalizedDistance + s * (1 - normalizedDistance)
  }

  private static correctedDistanceKm(distanceKm: number): number {
    return distanceKm + DistanceCalculator.detourConstant(distanceKm);
  }

  static calculate(origin: Itinerary.Coords, destination: Itinerary.Coords) {
    return DistanceCalculator.correctedDistanceKm(DistanceCalculator.distanceInKmBetween(
      origin, destination));
  }
}
