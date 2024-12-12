import React from 'react';
import './AddEvent.css';

import Form from '../../components/Form/Form';
import { addEvent, updateEvent } from '../../network/api'
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useState } from 'react';


export const eventFormConfig = { Name: 'text', Day: 'date', Time: 'time', Location: 'custom' };

export default function AddOrModifyEvent() {
    let { state } = useLocation();
    const [modalOpen, setModalOpen] = useState(true);
    const navigate = useNavigate(); 
    console.log(state);
    if(!state)
        state = {update: false, formInitialValues: {}};

    const { formInitialValues, update } = state;


    const formSubmitCallback = async (formValues) => {
        console.log(formValues)
        try {
            const date = new Date(formValues.Day);
            const [hours, minutes] = formValues.Time.split(':');
            date.setHours(hours);
            date.setMinutes(minutes);

            if (update) {
                const res = await updateEvent(formValues.Name, date, formValues.Location);
                if (res.status === 200) {
                    window.location.href = '/calendar';
                }
            } else {
                const res = await addEvent(formValues.Name, date, formValues.Location);
                if (res.status === 200) {
                    window.location.href = '/calendar';
                }
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Error occured while adding event",
                text: error.response.data.message
            })
        }
    }

    if (!modalOpen) {
        return null;
    }


    return (
        <div className="modal-container">
            <button className="close-button" onClick={() => navigate('/calendar')}>×</button>
            <div className="center">
                {update === true ?
                    <Form
                        config={eventFormConfig}
                        initialValues={formInitialValues}
                        formSubmitCallback={formSubmitCallback} /> :
                    <Form 
                        config={eventFormConfig} 
                        formSubmitCallback={formSubmitCallback} />}
            </div>
        </div>
    );
}