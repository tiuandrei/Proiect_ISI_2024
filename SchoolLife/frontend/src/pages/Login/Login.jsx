import React from 'react';
import './Login.css';
import Form from '../../components/Form/Form';
import { login } from '../../network/api'
import Swal from "sweetalert2";


export default function Login(props) {

    const formSubmitCallback = async (formValues) => {
        try {
            const res = await login(formValues.email, formValues.password);
            localStorage.setItem('token', res.data.token);
            window.location.href = '/';
        } catch (error) {
            await Swal.fire({
                icon: "error",
                title: "Login failed",
                text: error.response.data.message
            });
        }
    }

    return (
        <div className="center">
            <Form config={{ email: 'text', password: 'password' }} formSubmitCallback={formSubmitCallback}/>
        </div>
    );
}