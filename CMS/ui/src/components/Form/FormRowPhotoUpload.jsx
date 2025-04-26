import React, { useRef } from "react";
import PropTypes from "prop-types";
import { map } from "lodash";
import {
  Grid,
  Flex,
  Box,
  Stack,
  Text,
  Image,
  useColorMode,
  useColorStyle,
} from "@tonic-ui/react";
import { CloseCircleOIcon } from "@tonic-ui/react-icons";
import IconWithStyle from "@@components/IconWithStyle";
import { FormInlineError } from "./FormInlineError";
import { FormLabel } from "./FormLabel";

export const FormRowPhotoUpload = ({
  required = false,
  label = "",
  toolTip = "",
  inputs = [],
}) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const inputRef = useRef(null);

  const handleFilesChange = (e, value, onChange) => {
    const files = Array.from(e.target.files);
    const newPreviews = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        if (newPreviews.length === files.length) {
          onChange([...value, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });

    // Reset the input so selecting the same file again works
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleDelete = (index, value, onChange) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <>
      <Grid>
        <FormLabel required={required} label={label} toolTip={toolTip} />
      </Grid>
      <Grid>
        <Flex>
          {map(inputs, ({ key, value, onChange, error, hint }) => (
            <Stack key={key} width="100%">
              <Stack key={key} width="100%">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  ref={inputRef}
                  onChange={(e) => handleFilesChange(e, value, onChange)}
                  style={{
                    color: "transparent",
                  }}
                />
                <Flex mt="4x" width="500px" flexWrap="wrap">
                  {value.map((src, index) => (
                    <Box key={index} position="relative" mr="2x" mb="2x">
                      <Image src={src} alt={`Preview ${index}`} width="100px" />
                      <IconWithStyle
                        onClick={() => handleDelete(index, value, onChange)}
                        position="absolute"
                        top="-2x"
                        right="-1x"
                        hoverable
                      >
                        <CloseCircleOIcon size="4x" />
                      </IconWithStyle>
                    </Box>
                  ))}
                </Flex>
              </Stack>
              {hint && (
                <Box mt="1x">
                  <Text size="sm" color={colorStyle?.color?.secondary}>
                    {hint}
                  </Text>
                </Box>
              )}
              {error && (
                <Box mt="1x">
                  <FormInlineError>{error}</FormInlineError>
                </Box>
              )}
            </Stack>
          ))}
        </Flex>
      </Grid>
    </>
  );
};

FormRowPhotoUpload.propTypes = {
  required: PropTypes.bool,
  label: PropTypes.string,
  toolTip: PropTypes.string,
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.array,
      onChange: PropTypes.func,
      error: PropTypes.string,
      hint: PropTypes.string,
    })
  ),
};
