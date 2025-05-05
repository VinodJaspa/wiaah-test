export function getCoordinatesAfterDistance(
  coord: [number, number],
  bearing: number,
  distance: number
) {
  /** http://www.movable-type.co.uk/scripts/latlong.html
     φ is latitude, λ is longitude, 
     θ is the bearing (clockwise from north), 
     δ is the angular distance d/R; 
     d being the distance travelled, R the earth’s radius*
     **/

  const radius = 6371e3, //meters
    δ = Number(distance) / radius, // angular distance in radians
    θ = toRad(Number(bearing)),
    φ1 = toRad(coord[1]),
    λ1 = toRad(coord[0]);

  const φ2 = Math.asin(
    Math.sin(φ1) * Math.cos(δ) + Math.cos(φ1) * Math.sin(δ) * Math.cos(θ)
  );

  let λ2 =
    λ1 +
    Math.atan2(
      Math.sin(θ) * Math.sin(δ) * Math.cos(φ1),
      Math.cos(δ) - Math.sin(φ1) * Math.sin(φ2)
    );

  λ2 = ((λ2 + 3 * Math.PI) % (2 * Math.PI)) - Math.PI; // normalise to -180..+180°

  return [toDeg(λ2), toDeg(φ2)]; //[lon, lat]
}

function toDeg(v: number) {
  return (v * 180) / Math.PI;
}
function toRad(v: number) {
  return (v * Math.PI) / 180;
}

function degrees_to_radians(degrees: number) {
  const pi = Math.PI;
  return degrees * (pi / 180);
}

function radians_to_degrees(radians: number) {
  const pi = Math.PI;
  return radians * (180 / pi);
}

export function createNewCoords(
  lat: number,
  lon: number,
  distanceInKm: number,
  angle: number = 90
) {
  const d = distanceInKm;
  const r_earth = 6378.1;
  const brng = degrees_to_radians(angle);

  const lat1 = degrees_to_radians(lat);
  const lon1 = degrees_to_radians(lon);

  const lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(d / r_earth) +
      Math.cos(lat1) * Math.sin(d / r_earth) * Math.cos(brng)
  );
  const lon2 =
    lon1 +
    Math.atan2(
      Math.sin(brng) * Math.sin(d / r_earth) * Math.cos(lat1),
      Math.cos(d / r_earth) - Math.sin(lat1) * Math.sin(lat2)
    );

  // const new_latitude = lat + (disInMeter / r_earth) * (180 / pi);
  // const new_longitude =
  //   lon + ((disInMeter / r_earth) * (180 / pi)) / cos((lat * pi) / 180);

  return {
    lat: radians_to_degrees(lat2),
    lon: radians_to_degrees(lon2),
  };
}

export async function createRadiusCoordsByKm({
  distanceInKm,
  lat,
  lon,
}: {
  lat: number;
  lon: number;
  distanceInKm: number;
}): Promise<{
  maxLat: number;
  minLat: number;
  maxLon: number;
  minLon: number;
}> {
  const { lat: maxLat } = createNewCoords(lat, lon, distanceInKm, 360);
  const { lat: minLat } = createNewCoords(lat, lon, -distanceInKm, 360);

  const { lon: maxLon } = createNewCoords(lat, lon, distanceInKm);
  const { lon: minLon } = createNewCoords(lat, lon, -distanceInKm);

  return {
    maxLat,
    maxLon,
    minLat,
    minLon,
  };
}
