import React from 'react';
import './AddEvent.css';

import Form from '../../components/Form/Form';
import { addEvent, updateEvent } from '../../network/api';
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useState } from 'react';

export const eventFormConfig = { Name: 'text', Day: 'date', Time: 'time', Location: 'custom' };

export default function AddOrModifyEvent() {
  let { state } = useLocation();
  const [modalOpen, setModalOpen] = useState(true);
  const navigate = useNavigate();
  if (!state)
    state = { update: false, formInitialValues: {} };

  const { formInitialValues, update } = state;

  const formSubmitCallback = async (formValues) => {
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
      Swal.fire({
        icon: "error",
        title: "Eroare la adăugarea/modificarea evenimentului",
        text: error.response?.data?.message || "Ceva nu a mers bine.",
      });
    }
  };

  if (!modalOpen) {
    return null;
  }

  return (
    <>
      {/* Secțiunea de sus */}
      <div className="page-header">
        <h1 className="page-title">{update ? "Modifică Eveniment" : "Adaugă Eveniment"}</h1>
        <p className="page-subtitle">
          {update
            ? "Actualizează informațiile evenimentului selectat."
            : "Completează informațiile pentru a crea un nou eveniment."}
        </p>
      </div>

      {/* Formular cu buton de ieșire */}
      <Form
        config={{
          ...eventFormConfig,
          Location: 'custom', // Lasă intact pentru a permite selectarea locației fără label
        }}
        initialValues={update ? formInitialValues : {}}
        formSubmitCallback={formSubmitCallback}
        closeButton={() => navigate('/calendar')}
      />
    </>
  );
}
