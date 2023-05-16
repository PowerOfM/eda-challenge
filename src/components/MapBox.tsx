import { Box } from "@mantine/core";
import mapboxgl, { Map, GeoJSONSource, FillLayer } from "mapbox-gl";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  BBox,
  ImageBBox,
  LatLng,
  makeEmptyFeatureCollection,
  makeFeatureCollection,
} from "../common";
import {
  LAYER_ACTIVE_BBOX,
  LAYER_QUERY_BBOX,
  LAYER_RESULT_FILL,
  LAYER_RESULT_LINE,
} from "./mapBoxStyles";

const ACCESS_TOKEN =
  "pk.eyJ1IjoibWVzYmFobSIsImEiOiJjbGhreDh1cnUwd2cwM2ZxbHJtdGl1czZrIn0.O1RUgiPlSCjixmj_gXK3tQ";
const INIT_POS = { lat: 49.25, lng: -123.0 };
const INIT_ZOOM = 11;

mapboxgl.accessToken = ACCESS_TOKEN;

type MapBoxProps = {
  activeBBox?: BBox;
  queryBBox?: BBox;
  results: ImageBBox[];
  pos?: LatLng;
  zoom?: number;
  onChange?: (bbox: BBox) => void;
};
export default function MapBox({
  activeBBox,
  queryBBox,
  results,
  pos = INIT_POS,
  zoom = INIT_ZOOM,
  onChange,
}: MapBoxProps) {
  const divRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const [ready, setReady] = useState(false);

  // Initialize map and set initial center point
  useLayoutEffect(() => {
    if (!divRef.current || mapRef.current) return;

    const map: Map = new mapboxgl.Map({
      container: divRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: pos,
      zoom: zoom,
    });

    const handleMove = () => {
      if (!onChange) return;
      const bounds = map.getBounds();
      onChange([
        bounds.getWest(),
        bounds.getSouth(),
        bounds.getEast(),
        bounds.getNorth(),
      ]);
    };

    map.on("move", handleMove);
    map.on("load", () => {
      console.log("Map loaded");
      map.addSource("query_bbox", {
        type: "geojson",
        data: makeEmptyFeatureCollection(),
      });
      map.addSource("active_bbox", {
        type: "geojson",
        data: makeEmptyFeatureCollection(),
      });
      map.addSource("results", {
        type: "geojson",
        data: makeEmptyFeatureCollection(),
      });
      map.addLayer(LAYER_QUERY_BBOX);
      map.addLayer(LAYER_ACTIVE_BBOX);
      map.addLayer(LAYER_RESULT_FILL);
      map.addLayer(LAYER_RESULT_LINE);

      setReady(true);
      handleMove();
    });

    mapRef.current = map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update map position on change, provided that it's not already moving
  useEffect(() => {
    const map = mapRef.current;
    if (!map || map.isMoving()) return;
    map.setCenter(pos);
    map.setZoom(zoom);
  }, [pos, zoom]);

  // Set items
  useEffect(() => {
    if (!ready || !mapRef.current) return;
    const map = mapRef.current;

    if (queryBBox) {
      const source = map.getSource("query_bbox") as GeoJSONSource;
      source.setData(makeFeatureCollection([queryBBox]));
    }

    if (results.length) {
      const resultFC = makeFeatureCollection(
        results.map((entry) => entry.bbox)
      );
      const source = map.getSource("results") as GeoJSONSource;
      source.setData(resultFC);
    }
  }, [ready, queryBBox, results]);

  useEffect(() => {
    if (!ready || !mapRef.current) return;
    const map = mapRef.current;

    const layer = map.getLayer("active_bbox_fill") as FillLayer;
    if (!activeBBox) {
      if (!layer.layout) layer.layout = {};
      layer.layout.visibility = "none";
      return;
    }

    const source = map.getSource("active_bbox") as GeoJSONSource;
    source.setData(makeFeatureCollection([activeBBox]));
    if (!layer.layout) layer.layout = {};
    layer.layout.visibility = "visible";
  }, [ready, activeBBox]);

  return (
    <Box
      ref={(ref) => (divRef.current = ref)}
      sx={(theme) => ({
        position: "relative",
        flex: 1,
        alignSelf: "stretch",
        ".mapboxgl-control-container": {
          fontSize: theme.fontSizes.xs,
        },
      })}
    />
  );
}
