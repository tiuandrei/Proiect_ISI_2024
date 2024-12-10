import React, { useState } from 'react';
import { Formik, Field } from 'formik';
import './Form.css';

const Form = ({ config, formSubmitCallback, initialValues = {} }) => {
    const handleSubmit = (event) => {
        formSubmitCallback(event);
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    {Object.keys(config).map((key) => (
                        <div key={key}>
                            <label htmlFor={key}>{key}</label>
                            <Field
                                type={config[key]}
                                id={key}
                                name={key}
                            />
                        </div>
                    ))}
                    <button type="submit">Submit</button>
                </form>
            )}
        </Formik>
    );
};

export default Form;
