import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import useGlobalContext from '../../Context/ContextData';
function Register() {
    const history=useHistory();
    const {BASE_URL}=useGlobalContext();
    const [user,setUser]=useState(
        {
          first_name: "",
            last_name: "",
            email: "",
            password: "",
        }
        );
        const [loading,setLoading]=useState(false);
        const [errorMessageApi,setErrorMessageApi]=useState('');
        const [errorMessageValidation,setErrorMessageValidation]=useState('');


        const getUser=(e)=>{
            const newUser={...user};
            newUser[e.target.name] = e.target.value;
            setUser(newUser);
        };

        const fetchUser = async()=>{
            const {data} = await axios.post(`${BASE_URL}/signup `,user);
            // console.log(data);
            if(data.message==='success'){
                setLoading(false)
                history.push('/login')
            }
else{
    setLoading(false)
let errorApi=data.message;
errorApi=errorApi.split(":");
const alreadyExist=errorApi[errorApi.length-1];
setErrorMessageApi(alreadyExist)
}
        }
        const validationAllData=()=>{
            const schema =Joi.object({
                first_name:Joi.string() .alphanum() .min(3).max(30).label('first name ').required(),
                last_name:Joi.string() .alphanum() .min(3).max(30).label('last name ').required(),
                email: Joi.string() .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','org'] } }).label('email ').required(),
                password: Joi.string().pattern(new RegExp('^[A-Z][a-z]{2,8}$')).label('password ').required(),
            })        
           return schema.validate(user,{abortEarly:false});
        
        }
        const formSubmit =(e)=>{
            e.preventDefault();
            setLoading(true);
            const validationResponse= validationAllData()

            if(validationResponse.error){
                const {details}=validationResponse.error
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
         <section className= " noScroll container">
             <div className="d-flex h-100 align-items-center justify-content-center ">
                 <div className="w-75 row ">
                     <div className="col-12">
                     {errorMessageApi&&<div className="text-center alert alert-danger">{errorMessageApi}</div>}
                     <form onSubmit={formSubmit}> 
                <div className="form-group mb-4">
                    <input placeholder="Enter your first name" name="first_name" type="text" className=" form-control" onChange={getUser}/>
                    {errorMessageValidation.first_name && <small className="text-danger mt-2  ">{errorMessageValidation.first_name}</small>}

                </div>
                <div className="form-group  mb-4">
                    <input placeholder="Enter your last name" name="last_name" type="text" className=" form-control" onChange={getUser}/>
                    {errorMessageValidation.last_name && <small className="text-danger mt-2  ">{errorMessageValidation.last_name}</small>}

                </div>
                <div className="form-group  mb-4">
                    <input placeholder="Enter email" type="email" name="email" className="form-control" onChange={getUser}/>
                    {errorMessageValidation.email && <small className="text-danger mt-2  ">{errorMessageValidation.email}</small>}

                </div>
                <div className="form-group  mb-4">
                    <input placeholder="Enter you password" type="password" name="password" className="form-control" onChange={getUser}/>
                    {errorMessageValidation.password && <small className="text-danger mt-2  ">Password must Start with capital letter min length 2 and max length 8</small>}

                </div>
                <button type="submit" className="btn btn-info w-100">{loading?<i className="fas fa-spinner fa-spin"></i>: 'Register'}</button>
            </form>
                     </div>
                 </div>
             </div>
             </section>   
        </main>
    )
}

export default Register
