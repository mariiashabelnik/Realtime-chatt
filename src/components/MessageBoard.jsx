import { useRecoilValue } from "recoil";
import { activeRoomAtom, historyAtom, myname } from "../store";

const stringToColour = function (str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = "#";
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    colour += ("00" + value.toString(16)).substr(-2);
  }
  return colour;
};

function MessageBoard() {
  const activeRoom = useRecoilValue(activeRoomAtom);
  const name = useRecoilValue(myname);

  const historyList = useRecoilValue(historyAtom);
  const historyUI = historyList.map((item) => {
    const classes = ["one-message"];
    if (item.username === name) {
      classes.push("my-message");
    }
    const myColor = stringToColour(item.username);
    return (
      <div key={item.id} className={classes.join(" ")}>
        <div className="sender" style={{ color: myColor }}>
          {item.username}{" "}
        </div>
        <div className="message">{item.message}</div>
      </div>
    );
  });

  return (
    <div className="container">
      {activeRoom}
      <div className="all-messages">{historyUI}</div>
    </div>
  );
}

export default MessageBoard;
