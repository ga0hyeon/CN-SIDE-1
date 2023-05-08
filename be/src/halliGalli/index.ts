import sendMessageHandler from "../handlers/sendMessage";

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

const player:Player[] = [];
const playerCards:PlayerCard[] = [];
const openedCard:Card[][] = [[],[],[],[]];
const playerState:boolean[] = [true, true, true, true];
const activePlayer = 0;
const turn = 0;
  
const halliGalliHandler = (message:any) => {
    const msg = JSON.parse(message);

    switch(msg.type) {
        case "join": 
            handleJoin(msg.nickname);
            break;
        case "start":
            break;
        case "bell":
            break;

    }
}
const mockContext = {} as any;
const mockCallback = (error?: Error | string | null, result?: any) => { };
const handleJoin = (nickname:string) => {
    if(player.length<4) {
        player.push({
            nickname: nickname,
            index: player.length
        });

        sendMessageHandler(
            { "body": `{ "action": "sendmessage", "message": "join nickname" }` },
            mockContext,
            mockCallback
          );
    }
    
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

export default halliGalliHandler;