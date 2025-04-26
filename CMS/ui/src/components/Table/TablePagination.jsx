import {
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Space,
  Text,
} from "@tonic-ui/react";
import { AngleLeftIcon, AngleRightIcon } from "@tonic-ui/react-icons";
import { isFinite } from "lodash";
import { useTranslation } from "react-i18next";
import {
  DEFAULT_LIMIT_LIST,
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
} from "@@constants";
import { usePagination } from "./utils";

export default function TablePagination({
  isFetching = false,
  page = DEFAULT_PAGE,
  total = 0,
  limit = DEFAULT_LIMIT,
  onChange = () => {},
}) {
  const { totalPages, isPrevPageDisabled, isNextPageDisabled, handleOnChange } =
    usePagination({ page, total, limit, onChange });
  const { t } = useTranslation();

  return (
    <Flex alignItems="center" justifyContent="end">
      <Text mr="2x">
        {t("Total: {{total}}", {
          total,
        })}
      </Text>
      <Divider orientation="vertical" height="6x" />
      <Menu placement="top">
        <MenuButton disabled={isFetching} variant="ghost">
          {t("{{limit}} per page", { limit })}
        </MenuButton>
        <MenuList>
          {DEFAULT_LIMIT_LIST.map((limitItem) => (
            <MenuItem
              key={limitItem}
              onClick={() =>
                handleOnChange({ limit: limitItem, page: DEFAULT_PAGE })
              }
            >
              {limitItem}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Divider orientation="vertical" height="6x" />
      <Space width="2x" />
      <Input
        width={40}
        px={0}
        textAlign="center"
        value={page}
        onChange={(e) => {
          if (!isFinite(Number(e.target.value))) return;

          handleOnChange({ limit, page: Number(e.target.value) });
        }}
        onFocus={(e) => {
          e.target.select();
        }}
      />
      <Space width="2x" />
      <Text>/</Text>
      <Space width="2x" />
      <Text>{totalPages}</Text>
      <Space width="2x" />
      <ButtonGroup
        variant="secondary"
        css={{
          "> *:not(:first-of-type)": {
            marginLeft: -1,
          },
        }}
      >
        <Button
          width="8x"
          disabled={isPrevPageDisabled || isFetching}
          onClick={() => handleOnChange({ limit, page: page - 1 })}
        >
          <AngleLeftIcon />
        </Button>
        <Button
          width="8x"
          disabled={isNextPageDisabled || isFetching}
          onClick={() => handleOnChange({ limit, page: page + 1 })}
        >
          <AngleRightIcon />
        </Button>
      </ButtonGroup>
    </Flex>
  );
}
