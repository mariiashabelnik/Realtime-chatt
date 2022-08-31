import { useState } from "react";
import {
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
  const [roomList] = useRecoilState(roomListAtom);
  const [activeRoom, setActiveRoom] = useRecoilState(activeRoomAtom);
  const roomListUI = roomList.map((item) => {
    let active = ["nav-tab"];
    if (activeRoom === item.room) {
      active.push("active-room");
    }
    return (
      <li key={item.id}>
        <div className={active.join(" ")}>
          <Button
            className="button"
            colorScheme="teal"
            variant="link"
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
            variant="link"
            onClick={() => {
              socket.emit("room", { action: "remove", room: item.room });
            }}
          >
            x
          </Button>
        </div>
      </li>
    );
  });

  /*
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
*/

  return (
    <div className="container">
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create channel name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value.toUpperCase());
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
