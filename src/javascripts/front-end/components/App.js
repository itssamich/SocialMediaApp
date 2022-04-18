import React from 'react'
import { FaReact, FaNode, FaDatabase, FaShippingFast } from 'react-icons/fa'

export default function App({course, framework}){
  return (
    <React.StrictMode>
      <div className="container my-5 py-5 text-center">
        <div className="course-icons">
          <FaNode size="30%" color="#43853d" className="mt-5"/><br/>
          <FaReact size="20%" color="skyblue" className="m-3" />
          <FaShippingFast size="20%" color="#259dff" className="m-3"/>
          <FaDatabase size="20%" color="#00ED64" className="m-3"/>
        </div>
        <h1 className="mt-3 display-5">Welcome to {course}</h1>
        <h2 className="lead text-muted my-3">Powered by {framework}</h2>
      </div>
    </React.StrictMode>
  )
}