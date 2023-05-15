import { useState } from 'react'
import '../App.css'
import { EnterButton as EnterButton, UserSlot } from "ui-components";
import { useNavigate } from "react-router-dom";

function HalliGalli() {

    const imgUrl = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

    return (
        <div className='App'>
            {/* <div >
                <div style={{ display: 'flex' }}>
                    <UserSlot position='LEFT_TOP' user={{ userName: "Gamer", profileImage: imgUrl }} />
                    <UserSlot position='RIGHT_TOP' user={{ userName: "Gamer", profileImage: imgUrl }} />
                </div>
                <div style={{ display: 'flex' }}>
                    <UserSlot position='LEFT_BOTTOM' user={{ userName: "Gamer", profileImage: imgUrl }} />
                    <UserSlot position='RIGHT_BOTTOM' user={{ userName: "Gamer", profileImage: imgUrl }} />
                </div>
            </div> */}
        </div>
    )
}

export default HalliGalli;