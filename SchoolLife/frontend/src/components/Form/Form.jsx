import React, { useState } from 'react';
import { Formik, Field } from 'formik';
import './Form.css';
import LocationField from '../LocationField/LocationField';

const Form = ({ config, formSubmitCallback, initialValues = {} }) => {
    const handleSubmit = (event) => {
        formSubmitCallback(event);
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            {({ handleSubmit, setFieldValue, values }) => (
                <form onSubmit={handleSubmit}>
                    {Object.keys(config).map((key) => (
                        <div key={key}>
                            <label htmlFor={key}>{key}</label>
                            {config[key] === 'custom' && key === 'Location' ? (
                                <LocationField
                                    value={values[key]}
                                    onChange={(value) => setFieldValue(key, value)}
                                />
                            ) : (
                                <Field
                                    type={config[key]}
                                    id={key}
                                    name={key}
                                />
                            )}
                        </div>
                    ))}
                    <button type="submit">Submit</button>
                </form>
            )}
        </Formik>
    );
};

export default Form;
