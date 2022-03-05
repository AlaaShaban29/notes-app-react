import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import useGlobalContext from '../../Context/ContextData';

function Login() {
    const history=useHistory();
    const {BASE_URL, loginUSerInfo}=useGlobalContext();
    const [loading,setLoading]=useState(false);
    const [errorMessageValidation,setErrorMessageValidation]=useState('');
    const [errorApi,setErrorApi]=useState('');

    const [user, setUser] = useState({
        email: "",
        password: "",

    });
    const getUser = async({target})=>{
        const newUser={...user};
        newUser[target.name] =target.value;
        setUser(newUser);
    }
    const fetchUser = async()=>{
    
        const {data} = await axios.post(`${BASE_URL}/signin `,user)
        if(data.message==='success'){
            setLoading(false);
localStorage.setItem('userToken',data.token)
loginUSerInfo()
            history.push('/home');

        }
        else{
            setLoading(false);
            setErrorApi(data.message)            
        }
    }
    const validationAllData=()=>{
        const schema =Joi.object({
            email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','org'] } }).label('email ').required(),
            password: Joi.string().pattern(new RegExp('^[A-Z][a-z]{2,8}$')).label('password ').required(),
        })
        return schema.validate(user,{abortEarly:false});
    }

const formSubmit=(e)=>{
e.preventDefault();
setLoading(true);
fetchUser()
const {error}=validationAllData();
if(error){
   const {details}=error;
   setLoading(false);
   const errors={};
   for(let item of details){
    errors[item.path[0]]=item.message
}
setErrorMessageValidation(errors);

}
else{
    fetchUser();
}
}

    return (
        <main>
         <section className= " noScroll container   ">
             <div className="d-flex h-100 align-items-center justify-content-center ">
                 <div className="w-75 row ">
                     <div className="col-12">
                     {errorApi&&<div className="text-center alert alert-danger">{errorApi}</div>}

                     <form onSubmit={formSubmit}>

                <div className="form-group  mb-4">
                    <input placeholder="Enter email" type="email" name="email" className="form-control" onChange={getUser}/>
                    {errorMessageValidation.email && <small className="text-danger mt-2  ">{errorMessageValidation.email}</small>}

                </div>
                <div className="form-group  mb-4">
                    <input placeholder="Enter you password" type="password" name="password" className="form-control" onChange={getUser}/>
                    {/* {errorMessageValidation.password && <small className="text-danger mt-2  "> incorrect data</small>} */}
                </div>
                <button type="submit" className="btn btn-info w-100">{loading?<i className="fas fa-spinner fa-spin"></i>: 'Login'}</button>
            </form>
                     </div>
                 </div>
             </div>
             </section>   
        </main>
    )
}

export default Login
