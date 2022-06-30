import React from "react";

import { useRecoilState } from "recoil";
import { activeRoomAtom, historyAtom } from "../store";

function MessageBoard(props) {
  const [activeRoom, setActiveRoom] = useRecoilState(activeRoomAtom);
  const [historyList, setHistoryList] = useRecoilState(historyAtom);
  const historyUI = historyList.map((item) => {
    return (
      <div key={item.id}>
        <div>
          <div className="avatar">
            {item.username.substr(0, 1).toUpperCase()}
          </div>{" "}
          - {item.username} {item.message} {item.created_at}
        </div>
      </div>
    );
  });

  return (
    <div>
      {activeRoom} {historyUI}
    </div>
  );
}

export default MessageBoard;
