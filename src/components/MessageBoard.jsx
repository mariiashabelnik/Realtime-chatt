import { useRecoilValue } from "recoil";
import { activeRoomAtom, historyAtom } from "../store";

function MessageBoard() {
  const activeRoom = useRecoilValue(activeRoomAtom);
  const historyList = useRecoilValue(historyAtom);
  const historyUI = historyList.map((item) => {
    return (
      <div key={item.id}>
        <div>
          <div className="avatar">{item.username.toUpperCase()}</div> -{" "}
          {item.username} {item.message} {item.created_at}
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
