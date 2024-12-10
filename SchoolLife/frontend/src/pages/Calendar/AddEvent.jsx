import React from 'react';
import './AddEvent.css';

import Form from '../../components/Form/Form';
import { addEvent, updateEvent } from '../../network/api'
import { useLocation } from "react-router-dom";
import Swal from 'sweetalert2';

export const eventFormConfig = { Name: 'text', Day: 'date', Time: 'time', Location: 'text' }

export default function AddOrModifyEvent() {
    let { state } = useLocation();
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

    return (
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
    );
}