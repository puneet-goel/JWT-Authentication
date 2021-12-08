import React,{ useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Formik, ErrorMessage, Field, Form } from 'formik';
import * as Yup from 'yup';

import { register } from "../../api";

const schema = Yup.object().shape({
    username: Yup.string('Enter your username').min(3,'Too Short').required('Required'),
    email: Yup.string('Enter your email').email('Must be a valid email').required('Required'),
    password: Yup.string('Enter your password').min(5, 'Too Short!').required('Required'),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const Register = () => {

    const serverError = useRef('');
    const navigate = useNavigate();

    return(
        <div>
            <Formik
                initialValues= {{
                    username: '',
                    email: '',
                    password: '',
                    passwordConfirmation: ''
                }}
                validationSchema = {schema}
                onSubmit = { 
                    async(values) => {
                        serverError.current = await register(values.email, values.password, values.username);
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

                        <label htmlFor="email" className="form-label">Email</label>
                        <Field name="email" type="email" autoComplete="off" placeholder="abc@example.com" className="form-control"/>
                        <ErrorMessage name="email" render={ msg => 
                            <div className="form-text text-danger">
                                {msg}
                            </div>
                        }/>

                        <label htmlFor="password" className="form-label">Password</label> 
                        <Field name="password" type="password" autoComplete="off" placeholder="*********" className="form-control" />
                        <ErrorMessage name="password" render={ msg => 
                            <div className="form-text text-danger">
                                {msg}
                            </div>
                        }/>

                        <label htmlFor="passwordConfirmation" className="form-label">Confirm Password</label> 
                        <Field name="passwordConfirmation" type="password" autoComplete="off" placeholder="*********" className="form-control" />
                        <ErrorMessage name="passwordConfirmation" render={ msg => 
                            <div className="form-text text-danger">
                                {msg}
                            </div>
                        }/>

                        <button type="submit">
                            Signup
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

export default Register;
