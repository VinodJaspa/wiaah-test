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

  var radius = 6371e3, //meters
    δ = Number(distance) / radius, // angular distance in radians
    θ = toRad(Number(bearing)),
    φ1 = toRad(coord[1]),
    λ1 = toRad(coord[0]);

  var φ2 = Math.asin(
    Math.sin(φ1) * Math.cos(δ) + Math.cos(φ1) * Math.sin(δ) * Math.cos(θ)
  );

  var λ2 =
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
