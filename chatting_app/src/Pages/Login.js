import React ,{useState} from 'react'
import '../Pages/PageStyle/Style.css'
import {useNavigate,Link} from 'react-router-dom'
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase';

const Login = () => {


    const [err, setError] = useState(false);

  const navigate = useNavigate();

  const handlesubmit= async(e)=>{
    e.preventDefault();
    const email= e.target[0].value;
    const password= e.target[1].value;


try {
await signInWithEmailAndPassword(auth, email, password);
  navigate("/")
} catch (err) {
  console.error(err.message);
  setError(true)
  
}



  }


  return (
    <div className='formContainer'>
    <div className='formWrapper'>
    <span className='logo'> Wege Chatting</span>
    <form onSubmit={handlesubmit}>
        <input type='email' placeholder='email'/>
        <input type='password' placeholder='password'/>
        <button>Login</button>
        {err && <span>There is something wrong !!!</span>}

    </form>
    <p>you haven't an account ? <Link to="/signup"> Register</Link> </p>

    </div>

    </div>
  )
}

export default Login