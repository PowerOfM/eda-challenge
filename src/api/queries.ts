import mockData from "../data/mock-data.json";
import { BBox, ImageBBox } from "../common";

const MOCK_DATA = mockData as ImageBBox[];
const MOCK_DELAY = 500; // ms

/**
 * Simulates API call. The assumption is the search through the catalogue would actually happen on a server.
 *
 * @param bbox Query region
 * @returns Array of images with bounding box and meta data
 */
export const fetchImagesByBBox = (bbox?: BBox) => (): Promise<ImageBBox[]> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      if (!bbox) {
        resolve([]);
        return;
      }

      // Check for overlaps
      const [w, s, e, n] = bbox;
      const results: ImageBBox[] = [];
      for (const entry of MOCK_DATA) {
        if (
          entry.bbox[0] < e &&
          entry.bbox[1] < n &&
          entry.bbox[2] > w &&
          entry.bbox[3] > s
        ) {
          results.push(entry);
        }
      }
      resolve(results);
    }, MOCK_DELAY)
  );
};
