import { withFormik } from 'formik';
import LoginForm from '../components/LoginForm';
import validate from '../../../utils/validate';

export default withFormik({
    enableReinitialize: true,
    mapPropsToValues: () => ({
        email: "",
        password: "",
    }),
    validate: values => {
        const errors = {};

        validate({ isAuth: true, values, errors });

        return errors;
    },

    handleSubmit: (values, { setSubmitting }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);
    },

    displayName: 'LoginForm',
})(LoginForm);
