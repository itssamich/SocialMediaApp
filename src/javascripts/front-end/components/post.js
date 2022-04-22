import React, { useContext, useState, createContext, useEffect } from 'react'
import { postContext } from './app'
import {FaHeart, FaComment} from  'react-icons/fa'
import {BiDotsHorizontalRounded} from 'react-icons/bi'
import PostPage from './postPage'
import { Modal } from 'react-bootstrap'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import Comment from './comment'

import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

export const commentContext = createContext()


export default function Post(props){
    let {posts} = useContext(postContext)
    const [fetched, setFetched] = useState(false);
    let [count, setCount] = useState(0)
    let [commenting, setCommenting] = useState(false);
    let [comments, setComments] = useState();
    const [showModule, setShow] = useState(false)


    useEffect(() => {
        if(showModule){
            fetch(`/post/${posts[i-1]._id}/comments`)
            .then(res => res.json())
            .then(data =>setComments(data))
        }
    }, [showModule])


    let i = props.index

    let isMine = (posts[i-1].author == sessionStorage.getItem('username'))

    const openMod = () => {
        setFetched(true)
        handleShow()
    }

    const validationSchema = yup.object({
        body: yup.string().required(),
    })

    let {handleSubmit, handleChange, values, errors, setFieldValue} = useFormik({
        initialValues:{
            body: "",
            author: sessionStorage.getItem('username'),
        post: posts[i-1]._id
        },
        validationSchema,
        onSubmit(values){
            fetch('/api/comment/new', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'same-origin',
                body: JSON.stringify(values)
            })
            .then(() => {
                toast('Successfully posted', {
                    autoClose: 1000,
                        onClose: () => {
                            location.reload()
                        } 
                    }
                )
             })
        }
    })



    const handleClose = () => {
		setShow(false)
        setFetched(false)
        setCommenting(false)
	}
	const handleShow = () => {
		setShow(true)
	}

    const charCounter = e => {
        setCount(e.target.value.length)
  
    }

    const handleCommentOption = () => {
        if(commenting){
            setCommenting(false)
        }
        else{
            setCommenting(true)
        }
    }
    const handleCommentSubmit = () => {
        handleSubmit()
        setCommenting(false)
    }

    return(
       <div>
            <Modal show={showModule} onHide={handleClose}>
                <Modal.Title><h2>{posts[i-1].author}</h2></Modal.Title>
                <Modal.Body>
                    {posts[i-1].body}
                    <br />
                    <br />

                    <hr className='solid'/>
                    <div className='postExtras'>
                        <span className='postExtra Likes'>
                            <span onClick={() => {props.addLike(posts[i-1]._id)}} className="iconBtn">
                                <FaHeart size={25}/>
                            </span>
                            {posts[i-1].likes}
                        </span>
                        <span className='postExtra Comments'>
                            <span className="iconBtn" onClick={handleCommentOption}>
                                <FaComment size={25}/>
                            </span>
                            {posts[i-1].comments.length}
                        </span>
                        <div className='postExtra Options dropdown'>
                            <span className='dropbtn'>
                                <BiDotsHorizontalRounded size={25}/>
                            </span>
                            <div className='dropdown-content'>
                                {isMine &&
                                    <span className='' onClick={() => {if(confirm('Are you sure you want to delete that post?')) {props.deletePost(posts[i-1]._id)}}}>
                                        Delete post
                                    </span>
                                }
                                <span>{new Date(posts[i-1].postedAt) .toLocaleString("en-US")}</span>
                            </div>
                        </div>
                    </div>

                    {commenting
                        ?<div className='addComment'>
                            <hr className='solid'/>
                            <br />
                            <div className="field">
                                <div className="control">
                                    <textarea name="body" id="body" value={values.body} onChange={handleChange} onKeyUp={e => charCounter(e)} maxLength="75"/>
                                    <p>{count}/75 characters</p>
                                </div>
                                <button className="btn btn-dark" type="submit" onClick={handleCommentSubmit}>Submit</button>

                            </div>

                        </div>
                        :<div></div>
                    }
                    <hr className='solid'/>
                    <commentContext.Provider value={{comments}}>
                        {comments &&
                            <div className='commentContainer'>
                                <ul className='comments'>
                                    {
                                        comments.map((e, i) => {
                                            return <Comment key={i+1} index={i+1} />
                                        })
                                    }
                                </ul>
                            </div>
                        }
                    </commentContext.Provider>
                </Modal.Body>
            </Modal>
            
            <div className='post container'>
                <div className='postInfo'  onClick={openMod}>
                    <div className='postAuthor'>
                        <h4>{posts[i-1].author}</h4>
                    </div>
                    <div className='postBody'>
                        {posts[i-1].body}

                    </div>
                </div>
                <hr className='solid'/>
                <div className='postExtras'>
                    <span className='postExtra Likes'>
                        <span onClick={() => {props.addLike(posts[i-1]._id)}} className="iconBtn">
                            <FaHeart size={25}/>
                        </span>
                        {posts[i-1].likes}
                    </span>
                    
                    <span className='postExtra Comments'>
                        <span className="iconBtn" onClick={() => {handleShow(); handleCommentOption();}}>
                            <FaComment size={25}/>
                        </span>
                        {posts[i-1].comments.length}
                    </span>

                </div>
            </div>
       </div>
            
        

    )
    
}
