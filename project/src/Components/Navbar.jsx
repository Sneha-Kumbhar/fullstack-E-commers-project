
import React from 'react'
import { IoIosNotificationsOutline } from "react-icons/io";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container-md">
        <div className="navbar-brand fw-bold fs-2" style={{ color: '#6941C6' }}>
          PEOPLE.CO
        </div>
        <div className="d-flex flex-row align-items-center">
          <IoIosNotificationsOutline size={24} style={{ marginRight: '1rem' }} />
          <img style={{height:'60px',width:'60px',borderRadius:'50px',objectFit:'cover'}} src='https://th.bing.com/th/id/OIP.mk4DihJ5AqVBvOja8MCvugHaE8?rs=1&pid=ImgDetMain' alt="Profile" />
          <div className="pt-1 ms-2" style={{ fontWeight: '600' }}>
            Sneha k
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar