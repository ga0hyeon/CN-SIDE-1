import { useState } from 'react'
import '../App.css'
import { EnterButton as EnterButton } from "ui-components";
import { useNavigate } from "react-router-dom";
import ChatSample from '../components/ChatSample';

function EnterPage() {
    const movePage = useNavigate();

    return (
        <div className='App'>
            <span>Awesome Logo or Name</span>
            <div>
                <input placeholder='Nickname Here'></input>
            </div>
            <div>
                <EnterButton label='' backgroundColor='grey'
                    onClick={() => {
                        movePage('/game')
                    }}></EnterButton>
                    <ChatSample />
            </div>
        </div>
    )
}

export default EnterPage;