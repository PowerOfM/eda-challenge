import { LineLayer, FillLayer } from "mapbox-gl";

export const LAYER_QUERY_BBOX: LineLayer = {
  id: "query_bbox_line",
  type: "line",
  source: "query_bbox",
  paint: {
    "line-color": "#228be6",
    "line-width": 5,
    "line-opacity": 0.8,
  },
};
export const LAYER_ACTIVE_BBOX: FillLayer = {
  id: "active_bbox_fill",
  type: "fill",
  source: "active_bbox",
  layout: {
    visibility: "visible",
  },
  paint: {
    "fill-color": "#ff00ff",
    "fill-opacity": 0.25,
  },
};

export const LAYER_RESULT_FILL: FillLayer = {
  id: "results_fill",
  type: "fill",
  source: "results",
  paint: {
    "fill-color": "#000000",
    "fill-opacity": 0.1,
  },
};

export const LAYER_RESULT_LINE: LineLayer = {
  id: "results_line",
  type: "line",
  source: "results",
  paint: {
    "line-color": "#000000",
    "line-opacity": 0.5,
  },
};
