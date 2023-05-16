import { Navbar, createStyles } from "@mantine/core";
import { useState } from "react";
import { useQuery } from "react-query";
import { fetchImagesByBBox } from "./api/queries";
import { BBOX_INIT, BBox, ImageBBox } from "./common";
import MapBox from "./components/MapBox";
import SidebarLogo from "./components/SidebarLogo";
import SidebarQuery, { InputBBox } from "./components/SidebarQuery";
import SidebarResults from "./components/SidebarResults";

const SIDEBAR_WIDTH = 300;
const useStyles = createStyles({
  layout: {
    display: "flex",
  },
});

export default function App() {
  const { classes } = useStyles();
  const [inputBBox, setInputBBox] = useState<InputBBox>(BBOX_INIT);
  const [queryBBox, setQueryBBox] = useState<BBox | undefined>(undefined);
  const [active, setActive] = useState<ImageBBox | undefined>(undefined);
  const [mapState, setMapState] = useState(BBOX_INIT);

  const queryImages = useQuery({
    queryKey: ["images", queryBBox?.join()],
    queryFn: fetchImagesByBBox(queryBBox),
    enabled: !!queryBBox,
  });
  const handleSubmit = () =>
    setQueryBBox(inputBBox.map((e) => Number(e)) as BBox);
  const handleUseViewport = () => setInputBBox(mapState);

  return (
    <div className={classes.layout}>
      <Navbar width={{ base: SIDEBAR_WIDTH }}>
        <SidebarLogo />
        <SidebarQuery
          value={inputBBox}
          onChange={setInputBBox}
          onSubmit={handleSubmit}
          onUseViewport={handleUseViewport}
        />
        <SidebarResults
          loading={queryImages.isLoading}
          data={queryImages.data}
          active={active}
          onClick={setActive}
        />
      </Navbar>

      <MapBox
        onChange={setMapState}
        queryBBox={queryBBox}
        activeBBox={active?.bbox}
        results={queryImages.data || []}
      />
    </div>
  );
}
