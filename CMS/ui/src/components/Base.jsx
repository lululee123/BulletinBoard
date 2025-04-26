import React from "react";
import { Global, css } from "@emotion/react";
import {
  Flex,
  Box,
  Divider,
  PortalManager, // Manages portals in the application
  ToastManager, // Manages toasts in the application
  TonicProvider, // Provides theme and context for Tonic UI components
  useColorMode, // Hook to manage color mode (e.g., light/dark)
  useColorStyle, // Hook to manage color style
  useTheme, // Hook to access the theme object
} from "@tonic-ui/react";
import PropTypes from "prop-types";
import {} from "react-router-dom";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HomeIcon, SunIcon, MoonIcon } from "@tonic-ui/react-icons";

import { DARK_MODE, LIGHT_MODE } from "@@constants/colorMode";
import i18next from "@@utils/i18next";
import IconWithStyle from "@@components/IconWithStyle";

const Layout = ({ children }) => {
  const [colorMode, setColorMode] = useColorMode();
  const [colorStyle] = useColorStyle();
  const { fontSizes, lineHeights } = useTheme();
  const backgroundColor = colorStyle.background.primary;
  const color = colorStyle.color.primary;

  const toggleColorMode = () => {
    const nextColorMode = {
      [DARK_MODE]: LIGHT_MODE,
      [LIGHT_MODE]: DARK_MODE,
    }[colorMode];
    setColorMode(nextColorMode);
  };

  return (
    <>
      <Global
        styles={css`
          :root,
          :host {
            color-scheme: ${colorMode};
          }
          :focus:not(:focus-visible) {
            outline: none;
          }
          body {
            font-size: ${fontSizes.md};
            line-height: ${lineHeights.md};
          }
        `}
      />
      <Flex
        flexDirection="column"
        backgroundColor={backgroundColor}
        height="100vh"
      >
        <Box
          as="header"
          backgroundColor={backgroundColor}
          color={color}
          zIndex={1200}
          width="100%"
          height="12x"
        >
          <Flex
            height="12x"
            alignItems="center"
            justifyContent="space-between"
            paddingX="4x"
            boxSizing="border-box"
          >
            <Box>
              <Link to="/">
                <IconWithStyle>
                  <HomeIcon size="8x" />
                </IconWithStyle>
              </Link>
            </Box>
            <Box>
              <IconWithStyle hoverable>
                {colorMode === DARK_MODE && (
                  <SunIcon size="6x" onClick={toggleColorMode} />
                )}
                {colorMode === LIGHT_MODE && (
                  <MoonIcon size="6x" onClick={toggleColorMode} />
                )}
              </IconWithStyle>
            </Box>
          </Flex>
        </Box>
        <Divider />
        <Flex flex={1} overflow="hidden">
          {children}
        </Flex>
      </Flex>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

const App = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <I18nextProvider i18n={i18next}>
      <TonicProvider
        colorMode={{
          defaultValue: DARK_MODE,
        }}
        useCSSBaseline={true} // If `true`, apply CSS reset and base styles
      >
        <ToastManager
          // Ensure that `ToastManager` is positioned above `PortalManager` to allow toast notifications to be displayed within a portal.
          TransitionProps={{
            sx: {
              '[data-toast-placement^="top"] > &:first-of-type': {
                mt: "4x", // the space to the top edge of the screen
              },
              '[data-toast-placement^="bottom"] > &:last-of-type': {
                mb: "4x", // the space to the bottom edge of the screen
              },
              '[data-toast-placement$="left"] > &': {
                ml: "4x", // the space to the left edge of the screen
              },
              '[data-toast-placement$="right"] > &': {
                mr: "4x", // the space to the right edge of the screen
              },
            },
          }}
        >
          <PortalManager>
            <Router>
              <QueryClientProvider client={queryClient}>
                <Layout>{children}</Layout>
              </QueryClientProvider>
            </Router>
          </PortalManager>
        </ToastManager>
      </TonicProvider>
    </I18nextProvider>
  );
};

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
