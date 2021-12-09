import React,{ useRef } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Formik, ErrorMessage, Field, Form } from 'formik';
import * as Yup from 'yup';

import { forgotPassword } from "../../api";

const schema = Yup.object().shape({
    email: Yup.string('Enter your email').email('Must be a valid email').required('Required')
});

const ForgotPassword = () => {

    const serverError = useRef('');
    const navigate = useNavigate();

    return(
        <div className="container-fluid pt-5">
            <div className="row justify-content-center">
                <div className="col-8 col-sm-6 col-md-4 bg-white p-4">
                    <h3 className="text-center pt-2 font-weight-bold">Forgot Password</h3>
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
                                <div className="form-floating mt-3">
                                    <Field name="email" type="email" autoComplete="off" placeholder="abc@example.com" className="form-control"/>
                                    <label htmlFor="email">Email</label>
                                    <ErrorMessage name="email" render={ msg => 
                                        <div className="form-text text-danger">
                                            {msg}
                                        </div>
                                    }/>
                                </div>

                                <span className="form-text text-danger">
                                    {serverError.current}
                                </span>

                                <div className="d-grid gap-2 mt-3">
                                    <button className="btn btn-primary" type="submit">
                                    Send Password Reset Link
                                    </button>
                                </div>

                                <div className="form-group text-center mt-3">
                                    <Link to="/login"> Back to Login Page </Link>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;
