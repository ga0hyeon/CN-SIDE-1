import { useCallback, useRef, useState } from "react";
import useWebSocket, { Status } from "chromeside-board/src/hooks/UseWebSocket";

interface Card {
  type: string;
  num: number;
}
interface Player {
  nickname: string;
  index: number;
}
interface PlayerCard {
  player: Player;
  cards: Card[];
}
const HalliGalli = () => {
  const [nickname, setNickname] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerCards, setPlayerCards] = useState<PlayerCard[]>([]);
  const [openedCard, setOpendCard] = useState<Card[][]>([[], [], [], []]);
  const [playerState, setPlayerState] = useState<boolean[]>([true, true, true, true]);
  const [activePlayer, setActivePlayer] = useState(0);
  const [turn, setTurn] = useState(0);

  const messageHandle = useCallback((message: string) => {
    const {type, data} = JSON.parse(message);
    
    switch(type) {
      case "join":
        handleJoin(data);
        break;
      case "start":
        handleStart(data);
        break;
      case "open":
        handleOpen(data);
        break;
      case "ring":
        handleRing(data);
        break;
      case "success":
        handleSuccess(data);
        break;
      case "penalty":
        handlePanalty(data);
        break;
      case "lose":
        handleLose(data);
        break;
    }

  }, [])

  const handleJoin = (data:any) => {
    console.log("===JOIN", data);
    setPlayers(data);
  }
  const handleStart = (data:any) => {
    console.log("===START", data);
    const {playerCards, activePlayer, turn} = data;

    setPlayerCards(playerCards);
    setActivePlayer(activePlayer)
    setTurn(turn+1);
  }
  const handleOpen = (data:any) => {
    console.log("===OPEN", data);
    const {playerCards, openedCard, activePlayer, turn} = data;

    setOpendCard(openedCard);
    setPlayerCards(playerCards);
    setActivePlayer(activePlayer)
    setTurn(turn+1);
  }

  const handleRing = (data:any) => {
    console.log("===RING", data);

    console.log(`${data.clickPlayer.nickname}님이 종을 눌렀습니다.`);
  }

  const handleSuccess = (data:any) => {
    console.log("===SUCCESS", data);
    const {playerCards, openedCard} = data;

    setPlayerCards(playerCards);
    setOpendCard(openedCard);    
  }

  const handlePanalty = (data:any) => {
    console.log("===PANALTY", data);
    const {playerCards} = data;
    
    setPlayerCards(playerCards);
  }

  const handleLose = (data:any) => {
    const {playerState, activePlayer, turn} = data;

    setPlayerState(playerState);
    setActivePlayer(activePlayer)
    setTurn(turn+1);
  }

  const closeHandle = useCallback(() => {
    alert("연결 끊어짐")
  }, [])

  const { sendMessage, status } = useWebSocket(
    {
      url: import.meta.env.VITE_WSS_URL || "",
      onMessage: messageHandle,
      onClose: closeHandle
    }
  )

  const handleClickJoin = () => {
    sendMessage("halligalli", JSON.stringify({
      type: "join",
      nickname:nickname
    }));
  };

  const handleClickStart = () => {
    sendMessage("halligalli", JSON.stringify({
      type: "start",
    }));
  };

  const handleClickOpen = (playerIndex:number) => {
    sendMessage("halligalli", JSON.stringify({
      type: "open",
      player: players.find(x=>x.index===playerIndex)
    }));
  };

  const handleClickBell = (playerIndex:number) => {
    sendMessage("halligalli", JSON.stringify({
      type: "bell",
      player: players.find(x=>x.index===playerIndex)
    }));
  }

  return (
    <div className="App">
      <div>socket status : {status.toString()}</div>
      <div>turn : {turn}</div>
      <div>cards : {playerCards.length}</div>
      <div>
        activePlayer: {activePlayer+1}
      </div>
      <br></br>
      {players.map((p, i) => {
        return (
          <div key={i}>
            <div>player : [{p.index}, {playerState[p.index]?"alive" :"lose"}]{p.nickname}</div>
          </div>
        );
      })}
      <br></br>
      {playerCards.map((p, i) => {
        return (
          <div key={i}>
            <div>player : [{p!.player!.nickname}]{p!.cards!.length}</div>
          </div>
        );
      })}
      <br></br>
      <div>
        Opened Cards
        {openedCard.map((c, i) => {
          return (
            <div key={i}>
              {c.length > 0 ? (
                <div>
                  player : {players[i].nickname} / card : [
                  {c[c.length - 1].type}]{c[c.length - 1].num}
                </div>
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </div>
      <br></br>
      <label>nickname: </label><input onChange={(e)=> {
        setNickname(e.target.value);
      }} value={nickname}/>
      <button onClick={() => handleClickJoin()}>join</button><br/>
      <button onClick={() => handleClickStart()}>start</button><br/>
      <button onClick={() => handleClickOpen(0)}>open1</button>
      <button onClick={() => handleClickOpen(1)}>open2</button>
      <button onClick={() => handleClickOpen(2)}>open3</button>
      <button onClick={() => handleClickOpen(3)}>open4</button><br/>
      <button onClick={() => handleClickBell(0)}>bell0</button>
      <button onClick={() => handleClickBell(1)}>bell1</button>
      <button onClick={() => handleClickBell(2)}>bell2</button>
      <button onClick={() => handleClickBell(3)}>bell3</button><br/>
      <button>ring</button><br/>
      <button
        onClick={() => {
          console.log(players);
          console.log(playerCards);
          console.log(openedCard);
        }}
      >
        console
      </button>
    </div>
  );
};

export default HalliGalli;
