import React, { createContext, useEffect, useState } from "react";
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as yup from 'yup'
import {Modal, Button, Nav} from 'react-bootstrap'

toast.configure()
export function VHelp({message}){
  return <p className="help">{message}</p>
}

const validationSchema = yup.object({
    body: yup.string().required(),
})

export default function NewPost(){
    const [showModule, setShow] = useState(true)

    let {handleSubmit, handleChange, values, errors, setFieldValue} = useFormik({
        initialValues:{
            body: "",
            author: sessionStorage.getItem('username')
        },
        validationSchema,
        onSubmit(values){
          fetch('/api/post/new', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            credentials: 'same-origin',
            body: JSON.stringify(values)
          }).then((response) => {
            if(!response.ok) throw Error('Failed to create post')
            return response.text()
          }).then(() => {
            toast('Successfully posted', {
              onClose: () => {
                document.location = "/"
              }
            })
          }).catch((error) => {
            toast('Failed to create post', {
              
            })
          })
        }
    })


    const handleClose = () => {
        setShow(false)
    }
    const handleShow = () => {
        setShow(true)
    }

    return(
	<Modal show={showModule} onHide={handleClose}>
		<Modal.Title><h1>New Post</h1></Modal.Title>
		<Modal.Body>
			<div className="field">
				<div className="control">
					<textarea name="body" id="body" value={values.body} onChange={handleChange}/>
					<VHelp message={errors.body}/>
				</div>
			</div>
		</Modal.Body>
		<Modal.Footer>
			<div className="submitfield">
				<label></label>
				<div className="control">
					<button className="btn btn-primary" type="submit" onClick={handleSubmit}>Submit</button>
					<button className="btn btn-outline-primary" onClick={()=> document.location = '/'}>Cancel</button>
				</div>
			</div>
		</Modal.Footer>
	</Modal>
    )
}