import React, { ReactComponentElement } from "react";
import styled from "styled-components";
import "../assets/font/font.css";
import { FlipCard } from "./FlipCard";
import { User } from "../models/User";

interface UserSlotProps {
    position: "LEFT_TOP" | "LEFT_BOTTOM" | "RIGHT_TOP" | "RIGHT_BOTTOM";
    user: User;
    onClick?: () => void;
}


const Container = styled.div<{}>`
  width: 45%;
  height: 45%;
`;

const UserInfo = styled.div<{}>`
  min-width : 200px;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;

  .user-name {
    font-size: 1.2rem;
    font-weight: bold;
    margin-right : 10px;
  }

  .user-profile {
    margin : auto;
    height: 60px;
  }
`;

const CardArea = styled.div<{}>`
  margin: auto;
`;



export const UserSlot = ({
    position,
    user,
    onClick,
    ...props
}: UserSlotProps) => {
    return (
        <Container>
            {(position == "LEFT_TOP" || position == "RIGHT_TOP")
                && <UserInfo>
                    {user &&
                        <>
                            <span className="user-name">{user.userName}</span>
                            <img className="user-profile" src={user.profileImage} />
                        </>
                    }
                </UserInfo>}
            <CardArea>
                <FlipCard type={'circle'}
                    front={<h1>?</h1>}
                    frontColor={"tomato"}
                    back={<h1>5</h1>}
                    backColor={"royalblue"} />
            </CardArea>
            {(position == "LEFT_BOTTOM" || position == "RIGHT_BOTTOM")
                && <UserInfo>
                    {user &&
                        <>
                            <span className="user-name">{user.userName}</span>
                            <img className="user-profile" src={user.profileImage} />
                        </>
                    }
                </UserInfo>}
        </Container>
    );
};
