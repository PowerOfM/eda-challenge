import { Box, Text } from "@mantine/core";
import { IconCubeUnfolded } from "@tabler/icons-react";

export default function SidebarLogo() {
  return (
    <Box
      sx={(theme) => ({
        background: theme.colors.gray[2],
        display: "flex",
        alignItems: "center",
        padding: theme.spacing.sm,
        borderBottom: `1px solid ${theme.colors.gray[3]}`,
        svg: {
          color: theme.colors[theme.primaryColor][4],
        },
      })}
    >
      <IconCubeUnfolded />
      <Text pl="xs" fz="sm">
        Spatiotemporal Catalog Search
      </Text>
    </Box>
  );
}
