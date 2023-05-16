import { LoadingOverlay, createStyles } from "@mantine/core";
import { BBOX_NAMES, ImageBBox } from "../common";

const useStyles = createStyles((theme) => ({
  root: {
    maxHeight: "100%",
    overflow: "auto",
  },
  entry: {
    display: "flex",
    padding: theme.spacing.xs,
    borderTop: `1px solid transparent`,
    borderBottom: `1px solid ${theme.colors.gray[3]}`,
    img: {
      width: "5rem",
    },
    ":hover": {
      background: theme.colors[theme.primaryColor][1],
    },
  },
  active: {
    background: theme.colors[theme.primaryColor][1],
    borderColor: theme.colors[theme.primaryColor][3],
  },
  coords: {
    alignSelf: "flex-start",
    padding: theme.spacing.xs,
    flex: 1,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: theme.spacing.xs,
    fontSize: theme.fontSizes.xs,
  },
}));

type SidebarResultsProps = {
  active?: ImageBBox;
  loading: boolean;
  data?: ImageBBox[];
  onClick(e: ImageBBox): void;
};
export default function SidebarResults({
  active,
  loading,
  data,
  onClick,
}: SidebarResultsProps) {
  const { cx, classes } = useStyles();

  return (
    <div className={classes.root}>
      <LoadingOverlay visible={loading} />

      {data?.map((entry) => (
        <div
          key={entry.id}
          className={cx(
            classes.entry,
            active?.id === entry.id && classes.active
          )}
          onClick={() => onClick(entry)}
        >
          <img src={entry.url} alt="satellite" />
          <div className={classes.coords}>
            {entry.bbox.map((val, i) => (
              <span key={i}>
                {BBOX_NAMES[i][0]}: {Math.round(val * 10000) / 10000}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
