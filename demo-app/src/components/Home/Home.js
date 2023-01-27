import React, {useEffect, useState} from "react";
import Post from "../Post/Post";
import PostForm from "../Post/PostForm";

function Home() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);


    const refreshPosts = () => {
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
    }

    useEffect(() => {
        refreshPosts()
    }, [postList])

    if(error) {
        return <div>Error</div>
    }else if (!isLoaded) {
        return <div>Loading</div>
    } else {
        return (
            <div>
                <PostForm
                    userId={"4028b88185ee27480185ee29bac40001"}
                    firstName={"Yusuf"}
                    refreshPost={refreshPosts}
                />
                {postList.map(post => (<Post
                    postId={post.id}
                    title={post.title}
                    text={post.text}
                    userId={"4028b88185ee27480185ee29bac40001"}
                    firstName={"Yusuf"}
                ></Post>))}
            </div>
        )
    }
}

export default Home;