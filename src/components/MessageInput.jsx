import { useState } from "react";
import {
  Box,
  Button,
  Input,
  FormLabel,
  HStack,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { useRecoilValue } from "recoil";
import { activeRoomAtom } from "../store";

function MessageInput(props) {
  const socket = props.socket;
  const [message, setMessage] = useState("");
  const activeRoom = useRecoilValue(activeRoomAtom);

  if (activeRoom === "") {
    return <div>Select a room first</div>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        socket.emit("message", { msg: message, room: activeRoom });
        setMessage("");
      }}
    >
      <Box borderWidth="0px" p={2} m={1} overflow="hidden">
        <FormLabel htmlFor="name"></FormLabel>
        <HStack>
          <InputGroup size="md">
            <Input
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              placeholder="Please,type your message here"
            />
          </InputGroup>
          <Button
            size="sm"
            type="submit"
            colorScheme="messenger"
            rightIcon={<ArrowRightIcon />}
          >
            Send
          </Button>
        </HStack>
      </Box>
    </form>
  );
}

export default MessageInput;

/*
<IconButton
              icon={<ArrowRightIcon />}
              mt={4}
              colorScheme="teal"
              type="submit"
            >
              Submit
            </IconButton>
            */
