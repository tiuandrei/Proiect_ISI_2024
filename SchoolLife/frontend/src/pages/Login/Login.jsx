import React from 'react';
import './Login.css';
import Form from '../../components/Form/Form';
import { login } from '../../network/api';
import Swal from "sweetalert2";

export default function Login(props) {

    const formSubmitCallback = async (formValues) => {
        try {
            const res = await login(formValues.email, formValues.password);
            localStorage.setItem('token', res.data.token);
            window.location.href = '/';
        } catch (error) {
            // Mesaj implicit pentru erori neașteptate
            let errorMessage = "A apărut o eroare. Te rugăm să încerci din nou.";

            // Verificăm dacă serverul a trimis un răspuns cu un cod de eroare
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        errorMessage = "Datele introduse sunt incorecte. Verifică și încearcă din nou.";
                        break;
                    case 401:
                        errorMessage = "Adresa de email sau parola este incorectă.";
                        break;
                    case 500:
                        errorMessage = "A intervenit o problemă pe server. Încearcă mai târziu.";
                        break;
                    default:
                        errorMessage = error.response.data?.message || errorMessage;
                }
            }

            // Afișăm mesajul detaliat în fereastra Swal
            await Swal.fire({
                icon: "error",
                title: "Autentificare eșuată",
                text: errorMessage
            });
        }
    }

    return (
        <div className="center">
            <div className="login-container">
                <h1 className="login-header">Bine ai venit!</h1>
                <p className="login-text">Te rugăm să te autentifici pentru a continua.</p>
                <Form
                    config={{ email: 'text', password: 'password' }}
                    formSubmitCallback={formSubmitCallback}
                />
            </div>
        </div>
    );
}
