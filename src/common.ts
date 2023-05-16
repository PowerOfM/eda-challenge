// Shared types & utilites
import type { Feature } from "geojson";

// Bounding Box (loosely based off of https://datatracker.ietf.org/doc/html/rfc7946#section-5)
export type BBox = [number, number, number, number];
export const BBOX_INIT: BBox = [0, 0, 0, 0];
export const BBOX_NAMES = ["West", "South", "East", "North"];

// Mock-API response type
export type ImageBBox = {
  id: string;
  bbox: BBox;
  url: string;
};

// Map coords
export type LatLng = {
  lat: number;
  lng: number;
};

/**
 * Converts an array of bounding boxes to polygon geometries
 * @param bboxes Array of bounding boxes
 * @returns a Feature Collection with bboxes converted to polygons
 */
export function makeFeatureCollection(
  bboxes: BBox[]
): GeoJSON.FeatureCollection<GeoJSON.Geometry> {
  // Convert BBox format into GeoJSON geometry
  const features: Feature[] = [];
  for (let i = 0; i < bboxes.length; i++) {
    const [w, s, e, n] = bboxes[i];
    features.push({
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [w, n],
            [w, s],
            [e, s],
            [e, n],
            [w, n],
          ],
        ],
        bbox: bboxes[i],
      },
    });
  }

  return {
    type: "FeatureCollection",
    features,
  };
}
export function makeEmptyFeatureCollection(): GeoJSON.FeatureCollection<GeoJSON.Geometry> {
  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [],
        },
      },
    ],
  };
}
