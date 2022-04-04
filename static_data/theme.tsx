import { theme as chakraTheme, extendTheme } from "@chakra-ui/react"
// @ts-ignore
import resolveConfig from "tailwindcss/resolveConfig"
import tailwindConfig from "../tailwind.config"

const tailwind = resolveConfig(tailwindConfig);

const theme = extendTheme({
  colors: {
    // Add colors here, map from tailwind to chakra. we can't use spread operator because it
    // breaks some of chakras other styles
    'speech-blue': tailwind.theme.colors['speech-blue'],
    'speech-navy': tailwind.theme.colors['speech-navy'],
    'speech-light-grey': tailwind.theme.colors['speech-light-grey'],
    'speech-very-light-grey': tailwind.theme.colors['speech-very-light-grey']
  },
  // Style components individually below
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
    Tabs: {
      variants: {
        'enclosed-colored': {
          tab: {
            borderTopWidth: '2px',
            borderTopColor: 'speech-very-light-grey',
            background: 'speech-very-light-grey',
            _selected: {
              borderTopColor: 'speech-blue',
            },
          },
          tabpanel: {
            padding: '0'
          }
        },
      },
    },
    Modal: {
      modalcontent: {
        padding: '100px',
      },
      variants: {
        
      }
    }
  },
});

//


export default theme;
