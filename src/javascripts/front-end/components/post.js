import React, { useContext } from 'react'
import { postContext } from './app'

export default function Post(props){
    let {posts} = useContext(postContext)
    let i = props.index

    let isMine = (posts[i-1].author == sessionStorage.getItem('username'))

    return(
        <div className='post container'>
            <div className='postAuthor'>
                <h4>{posts[i-1].author}</h4>
            </div>
            <div className='postBody'>
                {posts[i-1].body}

            </div>
            <div className='postExtras'>
                <span className='postLikes'>
                    Likes:
                    {posts[i-1].likes}
                </span>
                <br/>
                <span className='postComments'>
                    Comments:
                    {posts[i-1].comments.length}
                </span>
                <br/>
                <span className='postDate'>
                    Posted at:
                    {new Date(posts[i-1].postedAt) .toLocaleString("en-US")}
                </span>
            </div>

            <div className='postOptions'>
                <button className='btn btn-dark' onClick={() => {props.addLike(posts[i-1]._id)}}>Like!</button>
                {isMine &&
                    <button className='btn btn-dark' onClick={() => {props.deletePost(posts[i-1]._id)}}>Delete</button>
                    }
            </div>

        </div>

    )
    
}
