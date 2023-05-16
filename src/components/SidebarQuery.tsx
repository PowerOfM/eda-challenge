import { Button, Group, Input, Text, createStyles } from "@mantine/core";
import {
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconSearch,
} from "@tabler/icons-react";
import { ChangeEvent } from "react";
import { BBOX_NAMES } from "../common";

const ICONS = [IconArrowLeft, IconArrowDown, IconArrowRight, IconArrowUp];

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xs,
    borderBottom: `1px solid ${theme.colors.gray[3]}`,
  },
  label: {
    color: theme.colors.gray[7],
    fontSize: theme.fontSizes.xs,
    textTransform: "uppercase",
    marginBottom: "0.25rem",
  },
  grid: {
    display: "grid",
    gap: theme.spacing.xs,
    gridTemplateColumns: "1fr 1fr",
  },
}));

const INPUT_REGEX = /^[-\d.]+]$/;
export type InputBBox = [
  string | number,
  string | number,
  string | number,
  string | number
];

type SidebarQueryAreaProps = {
  value: InputBBox;
  onChange(value: InputBBox): void;
  onSubmit(): void;
  onUseViewport(): void;
};
export default function SidebarQuery({
  value,
  onChange,
  onSubmit,
  onUseViewport,
}: SidebarQueryAreaProps) {
  const { classes } = useStyles();

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const input = e.target.value;
    if (!INPUT_REGEX.test(input)) return;
    const newValue: InputBBox = [...value];
    newValue[index] = input;
    onChange(newValue);
  };

  return (
    <div className={classes.root}>
      <Text className={classes.label}>Query bounding box</Text>

      <div className={classes.grid}>
        {ICONS.map((Icon, index) => (
          <Input
            key={index}
            icon={<Icon size={16} />}
            onChange={(e) => handleChange(e, index)}
            placeholder={BBOX_NAMES[index]}
            value={value[index] || ""}
          />
        ))}
      </div>

      <Group grow spacing="xs" mt="xs">
        <Button onClick={onUseViewport} variant="subtle">
          Use Viewport
        </Button>
        <Button leftIcon={<IconSearch size={16} />} onClick={onSubmit}>
          Search
        </Button>
      </Group>
    </div>
  );
}
