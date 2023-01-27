import React from "react";
import CardContent from "@mui/material/CardContent";
import {InputAdornment, OutlinedInput} from "@mui/material";
import {Link} from "react-router-dom";
import Avatar from "@mui/material/Avatar";

function Comment(props) {

    const {text, userId, userName} = props;

    return (
        <CardContent>
            <OutlinedInput
                disabled
                id={"outlined-adornment-amount"}
                value={text}
                startAdornment={
                    <InputAdornment position={"start"}>
                        <Link to={{pathname: "/user/" + userId}}>
                            <Avatar>
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    </InputAdornment>
                }
            >

            </OutlinedInput>
        </CardContent>
    )
}

export default Comment;