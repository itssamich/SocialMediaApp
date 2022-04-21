import React, {useState, useEffect, createContext} from "react";
import { useCookies } from 'react-cookie'
import Post from "./post";

export const postContext = createContext()


export default function NewPost(){
    const [cookies, setCookie, removeCookie] = useCookies(['authenticated']);
    let [authenticated, setAuthenticated] = useState(cookies.authenticated === 'true')
    const [posts, setPosts] = useState()

    if(!authenticated){
        return(
            <div>
                
            </div>
        )
    }
    else{
        useEffect(() => {
            fetch('/api/post/all')
            .then(res => res.json())
            .then(data => {
                console.log(data)
    
                setPosts(data)
            })
            .catch(console.error)
        }, [])

        const addLike = (id) => {
            fetch(`/api/post/${id}/like`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'same-origin',
            })
            location.reload()
        }
    
        const deletePost = (id) => {
            fetch(`/api/post/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'same-origin',
            })
            location.reload()
        }
        

        if(!posts){
           return <div>Loading...</div>
        }

        return(
            <postContext.Provider value={{posts}}>
                <div className="postContent container">
                    <ul className="posts">
                        {
                            posts.map((e, i) => {
                                return <Post key={i+1} index={i+1} addLike = {addLike} deletePost = {deletePost}/>
                            })
                        }

                    </ul>
                </div>
            </postContext.Provider>
        )
    }
}