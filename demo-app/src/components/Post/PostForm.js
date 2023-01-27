import React, {useState} from "react";

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Link} from "react-router-dom";
import {Button, InputAdornment, OutlinedInput} from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function PostForm(props) {

    const {userId, refreshPost} = props
    const [expanded, setExpanded] = React.useState(false);
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [isSent, setIsSent] = useState(false);

    const savePost = () => {
        fetch("post/save",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: userId,
                    title: title,
                    text: text
                }),
            })
            .then((res) => res.json())
            .catch((err) => console.log("error"))
    }


    const handleSubmit = () => {
        savePost()
        setIsSent(true)
        setTitle("")
        setText("")
        refreshPost()
    }

    const handleTitle = (value) => {
        setTitle(value)
        setIsSent(false)
    }

    const handleText = (value) => {
        setText(value)
        setIsSent(false)
    }


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsSent(false);
    };

    return (
        <div>
            <Snackbar open={isSent} autoHideDuration={1200} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Your post is sent!
                </Alert>
            </Snackbar>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={
                        <Link to={{pathname : "/user/" + userId}}>
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                R
                            </Avatar>
                        </Link>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={<OutlinedInput
                        id={"outlined-adornment-amount"}
                        placeholder={"Title"}
                        value={title}
                        onChange={
                            (i) => handleTitle(i.target.value)
                        }
                    />}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        <OutlinedInput
                            id={"outlined-adornment-amount"}
                            placeholder={"Text"}
                            value={text}
                            onChange={(i) => handleText(i.target.value)}
                            endAdornment={
                                <InputAdornment position={"end"} >
                                    <Button variant={"contained"} onClick={handleSubmit} >
                                        Post
                                    </Button>
                                </InputAdornment>
                            }
                        />
                    </Typography>
                </CardContent>
            </Card>
        </div>

    )
}

export default PostForm;