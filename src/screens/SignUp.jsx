import React, { useState } from "react"
import { Link } from "react-router-dom"

import AuthLayout from "../layouts/AuthLayout"
import FancyInput from "../components/FancyInput"

const SignUp = () => {
  const [formState, setFormState] = useState({
    name: "Catherine Shaw",
    email: "catherine.shaw@gmail.com",
    password: "",
  })

  const inputChangeHandler = (e) => {
    const { name, value } = e.target

    setFormState((prevVal) => {
      return { ...prevVal, [name]: value }
    })
  }
  return (
    <AuthLayout rightImg='./assets/vectors/auth-right-1.svg' rootClass='step-1'>
      <h1>
        Welcome to Node. <br />
        Sign Up to getting started.
      </h1>
      <p className='text-light-1 mt-3'>Enter your details to proceed further</p>

      <form action='' className='form'>
        <FancyInput
          embossed={false}
          lightLabel
          id='name'
          name='name'
          label='Full name'
          icon='vectors/user.svg'
          alt='user'
          value={formState.name}
          onChange={inputChangeHandler}
        />
        <FancyInput
          embossed={false}
          lightLabel
          id='email'
          name='email'
          label='Email'
          type='email'
          icon='vectors/mail.svg'
          alt='email'
          value={formState.email}
          onChange={inputChangeHandler}
        />
        <FancyInput
          embossed={false}
          lightLabel
          id='password'
          name='password'
          label='Password'
          type='password'
          placeholder='Start typing..'
          icon='vectors/lock.svg'
          alt='lock'
          value={formState.password}
          onChange={inputChangeHandler}
        />

        <div className='tos'>
          <div className='radio-container'>
            <label className='custom-radio'>
              I agree with terms &amp; conditions
              <input
                type='checkbox'
                name='gender'
                defaultValue={"checked"}
                onChange={inputChangeHandler}
              />
              <span className='checkmark'></span>
            </label>
          </div>
        </div>

        <div className='text-center text-sm-start'>
          <Link to='/signup-2' className='btn btn-primary mt-4'>
            Signup
          </Link>
        </div>
      </form>

      <div className='social d-flex align-items-center'>
        <button className='btn'>
          <img src='./assets/vectors/twitter.svg' alt='twitter' />
        </button>
        <button className='btn'>
          <img src='./assets/vectors/google.svg' alt='google' />
        </button>
        <button className='btn'>
          <img src='./assets/vectors/fb.svg' alt='fb' />
        </button>
        <button className='btn'>
          <div className='text-light-2 fs-14'>Sign up with</div>
        </button>
      </div>
    </AuthLayout>
  )
}

export default SignUp
