import { Flex, Button, Space, Box, Divider } from "@tonic-ui/react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const ActionBar = ({ isCanSave = false, onSave }) => {
  const { t } = useTranslation();

  return (
    <Box position="absolute" bottom="0" left="0" width="100%">
      <Divider />
      <Flex width="100%" height="100%" alignItems="center" padding="4x">
        <Button
          variant="primary"
          minWidth="20x"
          onClick={onSave}
          disabled={!isCanSave}
        >
          {t("Save")}
        </Button>
        <Space width="2x" />
        <Link to="/rooms">
          <Button minWidth="20x">{t("Cancel")}</Button>
        </Link>
      </Flex>
    </Box>
  );
};
ActionBar.propTypes = {
  isCanSave: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default ActionBar;
