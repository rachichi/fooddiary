// Generate intermediate points along a great-circle arc between two lat/lng points
export function arcPoints(
  from: [number, number],
  to: [number, number],
  steps = 50
): [number, number][] {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const toDeg = (r: number) => (r * 180) / Math.PI;

  const [lat1, lng1] = from.map(toRad);
  const [lat2, lng2] = to.map(toRad);

  const points: [number, number][] = [];

  for (let i = 0; i <= steps; i++) {
    const f = i / steps;
    const A = Math.sin((1 - f) * Math.PI) / Math.sin(Math.PI);
    const B = Math.sin(f * Math.PI) / Math.sin(Math.PI);

    const x =
      A * Math.cos(lat1) * Math.cos(lng1) +
      B * Math.cos(lat2) * Math.cos(lng2);
    const y =
      A * Math.cos(lat1) * Math.sin(lng1) +
      B * Math.cos(lat2) * Math.sin(lng2);
    const z = A * Math.sin(lat1) + B * Math.sin(lat2);

    const lat = toDeg(Math.atan2(z, Math.sqrt(x * x + y * y)));
    const lng = toDeg(Math.atan2(y, x));

    points.push([lat, lng]);
  }

  return points;
}
