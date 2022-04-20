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
    const [showModule, setShow] = useState(false)
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
            onClose: () => {
              document.location = "/"
            }
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

    return (
     <div className="signUpForm">
                <form onSubmit={handleSubmit}>
        <h1>Sign up</h1>

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

        <div className="field">
          <label></label>
          <div className="control">
            <button className="primary" type="submit">Submit</button>
            <button className="primary" onClick={()=> document.location = '/'}>Cancel</button>
          </div>
        </div>
      </form>  
      </div>
    )
}
