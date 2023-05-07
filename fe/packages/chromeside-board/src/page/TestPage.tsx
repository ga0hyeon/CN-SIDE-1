import { useRef, useState } from 'react'
import '../App.css'

enum CardType {
	Strawberry,
	Cherry,
	Banana,
	Plum
}

interface Card {
  type: string,
  num: number
}
interface Player {
  nickname: string,
  index: number
}
interface PlayerCard {
  player: Player,
  cards: Card[]
}
interface OpenCard {
    player: Player,
    type: string,
    num: number
}

const CARD_COUNT = [1,1,1,1,1, 2,2,2, 3,3,3, 4,4, 5];
const CARD:Card[] = [];


const TestPage = () => {
    const [playerCards, setPlayerCards ] = useState<PlayerCard[]>([]);
    const [players, setPlayers] = useState<Player[]>([]);
    const [openedCard, setOpendCard] = useState<Card[][]>([[],[],[],[]]);
    const [activePlayer, setActivePlayer] = useState(0);
    const turn = useRef(0);

    const cardShuffle = (cards:Card[]) => {
        return cards.sort(() => Math.random() - 0.5);
    }

    const cardSplitter = (cards:Card[], players: Player[], size:number) => {
        const arr = [];
            
        for (let i = 0; i < cards.length; i += size) {
            
            arr.push({
                player: players[i/size],
                cards: cards.slice(i, i + size)
            })
        }
        
        return arr;
    }
    

    const handleJoin = () => {
        const temp = [];
        temp.push({
            nickname: "a",
            index:0
        });
        temp.push({
            nickname: "b",
            index:1
        });
        temp.push({
            nickname: "c",
            index:2
        });
        temp.push({
            nickname: "d",
            index:3
        }); 
        
        setPlayers(temp);

        CARD_COUNT.forEach((k,i) => {
            for(let j=0; j<temp.length ; j++) {
                CARD.push({
                    type: CardType[j],
                    num: k
                });
            }
        });
    }

    const handleStart = () => {
        const shuffledCards = cardShuffle(cardShuffle(CARD));

        setPlayerCards(cardSplitter(shuffledCards, players, 14));
        setActivePlayer(turn.current%4);
    }

    const handleOpen = () => {
        const pc = playerCards[activePlayer]; 
        const card = pc.cards.splice(0,1)[0];

        setOpendCard(prev => {
            const newCardList = [...prev];
            newCardList[activePlayer] = [...newCardList[activePlayer], card];
            return newCardList;
        })

        setPlayerCards(prev => {
            prev[activePlayer] = pc;
            return prev;
        })
        turn.current++;

        setActivePlayer(turn.current%4);
    }

    return (
        <div className='App'>
            <div>
                turn : {turn.current}
            </div>
            <div>
                player : {players.length}
            </div>
            <div>
                cards : {playerCards.length}
            </div>
            <div>
                activePlayer: {players.length>0 ? players[activePlayer].nickname:""}
            </div>
            <br></br>
            {
                players.map((p,i) => {
                    return (
                        <div key={i}>
                            <div>player : {p.nickname}</div>
                        </div>
                    )
                })
            }
            <br></br>
            <div>
                Open Cards
                {
                    openedCard.map((c,i) => {
                        return (
                            <div key={i}>
                                {c.length>0 ? (<div>player : {players[i].nickname} / card : [{c[c.length-1].type}]{c[c.length-1].num}</div>) : (<></>)}
                            </div>
                        )
                    })
                }
            </div>            
            <br></br>
            <button onClick={() => handleJoin()}>join</button>
            <button onClick={() => handleStart()}>start</button>
            <button onClick={() => handleOpen()}>open</button>
            <button>bell</button>
            <button>ring</button>
            <button onClick={() => {
                console.log(players);
                console.log(playerCards);
                console.log(openedCard);
            }}>console</button>
        </div>
    )
}

export default TestPage;