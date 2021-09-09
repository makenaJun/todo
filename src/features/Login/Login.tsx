import React from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {login} from './auth-reducer';
import {AppStateType} from '../../app/store';
import {Redirect} from 'react-router-dom';

type LoginFormValues = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string,
}

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
});

export const Login = () => {
    const dispatch = useDispatch();

    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn);
    const captchaUrl = useSelector<AppStateType, string | null>(state => state.auth.captchaUrl);

    const formik = useFormik<LoginFormValues>({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captcha: '',
        },
        validationSchema: SignupSchema,
        onSubmit: values => {
            dispatch(login(values))
        },
    });


    if (isLoggedIn) {
        return <Redirect to={'/'}/>
    }

    return <Grid container justifyContent="center">
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered <a rel="noreferrer" href={'https://social-network.samuraijs.com/'}
                                                       target={'_blank'}>here
                        </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            error={!!(formik.errors.email && formik.touched.email)}
                            {...formik.getFieldProps('email')}
                        />
                        {formik.errors.email && formik.touched.email &&
                        <div style={{color: 'red'}}>{formik.errors.email}</div>}
                        <TextField
                            error={!!(formik.errors.password && formik.touched.password)}
                            type="password"
                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.errors.password && formik.touched.password &&
                        <div style={{color: 'red'}}>{formik.errors.password}</div>}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox color="primary"
                                               {...formik.getFieldProps('rememberMe')}
                                               checked={formik.values.rememberMe}
                            />}
                        />
                        {captchaUrl && <>
                            <img src={captchaUrl} alt={'Captcha Img'}/>
                            <TextField
                                label="Captcha"
                                margin="normal"
                                {...formik.getFieldProps('captcha')}
                            />
                        </>
                        }
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
};
