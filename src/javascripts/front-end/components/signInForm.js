import React, {useState} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as yup from 'yup'
import { Modal } from 'react-bootstrap'

toast.configure()

export function VHelp({message}){
  return <p className="help">{message}</p>
}

const validationSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required()
})

export default function SignInForm(){
	const [showModule, setShow] = useState(true)

  let {handleSubmit, handleChange, values, errors, setFieldValue} = useFormik({
    initialValues:{
      username: "",
      password: ""
    },
    validationSchema,
    
    onSubmit(values){

      fetch('/api/users/signin', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'same-origin',
        body: JSON.stringify(values)
      }).then((response) => {
        if(!response.ok) throw Error('Failed to sign in')
        return response.text()
      })
      .then(() => {
        sessionStorage.setItem('username', username.value)
        toast('Successfully signed in', {
            autoClose: 2000,
          onClose: () => {
            document.location = "/"
          }
        })

      }).catch((error) => {
        toast('Failed to sign in', {
            autoClose: 2000,
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
	<Modal show={showModule} onHide={handleClose}>
		<Modal.Title><h1>Sign In</h1></Modal.Title>
		<Modal.Body>
			<div className="userfield">
				<label htmlFor="username">Username</label>
				<div className="control">
					<input type="text" name="username" id="username" value={values.username} onChange={handleChange}/>
					<VHelp message={errors.username}/>
				</div>
			</div>

			<div className="passfield">
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