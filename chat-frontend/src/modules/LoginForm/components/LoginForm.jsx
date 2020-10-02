import React from 'react';
import {Form, Input} from 'antd';
import {MailOutlined, LockOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";

import { Button, Block } from "../../../components";
import { validateField } from "../../../utils/helpers";

const LoginForm = props => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isValid,
        isSubmitting
    } = props;
    return (
        <div>
            <div className="auth__top">
                <h2>Log in</h2>
                <p>Please, log in</p>
            </div>
            <Block>
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
                        <Form.Item>
                            {isSubmitting && !isValid && <span>Error</span>}
                            <Button
                                disabled={isSubmitting}
                                onClick={handleSubmit}
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                size='large'
                            >
                                Log in
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Link className='auth__register-link' to='/signup'>Register</Link>
                        </Form.Item>
                    </Form>
            </Block>
        </div>
    );
};

export default LoginForm;
