import React,{ useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Formik, ErrorMessage, Field, Form } from 'formik';
import * as Yup from 'yup';

import { forgotPassword } from "../../api";

const schema = Yup.object().shape({
    email: Yup.string('Enter your email').email('Must be a valid email').required('Required')
});

const ForgotPassword = () => {

    const serverError = useRef('');
    const navigate = useNavigate();
    
    const handleSignup = (e) => {
        e.preventDefault();
        navigate('/signup');
    }

    return(
        <div>
            <Formik
                initialValues= {{
                    email: ''
                }}
                validationSchema = {schema}
                onSubmit = { 
                    async(values) => {
                        serverError.current = await forgotPassword(values.email);
                        if(serverError.current === "ok"){
                            alert('A password reset link was sent. Click the link in the email to create a new password. If you do not receive an email within 5 minutes, please try again.');
                            navigate('/login');
                        }
                    }
                }
            >
                {() => (
                    <Form >
                        <label htmlFor="email" className="form-label">Email</label>
                        <Field name="email" type="email" autoComplete="off" placeholder="abc@example.com" className="form-control"/>
                        <ErrorMessage name="email" render={ msg => 
                            <div className="form-text text-danger">
                                {msg}
                            </div>
                        }/>

                        <button type="submit">
                            Submit
                        </button>
                        <button  onClick={handleSignup}>
                            New User? Sign up
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

export default ForgotPassword;
