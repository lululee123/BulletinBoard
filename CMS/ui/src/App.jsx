import React from "react";
import { Routes, Route } from "react-router-dom";
import { Flex, Box, Divider } from "@tonic-ui/react";
import { DatabaseIcon } from "@tonic-ui/react-icons";
import { useTranslation } from "react-i18next";

import Base from "@@components/Base";
import Rooms from "@@pages/Rooms";
import RoomDetail from "@@pages/RoomDetail";
import StyledNavLink from "@@components/StyledNavLink";

const App = () => {
  const { t } = useTranslation();

  return (
    <Base>
      <Flex flex={1} overflow="hidden">
        <Box as="nav" width="150px" paddingTop="4x">
          <Box as="ul" margin={0} padding={0} listStyle="none">
            <StyledNavLink to="/" icon={<DatabaseIcon />} label={t("Rooms")} />
          </Box>
        </Box>
        <Divider orientation="vertical" />
        <Flex flex={1} flexDirection="column" overflowY="auto">
          <Routes>
            <Route path="/" element={<Rooms />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/room/:id" element={<RoomDetail />} />
            <Route path="*" element={<Rooms />} />
          </Routes>
        </Flex>
      </Flex>
    </Base>
  );
};

export default App;
