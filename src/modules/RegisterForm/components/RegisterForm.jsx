import React from 'react';
import {Form, Input} from 'antd';
import {UserOutlined, MailOutlined, LockOutlined, InfoCircleOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";

import {Button, Block} from "../../../components";
import { validateField } from "../../../utils/helpers";

const success = false;

const RegisterForm = props => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isValid,
        dirty
    } = props;
    return (
        <div>
            <div className="auth__top">
                <h2>Register</h2>
                <p>Register for using our platform</p>
            </div>
            <Block>
                {!success ? (
                    <Form
                        name="normal_login"
                        className="login-form"
                        onSubmit={handleSubmit}
                    >
                        <Form.Item
                            name="mail"
                            validateStatus={validateField("email", touched, errors)}
                            help={!touched.email ? '' : errors.email}
                            hasFeedback
                        >
                            <Input
                                id="email"
                                size='large'
                                prefix={
                                    <MailOutlined className="site-form-item-icon"/>
                                }
                                placeholder="E-Mail"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Form.Item>
                        <Form.Item
                            name="name"
                        >
                            <Input
                                size='large'
                                prefix={<UserOutlined className="site-form-item-icon"/>}
                                type="name"
                                placeholder="Name"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            validateStatus={validateField("password", touched, errors)}
                            help={!touched.password ? '' : errors.password}
                            hasFeedback
                        >
                            <Input
                                id="password"
                                size='large'
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                type="password"
                                placeholder="Password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Form.Item>
                        <Form.Item
                            name="repeatpassword"
                            validateStatus={validateField("password", touched, errors)}
                        >
                            <Input
                                size='large'
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                type="password2"
                                placeholder="Repeat password"
                            />
                        </Form.Item>
                        <Form.Item>
                            {dirty && !isValid && <span>Error</span>}
                            <Button onClick={handleSubmit} type="primary" htmlType="submit" className="login-form-button" size='large'>
                                Register
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Link className='auth__register-link' to='/login'>Log in</Link>
                        </Form.Item>
                    </Form>
                ) : (
                    <div className='auth__success-block'>
                        <div>
                            <InfoCircleOutlined className='site-form-item-icon'/>
                        </div>
                        <h2>Confirm your account</h2>
                        <p>
                            Check your E-Mail
                        </p>
                    </div>
                )}
            </Block>
        </div>
    );
};

export default RegisterForm;
