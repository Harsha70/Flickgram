import React, {useState} from 'react'
import {auth} from "../firebase/config"

const Signin = () => {
    const [signin, setsignin] = useState({
        email: '',
        password: ''
    })

    const handleChange = event =>{
        const {name,value} = event.target;
        setsignin(prevState => ({...prevState,[name]: value}))
    }

    const handleSubmit = async event => {
        event.preventDefault();
        const {email, password} = signin
        try{
            await auth.signInWithEmailAndPassword(email, password);
            setsignin({email:'', password:''}); 
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div>
            <form className='sign-in-form' onSubmit={handleSubmit}>
                <input type='text' name='email' label='Display Name' placeholder="Email" onChange={handleChange} required/>
                <input type='password' name='password' label='Display Name' placeholder="Password" onChange={handleChange} required/>
                <button > SignIn </button>
                <p>testing email: <i>test@gmail.com</i></p>
                <p>password: <i>test12345</i></p>
            </form>
        </div>
    )
}

export default Signin