import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import useGlobalContext from '../../Context/ContextData'


function Navbar() {
  const history=useHistory()
  const {loginUser ,userLogout}=useGlobalContext();
    return (
        <>
          <nav className="d-flex justify-content-between align-items-center p-3 ">
              <ul className="list-unstyled d-flex align-items-center ms-5">
                  <li className="me-2">
                <Link to="/login">  <i _ngcontent-ags-c1="" className="far fa-sticky-note me-1"></i> Notes</Link>
                  </li>

              </ul>
            
              <ul className="list-unstyled d-flex align-items-center me-5">
                {loginUser? <>
                  <li className="mx-3 text-white" onClick={()=>{
                    userLogout()
                    history.push('/login')
                  }} >
                 Logout
                  </li>
                </>:<>
                <li className="mx-3">
                <Link to="/register"> Register</Link>
                  </li>
                  <li className="mx-3">
                <Link to="/login"> Login</Link>
                  </li>
                </>}
                
                
              </ul>
          </nav>
        </>
    )
}

export default Navbar
