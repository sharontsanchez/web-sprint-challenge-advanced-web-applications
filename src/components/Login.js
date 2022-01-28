import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';

const initialState = {
    formValues: {
        username: '',
        password: '',
    },
    errorMessage: ''
}

const Login = () => {

    const [formState, setFormState] = useState(initialState)

    const handleFormChange = (e) => {
        setFormState({
            formValues: {
                ...formState.formValues,
                [e.target.name]: e.target.value
            },
            errorMessage: ''
        })
    }
    const handleLogin = (e) => {
        e.preventDefault()
        axios
        .post('http://localhost:5000/api/login', formState.formValues)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            setFormState({
                formValues: initialState.formValues,
                errorMessage: err.response.data.error
            })
        })

    }
    return(<ComponentContainer>
        <ModalContainer>
            <h1>Welcome to Blogger Pro</h1>
            <h2>Please enter your account information.</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor="username">Username:
                    <input
                        id="username"
                        name="username"
                        placeholder="username"
                        value={formState.formValues.username}
                        onChange={handleFormChange}
                    />
                </label>
                <label htmlFor="password">Password: 
                    <input
                        id="password"
                        name="password"
                        placeholder="password"
                        value={formState.formValues.password}
                        onChange={handleFormChange}
                    />
                </label>
                <button id="submit">Login</button>
            </form>
            {formState.errorMessage ? <p id="error">{formState.errorMessage}</p> : null}
        </ModalContainer>
    </ComponentContainer>);
}

export default Login;

//Task List
//1. Build login form DOM from scratch, making use of styled components if needed. Make sure the username input has id="username" and the password input as id="password".
//2. Add in a p tag with the id="error" under the login form for use in error display.
//3. Add in necessary local state to support login form and error display.
//4. When login form is submitted, make an http call to the login route. Save the auth token on a successful response and redirect to view page.
//5. If the response is not successful, display an error statement. **a server provided error message can be found in ```err.response.data```**
//6. MAKE SURE TO ADD id="username", id="password", id="error" AND id="submit" TO THE APPROPRIATE DOM ELEMENTS. YOUR AUTOTESTS WILL FAIL WITHOUT THEM.

const ComponentContainer = styled.div`
    height: 70%;
    justify-content: center;
    align-items: center;
    display:flex;
`

const ModalContainer = styled.div`
    width: 500px;
    background: white;
    padding: 2rem;
    text-align: center;
`

const Label = styled.label`
    display: block;
    text-align: left;
    font-size: 1.5rem;
`

const FormGroup = styled.form`
    padding:1rem;
`

const Input = styled.input`
    font-size: 1rem;
    padding: 1rem 0;
    width:100%;
`

const Button = styled.button`
    padding:1rem;
    width: 100%;
`
