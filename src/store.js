import { atom } from "recoil";

export const roomListAtom = atom({
  key: "roomListState",
  default: [],
});

export const activeRoomAtom = atom({
  key: "activeRoomState",
  default: "",
});

export const historyAtom = atom({
  key: "historyState",
  default: [],
});
