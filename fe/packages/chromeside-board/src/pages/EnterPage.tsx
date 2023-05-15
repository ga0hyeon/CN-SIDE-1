import { useState } from 'react'
import '../App.css'
import { EnterButton as EnterButton, PixelButton } from "ui-components";
import { useNavigate } from "react-router-dom";

function EnterPage() {
    const movePage = useNavigate();

    return (
        <div className='App'>
            <span>Awesome Logo or Name</span>
            <div>
                <input placeholder='Nickname Here'></input>
            </div>
            <div>
                <PixelButton label="Enter" onClick={() => {
                    movePage('/game')
                }}></PixelButton>
            </div>
        </div>
    )
}

export default EnterPage;