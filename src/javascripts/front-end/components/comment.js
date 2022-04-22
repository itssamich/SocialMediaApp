import React, { useContext } from "react";
import { commentContext } from "./post";

export default function Comment(props){
    let {comments} = useContext(commentContext)
    let i = props.index

    return(
        <div className="comment">
            <h5>{comments[i-1].author}</h5>
            {comments[i-1].body}
            <br />
            {new Date(comments[i-1].postedAt) .toLocaleString("en-US")}

            <hr className='comment'/>
        </div>
    )
}