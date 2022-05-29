import React from 'react'
import { useNavigate } from 'react-router';
import {useForm} from "react-hook-form"
import {Form,Button} from 'react-bootstrap'
import axios from 'axios';

function Signup() {
  const {register,handleSubmit,formState:{errors},}=useForm();
  const  navigate=useNavigate();
  const onFormSubmit=(userObj)=>{
     axios.post('http://localhost/2000/user-api/createuser',userObj)
     .then(res=>{
       console.log(res);
       alert(res.data.message)
       //if user created
       if(res.data.message=="New User Created"){
         navigate("/login");
       }
     })
     .catch(err=>{
       console.log(err)
       alert("Something went wrong, PLease check!")

      })
  }

  return (
    <div>
    <div className="display-5 text-dark text-primary">Signup</div>
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <Form.Group className="mb-3 w-25" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter Username" {...register("username",{required:true})}/>
        {/* validation rules */}
        {errors.username && <p className='text-danger'>Username is required</p>}
      </Form.Group>

      <Form.Group className="mb-3 w-25" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" {...register("password",{required:true})}/>
      {errors.password && <p className='text-danger'>Password is required</p>}
      </Form.Group>
       
      <Form.Group className="mb-3 w-25" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
      <Form.Control type="email" placeholder="Email" {...register("email",{required:true})}/>
      {errors.email && <p className='text-danger'>Email is required</p>}
      </Form.Group>
      <Button variant="primary" type="submit">
            Submit
      </Button>
</Form>
</div>
  )
}

export default Signup