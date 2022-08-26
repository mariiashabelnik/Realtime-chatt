import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { roomListAtom, historyAtom } from "./store";
import React from "react";

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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import MessageInput from "./components/MessageInput";
import Navigation from "./components/Navigation";
import MessageBoard from "./components/MessageBoard";

const ENDPOINT = import.meta.env.VITE_API;

//let socket;

function App() {
  // users name & login status
  const [name, setName] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [socket, setSocket] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [, setRoomList] = useRecoilState(roomListAtom);
  const [, setHistoryList] = useRecoilState(historyAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  // if component has changed or is visible
  useEffect(() => {
    if (loggedIn === true) {
      // do connect
      const conn = socketIOClient(ENDPOINT);

      // when connected
      conn.on("connect", () => {
        // send users name
        conn.emit("setName", { name: name });
        conn.emit("room", { action: "list" });
      });

      // when server sends action
      conn.on("action", (data) => {
        switch (data.action) {
          case "roomList":
            setRoomList(data.rooms);
            break;
          case "history":
            setHistoryList(data.list);
            console.log("Set history", data.list);
            break;
          case "error":
            onOpen();
            setErrorMsg(data.msg);
            break;
          default:
            console.log("todo", data);
            break;
        }
      });

      setSocket(conn);

      return () => conn.disconnect();
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

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Error
            </AlertDialogHeader>

            <AlertDialogBody>{errorMsg}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Grid
        className="content"
        templateAreas={`
                  "nav"
                  "main"
                  "footer"`}
        gridTemplateRows={"2em  1fr 100px"}
        gridTemplateColumns={"1fr"}
        h="100vh"
        gap="1"
        color="whiteAlpha.900"
        fontWeight="bold"
      >
        <GridItem bg="gray.800" area={"nav"}>
          <Navigation socket={socket} />
        </GridItem>
        <GridItem bg="gray.800" area={"main"}>
          <MessageBoard></MessageBoard>
        </GridItem>
        <GridItem bg="gray.800" area={"footer"}>
          <MessageInput socket={socket} />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
