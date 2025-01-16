import React from 'react';
import './Register.css';
import Form from '../../components/Form/Form';
import { register } from '../../network/api';
import Swal from "sweetalert2";

export default function Register() {

    const formSubmitCallback = async (formValues) => {
        try {
            const res = await register(formValues.name, formValues.email, formValues.password);
            if (res.status === 200) {
                window.location.href = '/login';
            }
        } catch (error) {
            // Mesaj implicit pentru erori neașteptate
            let errorMessage = "A apărut o eroare. Te rugăm să încerci din nou.";

            // Verificăm dacă serverul a trimis un răspuns cu un cod de eroare
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        errorMessage = "Datele introduse sunt incorecte. Verifică și încearcă din nou.";
                        break;
                    case 409:
                        errorMessage = "Adresa de email este deja utilizată. Folosește o altă adresă.";
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
                title: "Registration failed",
                text: errorMessage
            });
        }
    };

    return (
        <div className="center">
            <div className="register-container">
                <h1 className="register-header">Înregistrare</h1>
                <p className="register-text">Creează un cont pentru a te alătura comunității!</p>
                <Form
                    config={{ name: 'text', email: 'text', password: 'password' }}
                    formSubmitCallback={formSubmitCallback}
                />
            </div>
        </div>
    );
}
