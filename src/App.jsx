import { useState, useEffect } from "react";
import "./App.css";
import socketIOClient from "socket.io-client";
import { Input, Stack, Button, Container, Box } from "@chakra-ui/react";

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
          <Box borderWidth="1px" p={2} m={1} orderRadius="lg" overflow="hidden">
            <Stack spacing={3}>
              <Input
                placeholder="Enter your nickname:"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                size="md"
              />
              <Button
                onClick={() => {
                  setLoggedIn(true);
                }}
                colorScheme="blue"
              >
                Login
              </Button>
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

  return <div className="App">hellllloooo</div>;
}

export default App;
