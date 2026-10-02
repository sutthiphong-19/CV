import { useEffect, useRef } from "react";

const DEG = Math.PI / 180;

// Simplified geographic outlines used to generate a dense land point-cloud.
// Coordinates follow [longitude, latitude] so markers and land use one projection.
const LAND_POLYGONS = [
  [
    [-168, 71], [-150, 70], [-135, 59], [-124, 50], [-124, 40], [-117, 32],
    [-107, 24], [-97, 18], [-86, 20], [-82, 28], [-75, 35], [-66, 44],
    [-54, 48], [-58, 57], [-75, 63], [-96, 72], [-125, 74], [-150, 73],
  ],
  [
    [-81, 12], [-70, 11], [-59, 7], [-50, 1], [-44, -10], [-39, -23],
    [-52, -35], [-61, -45], [-70, -54], [-75, -40], [-72, -25], [-78, -10],
  ],
  [
    [-18, 35], [-6, 37], [10, 36], [25, 32], [35, 23], [43, 12], [51, 11],
    [43, -12], [34, -28], [20, -35], [9, -34], [-1, -24], [-11, -6], [-17, 12],
  ],
  [
    [-10, 36], [-10, 44], [2, 50], [16, 56], [30, 60], [46, 66], [70, 72],
    [100, 76], [130, 70], [155, 61], [169, 53], [158, 44], [142, 42],
    [132, 34], [121, 24], [112, 19], [104, 8], [97, 5], [90, 20],
    [78, 8], [69, 23], [58, 28], [49, 37], [36, 41], [25, 36], [12, 37],
  ],
  [
    [112, -11], [130, -10], [145, -17], [154, -28], [147, -39], [130, -43],
    [115, -35], [111, -23],
  ],
  [
    [-54, 59], [-44, 60], [-29, 69], [-24, 78], [-39, 83], [-57, 80], [-68, 70],
  ],
  [[129, 31], [143, 31], [146, 45], [139, 47], [132, 39]],
  [[95, 5], [108, 7], [119, 1], [131, -5], [124, -11], [110, -8], [101, -2]],
  [[166, -34], [179, -37], [176, -47], [168, -46]],
  [[47, -13], [51, -16], [50, -26], [45, -24]],
];

function pointInPolygon(lon, lat, polygon) {
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    const intersects =
      yi > lat !== yj > lat &&
      lon < ((xj - xi) * (lat - yi)) / (yj - yi || Number.EPSILON) + xi;

    if (intersects) inside = !inside;
  }

  return inside;
}

const LAND_POINTS = [];

for (let lat = -55; lat <= 82; lat += 2.5) {
  for (let lon = -177.5; lon <= 180; lon += 2.5) {
    if (LAND_POLYGONS.some((polygon) => pointInPolygon(lon, lat, polygon))) {
      LAND_POINTS.push([lon, lat]);
    }
  }
}

function project(lon, lat, rotation, centerX, centerY, radius) {
  const latitude = lat * DEG;
  const relativeLongitude = (lon - rotation) * DEG;
  const depth = Math.cos(latitude) * Math.cos(relativeLongitude);

  return {
    x: centerX + radius * Math.cos(latitude) * Math.sin(relativeLongitude),
    y: centerY - radius * Math.sin(latitude),
    depth,
    visible: depth > 0,
  };
}

function drawVisibleLine(context, coordinates, rotation, centerX, centerY, radius) {
  let drawing = false;
  context.beginPath();

  coordinates.forEach(([lon, lat]) => {
    const point = project(lon, lat, rotation, centerX, centerY, radius);

    if (!point.visible) {
      drawing = false;
      return;
    }

    if (!drawing) {
      context.moveTo(point.x, point.y);
      drawing = true;
    } else {
      context.lineTo(point.x, point.y);
    }
  });

  context.stroke();
}

