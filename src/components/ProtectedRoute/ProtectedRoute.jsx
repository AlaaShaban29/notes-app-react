import React from 'react'
import { Redirect, Route } from 'react-router-dom';


function ProtectedRoute({path, component}) {
if(localStorage.getItem('userToken')){
    return (
        <Route path={path} component={component}/>
    )
}
else{
    return <Redirect from='/' exact to='/login'/>

}
    
}

export default ProtectedRoute
