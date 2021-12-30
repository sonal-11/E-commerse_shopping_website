import React, { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signUpUserStart } from '../../redux/User/user.actions';
import './style.scss';


import AuthWrapper from './../AuthWrapper'
import FormInput from '../form/FormInput';
import Button from '../form/Button';

const mapState = ({ user }) => ({
    currentUser: user.currentUser,
    userErr: user.userErr
});

const SignUp = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { currentUser,userErr } = useSelector(mapState);
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState('');

    useEffect(() => {
        if( currentUser ){
            reset();
            history.push('/');
        }
    }, [history, currentUser ]);

    useEffect(() => {
        if(Array.isArray(userErr) && userErr.length > 0){
            setErrors(userErr);
        }
    }, [userErr]);

    const reset = () => {
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors('')
    };

    const handleFormSubmit = event => {
        event.preventDefault();
        dispatch(signUpUserStart({
            displayName,
            email,
            password,
            confirmPassword
        }));
       
    }
        const configAuthWrapper = {
            headline: 'Registration'
        };

        return (
            <AuthWrapper {...configAuthWrapper}>
                {errors.length > 0 && (
                    <ul>
                        {errors.map((err, index) => {
                            return (
                                <li key={index}>
                                    {err}
                                </li>
                            );
                        })}
                    </ul>
                )}

                <div className='formWrap'>
                   <form onSubmit={handleFormSubmit}>
                        <FormInput
                           type="text"
                           name="displayName" 
                           value = {displayName}
                           placeholder = "FULL NAME"
                           handleChange={e => setDisplayName(e.target.value)}
                        />
                        <FormInput
                          type="email"
                          name="email" 
                          value = {email}
                          placeholder = "Email"
                          handleChange={e => setEmail(e.target.value)}                        />

                        <FormInput
                          type="password"
                          name="password" 
                          value = {password}
                          placeholder = "PASSWORD"
                          handleChange={e => setPassword(e.target.value)}
                        />

                       <FormInput
                         type="password"
                         name="confirmPassword" 
                         value = {confirmPassword}
                         placeholder = "CONFIRM PASSWORD"
                         handleChange={e => setConfirmPassword(e.target.value)}
                       />

                       <Button type='submit'>
                          Register
                       </Button>
                   </form>
                </div>
            </AuthWrapper>
        );
}

export default SignUp;