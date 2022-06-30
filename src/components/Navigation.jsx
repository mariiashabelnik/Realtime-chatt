import React from "react";
import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  ModalFooter,
  ModalContent,
  Button,
  Input,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { roomListAtom, activeRoomAtom } from "../store";

function Navigation(props) {
  const socket = props.socket;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [roomList, setRoomList] = useRecoilState(roomListAtom);
  const [activeRoom, setActiveRoom] = useRecoilState(activeRoomAtom);

  const roomListUI = roomList.map((item) => {
    return (
      <li key={item.id}>
        <span
          className="joinRoom"
          onClick={() => {
            socket.emit("room", { action: "join", room: item.room });
            setActiveRoom(item.room);
          }}
        >
          {item.room}
        </span>
        <Button
          className="button"
          size="xs"
          onClick={() => {
            socket.emit("room", { action: "remove", room: item.room });
          }}
        >
          -
        </Button>
      </li>
    );
  });

  return (
    <div>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create channel name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              size="md"
              placeholder="Channel name"
            />
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                socket.emit("room", { action: "create", room: name });
                setName("");
                onClose();
              }}
              variant="ghost"
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Accordion className="navigation" defaultIndex={[0]} allowMultiple>
        <AccordionItem>
          <h2>
            MY CHATT
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Channels
              </Box>

              <AccordionIcon />
              <Button
                colorScheme="teal"
                variant="ghost"
                onClick={onOpen}
                size="xm"
              >
                +
              </Button>
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <ol>{roomListUI}</ol>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default Navigation;
