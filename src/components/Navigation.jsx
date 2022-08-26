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
  ButtonGroup,
  Input,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { roomListAtom, activeRoomAtom } from "../store";

function Navigation(props) {
  const socket = props.socket;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [roomList] = useRecoilState(roomListAtom);
  const [activeRoom, setActiveRoom] = useRecoilState(activeRoomAtom);
  const roomListUI = roomList.map((item) => {
    let btnStyle = "outline";
    if (activeRoom === item.room) {
      btnStyle = "solid";
    }
    return (
      <li key={item.id}>
        <ButtonGroup size="sm" isAttached variant={btnStyle}>
          <Button
            className="button"
            colorScheme="teal"
            size="xs"
            onClick={() => {
              socket.emit("room", { action: "join", room: item.room });
              setActiveRoom(item.room);
            }}
          >
            {item.room}
          </Button>
          <Button
            className="button"
            colorScheme="teal"
            size="xs"
            onClick={() => {
              socket.emit("room", { action: "remove", room: item.room });
            }}
          >
            x
          </Button>
        </ButtonGroup>
        |
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
      <ol className="rooms">
        {roomListUI}
        <li>
          <Button
            colorScheme="teal"
            variant="outline"
            onClick={onOpen}
            size="xs"
          >
            +
          </Button>
        </li>
      </ol>{" "}
    </div>
  );
}

export default Navigation;
