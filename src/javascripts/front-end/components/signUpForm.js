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
    email: yup.string().email().required(),
    username: yup.string().required(),
    password: yup.string().required()
})

export default function SignUpForm(){
    const [showModule, setShow] = useState(true)
    let {handleSubmit, handleChange, values, errors, setFieldValue} = useFormik({
      initialValues:{
        email: "",
        username: "",
        password: ""
      },
      validationSchema,
      onSubmit(values){
        fetch('/api/users/signup', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: 'same-origin',
          body: JSON.stringify(values)
        }).then((response) => {
          if(!response.ok) throw Error('Failed to sign up')
          return response.text()
        }).then(() => {
          toast('Successfully signed up', {
            onClose: () => {
              document.location = "/"
            }
          })
        }).catch((error) => {
          toast('Failed to sign up', {
            
          })
        })
      }
    })
  
    //const history = useHistory()
    const handleClose = () => {
        setShow(false)
    }
    const handleShow = () => {
        setShow(true)
    }

	//I don't like how this is done, I need to redo it to allow for a password confirmation

    return (
		<Modal show={showModule} onHide={handleClose}>
			<Modal.Title><h1>Sign Up</h1></Modal.Title>
			<Modal.Body>
				<div className="field">
					<label htmlFor="email">Email</label>
					<div className="control">
						<input type="text" name="email" id="email" value={values.email} onChange={handleChange}/>
						<VHelp message={errors.email}/>
					</div>
				</div>

				<div className="field">
					<label htmlFor="username">Username</label>
					<div className="control">
						<input type="text" name="username" id="username" value={values.username} onChange={handleChange}/>
						<VHelp message={errors.username}/>
					</div>
				</div>

				<div className="field">
					<label htmlFor="password">Password</label>
					<div className="control">
						<input type="password" name="password" id="password" value={values.password} onChange={handleChange}/>  
						<VHelp message={errors.password}/>
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
