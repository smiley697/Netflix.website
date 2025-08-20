import React from 'react'
import { useState, useEffect } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { login , signup } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'

const Login = () => {
  const navigate = useNavigate();
  const [signState, setSignState] = useState("Sign In")
  const [Name, setName]= useState("");
  const [Email, setEmail]= useState("");
  const [Password, setPassword]= useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
    return unsubscribe;
  }, []);

  const getAuthErrorMessage = (err) => {
    const code = err?.code || '';
    switch (code) {
      case 'auth/invalid-email':
        return 'Error invalid-email)';
      case 'auth/missing-password':
        return 'Please enter your password.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Invalid email or password.';
      case 'auth/email-already-in-use':
        return 'This email is already in use. Try signing in instead.';
      default:
        return err?.message || 'Something went wrong. Please try again.';
    }
  }

  const user_auth = async (event) =>{
    event.preventDefault();
    setError("");
    try {
      if(signState==="Sign In") {
        if (!Email) { setError('Please enter your email.'); return; }
        if (!Password) { setError('Please enter your password.'); return; }
        await login(Email,Password);
      }else{
        if (!Name) { setError('Please enter your name.'); return; }
        if (!Email) { setError('Please enter your email.'); return; }
        if (!Password) { setError('Please enter your password.'); return; }
        await signup(Name,Email, Password);
      }
      navigate('/');
    } catch (e) {
      setError(getAuthErrorMessage(e));
    }
  }

  // If user is already logged in, show welcome message
  if (user) {
    return (
      <div className='login'>
        <img src={logo} className='login-logo' alt="" />
        <div className="login-form">
          <h1>Welcome back!</h1>
          <p style={{ textAlign: 'center', marginBottom: '20px' }}>
            You are already signed in as {user.email}
          </p>
          <button onClick={() => navigate('/')} style={{ background: '#e50914' }}>
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='login'>
        <img src={logo} className='login-logo' alt="" />
        <div className="login-form">
          <h1>{signState}</h1>
          <form>
            {signState==="Sign Up"?<input value={Name} onChange={(e)=>{setName(e.target.value)}} type='text' placeholder='Your name' />:<></>}
            
            <input  value={Email} onChange={(e)=>{setEmail(e.target.value)}} type='email' autoComplete='email' placeholder='Your Email' />
            <input  value={Password} onChange={(e)=>{setPassword(e.target.value)}} type='password' autoComplete='current-password' placeholder='Your Password' />
          <button onClick={user_auth} type='submit'>{signState}</button>
          {error && <p style={{ color: '#e87c03', marginTop: 10 }}>{error}</p>}
          <div className='form-help'>
            <div className='remember'>
              <input type='checkbox' />
              <label htmlFor=''>Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
          </form>
          <div className='form-switch'>
            {signState==="Sign In"?
            <p>New to Netflix? <span onClick={()=>{setSignState("Sign Up")}}>Sign up Now </span></p>
          :<p>Already have account? <span onClick={()=>{setSignState("Sign In")}}>Sign In Now</span></p>
        }
            
            
          </div>
        </div>
      </div>
  )
}

export default Login
