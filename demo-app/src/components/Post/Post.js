import React, {useEffect, useRef, useState} from "react";

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
import {Container} from "@mui/material";
import Comment from "../Comment/Comment"

function Post(props) {

    const {postId, title, text, userId, firstName} = props;

    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }));

    const [expanded, setExpanded] = React.useState(false);
    const [liked, setLike] = useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const isInitialMount = useRef(true);

    const handleExpandClick = () => {
            setExpanded(!expanded);
            refreshComments();
        };

        const handleLike = () => {
            setLike(!liked)
        }

    const refreshComments = () => {
        fetch("/comment?postId=" + postId)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true)
                    setCommentList(result)
                } ,
                (error) => {
                    setIsLoaded(true)
                    setError((error))
                }
            )
    }

    useEffect(() => {
        if (isInitialMount.current)
            isInitialMount.current = false
        else
            refreshComments()
    }, [commentList])

    return (
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
                title={title}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {text}
                    {firstName}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    onClick={handleLike}
                    aria-label="add to favorites">
                    <FavoriteIcon style={liked ? {color: "red"} : null} />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Container>
                    {error ? "error" :
                        isLoaded ? commentList.map(comment => (
                            <Comment userId={userId} userName={firstName} text={comment.text}>
                            </Comment>
                        )) : "Loading"
                    }
                </Container>
            </Collapse>
        </Card>
    )
}

export default Post;