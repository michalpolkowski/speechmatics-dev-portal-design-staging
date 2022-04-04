import { theme as chakraTheme, extendTheme } from "@chakra-ui/react"
// @ts-ignore
import resolveConfig from "tailwindcss/resolveConfig"
import tailwindConfig from "../tailwind.config"

const tailwind = resolveConfig(tailwindConfig);

const theme = extendTheme({
  components: {
    Button: {
      variants: {
        solid: {
          color: '#fff',
          background: '#001A3B',
          _hover: {
            background: '#004bab',
          },
        },
      },
    },
  },
});

theme.colors.navy = tailwind.theme.colors['speech-navy'];


export default theme;
