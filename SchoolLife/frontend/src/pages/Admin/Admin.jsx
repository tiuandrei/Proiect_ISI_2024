import React, { useState, useEffect } from 'react';
import { getUsers, getProfile, updateUser } from '../../network/api';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './Admin.css'; // Import your CSS file for styling

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
    <div className="admin-container">
      <Formik
        initialValues={{ userName: '', group: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.userName) {
            errors.userName = 'Required';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          updateUserGroup(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="userName">Select User:</label>
              <Field as="select" name="userName" className="form-control">
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user.id} value={user.name}>
                    {user.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="userName" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="group">Group:</label>
              <Field
                type="text"
                name="group"
                className="form-control"
                placeholder="Enter Group"
              />
              <ErrorMessage name="group" component="div" className="error" />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

