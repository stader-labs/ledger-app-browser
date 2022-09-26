import {
  extendTheme,
  withDefaultColorScheme,
  withDefaultProps,
} from "@chakra-ui/react";

export const customTheme: any = extendTheme(
  {
    config: {
      initialColorMode: "light",
    },
    semanticTokens: {
      colors: {
        Polygon_Color: {
          default: "#7630EC",
          _dark: "#7630EC",
        },
        Polygon_Background: {
          default: "#F0F1F5",
          _dark: "#1D1D1D",
        },
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: "near",
    components: ["Button"],
  }),
  withDefaultProps({
    defaultProps: {
      backgroundColor: "#2FA8AF",
      color: "#FFFFFF",
    },
    components: ["Button"],
  })
);
