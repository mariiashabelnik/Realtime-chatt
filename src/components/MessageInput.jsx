import React from "react";
import { Box, Input, IconButton, FormLabel, HStack } from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";

function MessageInput(props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert("Submit");
      }}
    >
      <Box borderWidth="1px" p={2} m={1} overflow="hidden">
        <FormLabel htmlFor="name">First name</FormLabel>
        <HStack>
          <Input id="name" placeholder="name" />

          <IconButton
            icon={<ArrowRightIcon />}
            mt={4}
            colorScheme="teal"
            type="submit"
          >
            Submit
          </IconButton>
        </HStack>
      </Box>
    </form>
  );
}

export default MessageInput;
