import React, {useEffect, useState} from "react";
import Post from "../Post/Post";

function Home() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        fetch("/post/getall")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true)
                    setPostList(result)
                } ,
                (error) => {
                    setIsLoaded(true)
                    setError((error))
                }
            )
    }, [])

    if(error) {
        return <div>Error</div>
    }else if (!isLoaded) {
        return <div>Loading</div>
    } else {
        return (
            <div>
                Home
                {postList.map(post => (<Post
                    title={post.title}
                    text={post.text}
                    userId={post.userDto.id}
                    firstName={post.userDto.firstName}
                    lastName={post.userDto.lastName}
                    email={post.userDto.email}
                ></Post>))}
            </div>
        )
    }
}

export default Home;