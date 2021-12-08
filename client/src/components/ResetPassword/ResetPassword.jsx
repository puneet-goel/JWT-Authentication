import React,{ useRef } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Formik, ErrorMessage, Field, Form } from 'formik';
import * as Yup from 'yup';

import { resetPassword } from "../../api";

const schema = Yup.object().shape({
    username: Yup.string('Enter your username').min(3,'Too Short').required('Required'),
    password: Yup.string('Enter your password').min(5, 'Too Short!').required('Required'),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required')
});

const ResetPassword = () => {

    const serverError = useRef('');
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/login');
    }

    return(
        <div>
            <Formik
                initialValues= {{
                    username: '',
                    password: '',
                    passwordConfirmation: ''
                }}
                validationSchema = {schema}
                onSubmit = { 
                    async(values) => {
                        serverError.current = await resetPassword(id, values.username, values.password);
                        if(serverError.current === "ok"){
                            navigate('/login');
                        }
                    }
                }
            >
                {() => (
                    <Form >
                        <label htmlFor="username" className="form-label">Username</label>
                        <Field name="username" type="string" autoComplete="off" placeholder="your_name" className="form-control"/>
                        <ErrorMessage name="username" render={ msg => 
                            <div className="form-text text-danger">
                                {msg}
                            </div>
                        }/>

                        <label htmlFor="password" className="form-label">New Password</label> 
                        <Field name="password" type="password" autoComplete="off" placeholder="*********" className="form-control" />
                        <ErrorMessage name="password" render={ msg => 
                            <div className="form-text text-danger">
                                {msg}
                            </div>
                        }/>

                        <label htmlFor="passwordConfirmation" className="form-label">Confirm New Password</label> 
                        <Field name="passwordConfirmation" type="password" autoComplete="off" placeholder="*********" className="form-control" />
                        <ErrorMessage name="passwordConfirmation" render={ msg => 
                            <div className="form-text text-danger">
                                {msg}
                            </div>
                        }/>

                        <button type="submit">
                            Submit
                        </button>
                        <button onClick={handleLogin}>
                            Log in
                        </button>
                        <span className="text-danger">
                            {serverError.current}
                        </span>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ResetPassword;
