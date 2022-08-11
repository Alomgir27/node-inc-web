import React, { useState } from "react"
import { Link } from "react-router-dom"

import AuthLayout from "../layouts/AuthLayout"
import FancyInput from "../components/FancyInput"

const SignUp = () => {
  const [formState, setFormState] = useState({
    company: "Garage Lelaval",
    employees: "1-10 Employees",
    enterprise: "Automobile workshop",
    phone: "",
  })

  const inputChangeHandler = (e) => {
    const { name, value } = e.target

    setFormState((prevVal) => {
      return { ...prevVal, [name]: value }
    })
  }
  return (
    <AuthLayout rightImg='./assets/vectors/auth-right-2.svg' className='step-2'>
      <h1>
        Welcome to Node. <br />
        Sign Up to getting started.
      </h1>
      <p className='text-light-1 mt-3'>Enter your details to proceed further</p>

      <form action='' className='form'>
        <FancyInput
          embossed={false}
          lightLabel
          id='company'
          name='company'
          label='Company name'
          value={formState.company}
          onChange={inputChangeHandler}
        />
        <FancyInput
          embossed={false}
          lightLabel
          id='employees'
          name='employees'
          label='Employees'
          type='text'
          value={formState.employees}
          onChange={inputChangeHandler}
        />
        <FancyInput
          embossed={false}
          lightLabel
          id='enterprise'
          name='enterprise'
          label='Enterprise type'
          type='text'
          value={formState.enterprise}
          onChange={inputChangeHandler}
        />
        <FancyInput
          embossed={false}
          lightLabel
          id='phone'
          name='phone'
          label='Phone'
          type='tel'
          placeholder='Start typing...'
          value={formState.phone}
          onChange={inputChangeHandler}
        />

        <div className='d-flex flex-sm-row flex-column justifify-content-start mt-5'>
          <Link
            to='/signup-1'
            className='btn btn-light-blue me-sm-3 me-0 mb-3 mb-sm-0'
          >
            Back
          </Link>
          <Link to='/signin' className='btn btn-primary '>
            Signup
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}

export default SignUp
