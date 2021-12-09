import React,{ useRef } from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import { Formik, ErrorMessage, Field, Form } from 'formik';
import * as Yup from 'yup';

import { resetPassword } from "../../api";

const regex = /^[a-z0-9_]+$/ ;
const schema = Yup.object().shape({
    username: Yup.string('Enter your username').min(3,'Too Short').max(15, 'Must be 15 characters or less').matches(regex, "Must be a valid username").required('Required'),
    password: Yup.string('Enter your password').min(5, 'Too Short!').required('Required'),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required')
});

const ResetPassword = () => {

    const serverError = useRef('');
    const navigate = useNavigate();
    const params = useParams();

    const id = params.id;
    const username  = params.username;

    return(
        <div className="container-fluid pt-3">
            <div className="row justify-content-center">
                <div className="col-8 col-sm-6 col-md-4 bg-white p-3">
                    <h3 className="text-center pt-2 font-weight-bold">Reset Password</h3>
                    <Formik
                        initialValues= {{
                            username: username,
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
                                <div className="form-floating mb-3">
                                    <Field name="username" type="string" autoComplete="off" placeholder="daniel" className="form-control"/>
                                    <label htmlFor="username">username</label>
                                    <small className="form-text text-muted">only alphanumeric characters or underscores allowed</small>
                                    <ErrorMessage name="username" render={ msg => 
                                        <div className="form-text text-danger">
                                            {msg}
                                        </div>
                                    }/>
                                </div>

                                <div className="form-floating mb-2">
                                    <Field name="password" type="password" autoComplete="off" placeholder="*********" className="form-control" />
                                    <label htmlFor="password" >New Password</label> 
                                    <ErrorMessage name="password" render={ msg => 
                                        <div className="form-text text-danger">
                                            {msg}
                                        </div>
                                    }/>
                                </div>

                                <div className="form-floating mb-2">
                                    <Field name="passwordConfirmation" type="password" autoComplete="off" placeholder="*********" className="form-control" />
                                    <label htmlFor="passwordConfirmation" className="form-label">Confirm New Password</label> 
                                    <ErrorMessage name="passwordConfirmation" render={ msg => 
                                        <div className="form-text text-danger">
                                            {msg}
                                        </div>
                                    }/>
                                </div>

                                <span className="text-danger">
                                    {serverError.current}
                                </span>

                                <div className="d-grid gap-2 mt-2">
                                    <button className="btn btn-primary" type="submit">
                                        Submit
                                    </button>
                                </div>

                                <div className="form-group text-center mt-3">
                                    <Link to="/login"> Log in </Link>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;
