import React from 'react';
import './Register.css';
import Form from '../../components/Form/Form';
import { register } from '../../network/api'
import Swal from "sweetalert2";

export default function Register() {

    const formSubmitCallback = async (formValues) => {
        try {
            const res = await register(formValues.name, formValues.email, formValues.password);
            if (res.status === 200) {
                window.location.href = '/login';
            }
        } catch (error) {
            await Swal.fire({
                icon: "error",
                title: "Registration failed",
                text: error.response.data.message
            });
        }
    }

    return (
        <div className="center">
            <Form config={{ email: 'text', name: 'text', password: 'password' }} formSubmitCallback={formSubmitCallback} />
        </div>
    );
}