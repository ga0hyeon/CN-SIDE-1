import { useState } from 'react'
import '../App.css'
import { useLocation } from "react-router-dom";
import { EnterButton as EnterButton, UserSlot } from "ui-components";
import BellImage from "../assets/images/bell.png";

function HalliGalli() {

    const location = useLocation();
    const nickname = location.state.nickname??'';
    const imgUrl = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

    return (
        <div className='App'>
        <div style={{ display: 'flex'}}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <UserSlot position='LEFT_TOP' user={{ userName: nickname, profileImage: imgUrl }} />
                    <UserSlot position='LEFT_BOTTOM' user={{ userName: '형님', profileImage: imgUrl }} />
                </div>
                <div style={{ display: 'flex',alignItems: 'center', textAlign: 'center', margin:20}}>
                        <img src={BellImage} width='70'/>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <UserSlot position='RIGHT_TOP' user={{ userName: '쟈스퍼', profileImage: imgUrl }} />
                    <UserSlot position='RIGHT_BOTTOM' user={{ userName: '나몬몬', profileImage: imgUrl }} />
                </div>
            </div>
        </div>
    )
}

export default HalliGalli;