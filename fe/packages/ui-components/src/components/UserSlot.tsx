import React, { ReactComponentElement } from "react";
import styled from "styled-components";
import "../assets/font/font.css";
import { FlipCard } from "./FlipCard";
import { User } from "../models/User";

import BlueCardImage from "../assets/images/blue1.png";
import RedCardImage from "../assets/images/red2.png";
import PurpleCardImage from "../assets/images/purple4.png";
import GreenCardImage from "../assets/images/green3.png";
import CardBackImage from "../assets/images/card_back_2.png";
import ProfileImage from "../assets/images/profile.png";
interface UserSlotProps {
    position: "LEFT_TOP" | "LEFT_BOTTOM" | "RIGHT_TOP" | "RIGHT_BOTTOM";
    user: User;
    onClick?: () => void;
}


const Container = styled.div<{}>`
  width: 45%;
  height: 45%;
  display: flex;
  margin-bottom: 10px;
`;

const UserInfo = styled.div<{}>`
  min-width : 180px;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  margin-left:auto;

  .user-name {
    font-size: 1.2rem;
    font-weight: bold;
    margin-right : 10px;
    font-family: "Neo Dgm", cursive;
  }

  .user-profile {
    margin : auto;
    height: 80px;
  }
`;

const CardArea = styled.div<{}>`
  margin: auto;
  width: 100px;
`;


export const UserSlot = ({
    position,
    user,
    onClick,
    ...props
}: UserSlotProps) => {

    const getCardImage = () => {
        if(position === "LEFT_TOP")  return BlueCardImage;
        if(position === "LEFT_BOTTOM")  return RedCardImage;
        if(position === "RIGHT_TOP")  return GreenCardImage;
        if(position === "RIGHT_BOTTOM")  return PurpleCardImage;
    }
    return (
        <Container>
            {(position == "LEFT_TOP" || position == "LEFT_BOTTOM")
                && <>
                    <UserInfo>
                        {user &&
                            <>
                                <img className="user-profile" src={user.profileImage} />
                                <div className="user-name">{user.userName}</div>
                            </>
                        }
                    </UserInfo>
                    <CardArea>
                        <img src={CardBackImage} width='105'/>
                    </CardArea>
                </>}
            <CardArea>
                <FlipCard type={'circle'}
                    front={
                        <img src={CardBackImage} width='105'/>}
                    frontColor={"000000ff"}
                    back={
                        <img src={getCardImage()} width='105'/>}
                        // <img src={require("../assets/images/blue1.png")}/>}
                    backColor={"000000ff"} />
            </CardArea>
            {(position == "RIGHT_TOP" || position == "RIGHT_BOTTOM")
                && <>
                    <CardArea>
                        <img src={CardBackImage} width='105'/>
                    </CardArea>
                    <UserInfo>
                    {user &&
                        <>
                            <img className="user-profile" src={user.profileImage} />
                            <div className="user-name">{user.userName}</div>
                        </>
                    }
                </UserInfo></>}
        </Container>
    );
};
