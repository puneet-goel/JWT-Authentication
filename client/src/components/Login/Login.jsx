import React,{ useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Formik, ErrorMessage, Field, Form } from 'formik';
import * as Yup from 'yup';

import { login } from "../../api";

const schema = Yup.object().shape({
    username: Yup.string('Enter your username').min(3,'Too Short').required('Required'),
    email: Yup.string('Enter your email').email('Must be a valid email').required('Required'),
    password: Yup.string('Enter your password').min(5, 'Too Short!').required('Required')
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
                    password: ''
                }}
                validationSchema = {schema}
                onSubmit = { 
                    async(values) => {
                        const message = await login(values.email, values.password, values.username);
                        if(message === "ok"){
                            navigate('/');
                        }else if(message === "Invalid username/password" || message === "Invalid email/password"){
                            serverError.current = message;
                        }else{
                            serverError.current = "Something went wrong!! please Retry";
                        }
                        console.log(message);
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

                        <button type="submit">
                            Login
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
