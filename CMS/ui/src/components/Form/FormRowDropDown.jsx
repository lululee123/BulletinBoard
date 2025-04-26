import React, { useState, useEffect, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { get, map, find, filter, includes } from 'lodash';
import {
  Grid,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  SearchInput,
  Box,
} from '@tonic-ui/react';
import { FormLabel } from './FormLabel';
import { FormInlineError } from './FormInlineError';

export const FormRowDropDown = ({
  required = false,
  isSearchable = false,
  searchInputPlaceholder = '',
  label = '',
  toolTip = '',
  value = '',
  width = '',
  listHeight = 200,
  placement = 'bottom-start',
  list = [],
  customMenuItem = null,
  dataAutomation = '',
  error = '',
  onChange = () => {},
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredItems, setFilteredItems] = useState(list);

  useEffect(() => {
    if (!searchValue) {
      setFilteredItems(list);
    } else {
      setFilteredItems(
        filter(list, ({ value: itemValue }) =>
          includes(itemValue.toLowerCase(), searchValue.toLowerCase())
        )
      );
    }
  }, [searchValue, list]);

  return (
    <>
      <Grid>
        <FormLabel required={required} label={label} toolTip={toolTip} />
      </Grid>
      <Grid>
        <Flex>
          <Menu
            display="block"
            placement={placement}
            width={width || 'auto'}
            data-automation={dataAutomation}
          >
            <MenuButton
              variant="secondary"
              width={width || '100%'}
              data-testid="form-dropdown-toggle"
              borderColor={error ? 'red:60' : 'gray:60'}
            >
              <Text>
                {get(
                  find(list, ({ key }) => key === value),
                  'value'
                )}
              </Text>
            </MenuButton>
            <MenuList
              width={width || 'max-content'}
              maxHeight={listHeight}
              overflow="auto"
            >
              {isSearchable && (
                <SearchInput
                  value={searchValue}
                  placeholder={searchInputPlaceholder}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onClearInput={() => setSearchValue('')}
                  mx="3x"
                  mb="2x"
                />
              )}
              {map(filteredItems, (item) => {
                const itemKey = get(item, 'key');
                const itemValue = get(item, 'value');
                const isDisabled = get(item, 'disabled', false);
                return (
                  <MenuItem
                    key={itemKey}
                    value={itemKey}
                    onClick={() => onChange(itemKey)}
                    disabled={isDisabled}
                    data-automation={`${dataAutomation}-${itemKey}`}
                  >
                    {customMenuItem ? (
                      cloneElement(customMenuItem, item)
                    ) : (
                      <Text size="sm">{itemValue}</Text>
                    )}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
        </Flex>
        {error && (
          <Box mt="1x">
            <FormInlineError>{error}</FormInlineError>
          </Box>
        )}
      </Grid>
    </>
  );
};

FormRowDropDown.propTypes = {
  required: PropTypes.bool,
  label: PropTypes.string,
  isSearchable: PropTypes.bool,
  searchInputPlaceholder: PropTypes.string,
  toolTip: PropTypes.string,
  placement: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  listHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  list: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      value: PropTypes.string,
    })
  ),
  customMenuItem: PropTypes.node,
  dataAutomation: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
};
