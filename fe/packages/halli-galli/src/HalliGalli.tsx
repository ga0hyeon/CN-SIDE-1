import { useRef, useState } from "react";
// import "../App.css";

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

const CARD_COUNT = [1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 5];
const CARD_TYPE = ["Strawberry", "Banana", "Cherry", "Plum"];
const CARD: Card[] = [];

const HalliGalli = () => {
  const [nickname, setNickname] = useState("");
  const [playerCards, setPlayerCards] = useState<PlayerCard[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [openedCard, setOpendCard] = useState<Card[][]>([[], [], [], []]);
  const [playerState, setPlayerState] = useState<boolean[]>([true, true, true, true]);
  const [activePlayer, setActivePlayer] = useState(0);
  const turn = useRef(0);

  const cardShuffle = (cards: Card[]) => {
    return cards.sort(() => Math.random() - 0.5);
  };

  const cardSplitter = (cards: Card[], players: Player[], size: number) => {
    const arr = [];

    for (let i = 0; i < cards.length; i += size) {
      arr.push({
        player: players[i / size],
        cards: cards.slice(i, i + size),
      });
    }

    return arr;
  };
  
    

  const handleJoin = () => {
    if(players.length < 4) {
      console.log("JOIN ", nickname);
      // const temp = [...players];
      setPlayers( prev => [...prev, {
          nickname: nickname,
          index: prev.length
        }]
      )
  
      setNickname("");
    } else {
      console.log("ROOM is Full");
    }
    
  };

  const handleStart = () => {
    CARD_COUNT.forEach((k, i) => {
      for (let j = 0; j < players.length; j++) {
        CARD.push({
          type: CARD_TYPE[j],
          num: k,
        });
      }
    });

    const shuffledCards = cardShuffle(cardShuffle(CARD));

    setPlayerCards(cardSplitter(shuffledCards, players, 14));
    setActivePlayer(turn.current % 4);

    console.log("START");
  };

  const handleOpen = () => {
    console.log(players[activePlayer].nickname + "'s card open");
    console.log("OPEN", playerCards);

    const pc = playerCards[activePlayer];

    if(pc.cards.length > 0) {
      const card = pc.cards.splice(0, 1)[0];

      setOpendCard((prev) => {
        const newCardList = [...prev];
        newCardList[activePlayer] = [...newCardList[activePlayer], card];
        return newCardList;
      });
  
      setPlayerCards((prev) => {
        prev[activePlayer] = pc;
        return prev;
      });
    } else {
      setPlayerState(prev => {
        prev[activePlayer] = false;
        return prev;
      })
    }
    
    turn.current++;

    setActivePlayer(turn.current % 4);
  };

  const handleBell = (playerIndex:number) => {
    console.log(players[playerIndex].nickname + " touch bell");

    // emit ring
    const sum = [0,0,0,0];
    
    openedCard.map((cards, index) => {
      let lastCard:Card = cards[cards.length-1];
      
      if(lastCard) {
        sum[CARD_TYPE.findIndex(x=> x===lastCard.type)] += lastCard.num;
      }

    });

    if(sum.filter(x => x ===5).length > 0) {
      // Success
      let award:Card[] = [];
      
      openedCard.map((cards, i) => {
        award.push(...cards);
      });

      const copy = [...playerCards];
      copy[playerIndex].cards.push(...award);
      
      setPlayerCards(copy);

      setOpendCard([[],[],[],[]]);
    } else {
      // Panalty
      const copy = [...playerCards];

      copy.map((pc, i) => {
        if(i != playerIndex && playerState[playerIndex] ) {
          pc.cards.push(...copy[playerIndex].cards.splice(0,1));
        }
      })
      setPlayerCards(copy);

      console.log("Panalty");
    }
  }

  return (
    <div className="App">
      <div>turn : {turn.current}</div>
      <div>cards : {playerCards.length}</div>
      <div>
        activePlayer: {players.length > 0 ? players[activePlayer].nickname : ""}
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
      <button onClick={() => handleJoin()}>join</button><br/>
      <button onClick={() => handleStart()}>start</button><br/>
      <button onClick={() => handleOpen()}>open</button><br/>
      <button onClick={() => handleBell(0)}>bell0</button>
      <button onClick={() => handleBell(1)}>bell1</button>
      <button onClick={() => handleBell(2)}>bell2</button>
      <button onClick={() => handleBell(3)}>bell3</button><br/>
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
