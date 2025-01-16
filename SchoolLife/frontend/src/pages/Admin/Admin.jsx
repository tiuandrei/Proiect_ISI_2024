import React, { useState, useEffect } from 'react';
import { getUsers, getProfile, updateUser } from '../../network/api';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './Admin.css'; // Import fișierul CSS pentru stilizare

export default function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers();
        setUsers(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    const checkAdminStatus = async () => {
      try {
        const res = await getProfile();
        if (!res.data.isAdmin) {
          window.location.href = '/';
        }
      } catch (error) {
        console.error(error);
      }
    };
    
    checkAdminStatus();
    fetchUsers();
  }, []);

  const updateUserGroup = async (values) => {
    try {
      const user = users.find((user) => user.name === values.userName);
      const res = await updateUser(user._id, values.group);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="admin-page">
      <h1 className="admin-title">Panou Administrativ</h1>
      <h2 className="admin-subtitle">Gestionează utilizatorii și alocă grupuri</h2>
      <Formik
        initialValues={{ userName: '', group: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.userName) {
            errors.userName = 'Numele utilizatorului este obligatoriu';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          updateUserGroup(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="admin-form">
            <div className="form-group">
              <label htmlFor="userName">Selectează utilizatorul:</label>
              <Field as="select" name="userName" className="form-control">
                <option value="">Selectează utilizatorul</option>
                {users.map((user) => (
                  <option key={user.id} value={user.name}>
                    {user.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="userName" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="group">Grup:</label>
              <Field
                type="text"
                name="group"
                className="form-control"
                placeholder="Introdu grupul"
              />
              <ErrorMessage name="group" component="div" className="error" />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              Trimite
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
