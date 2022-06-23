import { useState, useEffect } from "react";
import "./App.css";
import socketIOClient from "socket.io-client";
import {
  Input,
  Stack,
  Button,
  Container,
  Box,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import MessageInput from "./components/MessageInput";

const ENDPOINT = "http://localhost:4000";

let socket;

function App() {
  // users name & login status
  const [name, setName] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  // if component has changed or is visible
  useEffect(() => {
    if (loggedIn === true) {
      // do connect
      socket = socketIOClient(ENDPOINT);

      // when connected
      socket.on("connect", () => {
        // send users name
        socket.emit("setName", { name: name });
      });

      // when server sends action
      socket.on("action", (data) => {
        console.log(data);
      });

      return () => socket.disconnect();
    }
  }, [loggedIn, name]);

  // show login page
  if (loggedIn === false) {
    return (
      <div>
        <Container>
          <Box borderWidth="1px" p={2} m={1} overflow="hidden">
            <Stack spacing={3}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setLoggedIn(true);
                }}
              >
                <Input
                  placeholder="Enter your nickname:"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  size="md"
                />
                <Button colorScheme="blue" type="submit">
                  Login
                </Button>
              </form>
            </Stack>
          </Box>
        </Container>
      </div>
    );
  }

  // method to send message
  const sendMessage = (room, msg) => {
    socket.emit("message", { msg: msg, room: room });
  };

  return (
    <Grid
      templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
      gridTemplateRows={"50px 1fr 100px"}
      gridTemplateColumns={"150px 1fr"}
      h="100vh"
      gap="1"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem pl="2" bg="orange.300" area={"header"}>
        Header
      </GridItem>
      <GridItem pl="2" bg="pink.300" area={"nav"}>
        Nav
      </GridItem>
      <GridItem pl="2" bg="green.300" area={"main"}>
        Main
      </GridItem>
      <GridItem pl="2" bg="blue.300" area={"footer"}>
        <MessageInput />
      </GridItem>
    </Grid>
  );
}

export default App;
