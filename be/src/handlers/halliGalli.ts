import AWS from "aws-sdk";
import { Handler } from "aws-lambda";
import { WebSocketServer } from "ws";
import sendMessageHandler from "./sendMessage";

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

const players:Player[] = [];
let playerCards:PlayerCard[] = [];
let openedCard:Card[][] = [[],[],[],[]];
let playerState:boolean[] = [true, true, true, true];
let activePlayer = 0;
let turn = 0;


const handler: Handler = async (event, context, callback) => {
  const body = JSON.parse(event.body);
  const message = JSON.parse(body.message);
  
  const handleJoin = (nickname:string) => {
    if(players.length<4) {
        players.push({
            nickname: nickname,
            index: players.length
        });
    }
    const data = {
      action: body.action,
      message: {
        type:"join",
        data: players
      }
    };

    sendMessageHandler(
      { "body": JSON.stringify(data)},
      context,
      callback
      );
  }

  const handleStart = () => {
    const card = generateCard(CARD_COUNT, CARD_TYPE, players.length);
    const shuffledCards = cardShuffle(cardShuffle(card));

    playerCards = cardSplitter(shuffledCards, players, card.length/players.length);
    
    const data = {
      action: body.action,
      message: {
        type:"start",
        data: {
          playerCards,
          activePlayer,
          turn
        }
      }
    };

    sendMessageHandler(
      { "body": JSON.stringify(data)},
      context,
      callback
      );
  }
  const handleOpen = (clickPlayer:Player) => {
    if(clickPlayer.index !== activePlayer) {
      return;
    }

    const player = playerCards[activePlayer];

    if(player.cards.length > 0) {
      const openCard = player.cards.splice(0, 1)[0];

      openedCard[activePlayer].push(openCard);
      turn +=1;
      activePlayer = turn%players.length;

      const data = {
        action: body.action,
        message: {
          type:"open",
          data: {
            playerCards,
            openedCard,
            turn,
            activePlayer
          }
        }
      }
      sendMessageHandler(
        { "body": JSON.stringify(data)},
        context,
        callback
        );

    } else {
      playerState[activePlayer] = false;
      turn +=1;
      activePlayer = turn%players.length;

      const data = {
        action: body.action,
        message: {
          type:"lose",
          data: {
            playerState,
            turn,
            activePlayer
          }
        }
      };
      sendMessageHandler(
        { "body": JSON.stringify(data)},
        context,
        callback
        );
    }
  }

  const handleBell = (clickPlayer:Player, cardType:string[]) => {
    const ringData = {
      action: body.action,
      message: {
        type:"ring",
        data: {
          clickPlayer
        }
      }
    };
    sendMessageHandler(
      { "body": JSON.stringify(ringData)},
      context,
      callback
      );

      const sum = [0,0,0,0];
    
      openedCard.map((cards, index) => {
        let lastCard:Card = cards[cards.length-1];
        
        if(lastCard) {
          sum[cardType.findIndex(x=> x===lastCard.type)] += lastCard.num;
        }
      });
  
      if(sum.filter(x => x ===5).length > 0) {
        let award:Card[] = [];
      
        openedCard.map((cards, i) => {
          award.push(...cards);
        });
        playerCards[clickPlayer.index].cards.push(...award);
        openedCard=[[],[],[],[]];

        const data = {
          action: body.action,
          message: {
            type:"success",
            data: {
              playerCards,
              openedCard
            }
          }
        }
        sendMessageHandler(
          { "body": JSON.stringify(data)},
          context,
          callback
          );
      } else {
        playerCards.map((pc, i) => {
          if(i != clickPlayer.index && playerState[i] ) {
            pc.cards.push(...playerCards[clickPlayer.index].cards.splice(0,1));
          }
        })

        const data = {
          action: body.action,
          message: {
            type:"penalty",
            data: {
              playerCards
            }
          }
        }
        sendMessageHandler(
          { "body": JSON.stringify(data)},
          context,
          callback
          );
      }
  }

  const generateCard = (cardCount:number[], cardType:string[], playerNumber: number) => {
    const card:Card[] = [];
    cardCount.forEach((k, i) => {
      for (let j = 0; j < playerNumber; j++) {
        card.push({
          type: cardType[j],
          num: k,
        });
      }
    });

    return card;
  }

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

  switch(message.type) {
    case "join": 
      handleJoin(message.nickname);
      break;
    case "start":
      handleStart();
      break;
    case "open":
      handleOpen(message.player); 
      break;
    case "bell":
      handleBell(message.player, CARD_TYPE);
      break;
  }


  return { statusCode: 200 };
}

export default handler;
