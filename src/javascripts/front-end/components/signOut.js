import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import React from 'react'
import { toast } from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.css';

export default function SignOut({displayName}) {
  const signUserOut = () => {
    fetch('/api/users/signout', {
      method: 'DELETE', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
    .then(data => {
      //
      toast.success(`Successfully logged out`, {
        autoClose: 1000,
        onClose: () => {
        document.location = "/"
      }})
      sessionStorage.removeItem('username')
    })
    .catch(err => {
      toast.error(err.message)
    });
  }


  return (
	// <div className='dropdown show'>
	// 	<a className='nav-link dropdown-toggle' href='#' id="dropdownMenuLink" role="button" data-toggle="dropdown"  aria-haspopup="true" aria-expanded="false">
	// 		{sessionStorage.getItem('username')}
	// 	</a>
	// 	<div className='dropdown-menu' aria-labelledby="dropdownMenuLink">
	// 		<a className='dropdown-item' href='#'>Profile</a>
	// 		<a className="dropdown-item"  href='#' onClick={signUserOut}>Sign out</a>
	// 	</div>
	// </div>
	<DropdownButton className='nav-link' id="dropdown-basic-button" title={sessionStorage.getItem('username')}>
  		<Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
  		<Dropdown.Item href="#/action-2" onClick={signUserOut}>Sign out</Dropdown.Item>
	</DropdownButton>
  )
}