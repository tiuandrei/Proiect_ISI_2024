import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addAnnouncement } from '../../network/api';
import './CreateAnnouncement.css';
import Swal from 'sweetalert2';

const CreateAnnouncement = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(100, 'Titlul trebuie să aibă cel mult 100 de caractere')
        .required('Titlul este obligatoriu'),
      content: Yup.string()
        .max(1000, 'Conținutul trebuie să aibă cel mult 1000 de caractere')
        .required('Conținutul este obligatoriu'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await addAnnouncement(values.title, values.content);
        resetForm();
        Swal.fire({
          title: 'Anunțul a fost creat cu succes!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: 'Eroare la crearea anunțului.',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="create-announcement">
      <h1 className="create-announcement__title">Creare Anunț</h1>
      <h2 className="create-announcement__subtitle">
        Împărtășește actualizări importante cu toți
      </h2>
      <p className="create-announcement__text">
        Folosește acest formular pentru a crea un nou anunț. Adaugă un titlu clar și un conținut detaliat 
        pentru a te asigura că mesajul ajunge la toți cei vizați.
      </p>
      <form onSubmit={formik.handleSubmit} className="create-announcement__form">
        <div className="create-announcement__form-group">
          <label htmlFor="title" className="create-announcement__label">Titlu</label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            className={`create-announcement__input ${formik.touched.title && formik.errors.title ? 'create-announcement__input--error' : ''}`}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="create-announcement__error">{formik.errors.title}</div>
          ) : null}
        </div>
        <div className="create-announcement__form-group">
          <label htmlFor="content" className="create-announcement__label">Conținut</label>
          <textarea
            id="content"
            name="content"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.content}
            className={`create-announcement__textarea ${formik.touched.content && formik.errors.content ? 'create-announcement__textarea--error' : ''}`}
          />
          {formik.touched.content && formik.errors.content ? (
            <div className="create-announcement__error">{formik.errors.content}</div>
          ) : null}
        </div>
        <button type="submit" disabled={formik.isSubmitting} className="create-announcement__button">
          {formik.isSubmitting ? 'Se trimite...' : 'Trimite'}
        </button>
      </form>
    </div>
  );
};

export default CreateAnnouncement;