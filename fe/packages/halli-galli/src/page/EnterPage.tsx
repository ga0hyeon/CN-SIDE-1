import React, {useState} from 'react';
import '../App.css'
import { useNavigate } from "react-router-dom";
import { EnterButton as EnterButton, PixelButton } from "ui-components";

function EnterPage() {
    const [nickname, setNickname] = useState<string>('홍길동');
    const movePage = useNavigate();

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    }

    return (
        <div className='App'>
            <span className='game-name'>흐르그르</span>
            <div>
                <input className='nickname-input'
                    placeholder='Nickname Here'
                    value={nickname}
                    onChange={handleChange}
                    name="nickname"
                    height='800'>
                </input>
                <PixelButton label="Enter" onClick={() => {
                    movePage('/game', { state: { nickname: nickname } })
                }}></PixelButton>
            </div>
        </div>
    )
}

export default EnterPage;