function GlobeCanvas({ selectedZone, paused }) {
  const canvasRef = useRef(null);
  const selectedRef = useRef(selectedZone);
  const pausedRef = useRef(paused);
  const rotationRef = useRef(selectedZone.longitude);

  useEffect(() => {
    selectedRef.current = selectedZone;
    rotationRef.current = selectedZone.longitude;
  }, [selectedZone]);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frameId;
    let previousTime = performance.now();

    const resizeCanvas = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(bounds.width * pixelRatio));
      canvas.height = Math.max(1, Math.round(bounds.height * pixelRatio));
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const draw = (time) => {
      const bounds = canvas.getBoundingClientRect();
      const width = bounds.width;
      const height = bounds.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.max(4, Math.min(width, height) * 0.44);
      const elapsed = Math.min(50, time - previousTime);
      previousTime = time;

      if (!pausedRef.current && !reduceMotion) {
        rotationRef.current = (rotationRef.current + elapsed * 0.0045 + 540) % 360 - 180;
      }

      const rotation = rotationRef.current;
      context.clearRect(0, 0, width, height);

      const ocean = context.createRadialGradient(
        centerX - radius * 0.35,
        centerY - radius * 0.4,
        radius * 0.08,
        centerX,
        centerY,
        radius
      );
      ocean.addColorStop(0, "#60a5fa");
      ocean.addColorStop(0.45, "#1d6dc2");
      ocean.addColorStop(0.78, "#123f78");
      ocean.addColorStop(1, "#061b36");
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.fillStyle = ocean;
      context.fill();

      context.save();
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.clip();

      context.strokeStyle = "rgba(219, 234, 254, 0.20)";
      context.lineWidth = 0.7;

      for (let lat = -60; lat <= 60; lat += 30) {
        const coordinates = [];
        for (let lon = -180; lon <= 180; lon += 3) coordinates.push([lon, lat]);
        drawVisibleLine(context, coordinates, rotation, centerX, centerY, radius);
      }

      for (let lon = -180; lon < 180; lon += 30) {
        const coordinates = [];
        for (let lat = -90; lat <= 90; lat += 3) coordinates.push([lon, lat]);
        drawVisibleLine(context, coordinates, rotation, centerX, centerY, radius);
      }

      LAND_POINTS.forEach(([lon, lat]) => {
        const point = project(lon, lat, rotation, centerX, centerY, radius);
        if (!point.visible) return;

        const dotSize = 0.65 + point.depth * 1.05;
        context.beginPath();
        context.arc(point.x, point.y, dotSize, 0, Math.PI * 2);
        context.fillStyle = `rgba(110, 231, 183, ${0.42 + point.depth * 0.5})`;
        context.fill();
      });

      context.strokeStyle = "rgba(167, 243, 208, 0.76)";
      context.lineWidth = 0.7;
      LAND_POLYGONS.forEach((polygon) => {
        drawVisibleLine(
          context,
          [...polygon, polygon[0]],
          rotation,
          centerX,
          centerY,
          radius
        );
      });

      const shade = context.createLinearGradient(
        centerX - radius,
        centerY,
        centerX + radius,
        centerY
      );
      shade.addColorStop(0, "rgba(2, 6, 23, 0.46)");
      shade.addColorStop(0.38, "rgba(2, 6, 23, 0)");
      shade.addColorStop(0.76, "rgba(2, 6, 23, 0.08)");
      shade.addColorStop(1, "rgba(2, 6, 23, 0.62)");
      context.fillStyle = shade;
      context.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);
      context.restore();

      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.strokeStyle = "rgba(191, 219, 254, 0.78)";
      context.lineWidth = 1.5;
      context.stroke();

      const marker = project(
        selectedRef.current.longitude,
        selectedRef.current.latitude,
        rotation,
        centerX,
        centerY,
        radius
      );

      if (marker.visible) {
        const pulse = 5 + Math.sin(time / 260) * 1.4;
        context.beginPath();
        context.arc(marker.x, marker.y, pulse, 0, Math.PI * 2);
        context.fillStyle = "rgba(246, 196, 83, 0.22)";
        context.fill();

        context.beginPath();
        context.arc(marker.x, marker.y, 3.2, 0, Math.PI * 2);
        context.fillStyle = "#f6c453";
        context.fill();
        context.lineWidth = 1.4;
        context.strokeStyle = "#ffffff";
        context.stroke();
      }

      frameId = window.requestAnimationFrame(draw);
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);
    frameId = window.requestAnimationFrame(draw);

    return () => {
      resizeObserver.disconnect();
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="world-clock-canvas" aria-hidden="true" />;
}

export default GlobeCanvas;
