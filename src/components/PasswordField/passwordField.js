import React, {useEffect, useState} from 'react';
import './passwordFieldModule.css'

const PasswordField = () => {
    const [inputType, setInputType] = useState('password');
    const [password, setPassword] = useState('');
    const [validators, setValidators] = useState({
        digits: false,
        letters: false,
        symbols: false,
        reqPassLength: false
    });
    const [style, setStyle] = useState('none');


    const handleClick = (e) => {
        e.preventDefault()
        setInputType((prevInputType => prevInputType === 'password' ? 'text' : 'password'))
    }

    const handleChange = (e) => {
        setPassword(e.target.value)
    }

    const handleKeyUp = (e) => {
        const {value} = e.target;
        const digits = /\d/.test(value);
        const letters = /[a-zA-Z]/.test(value);
        const symbols = /[!@#$%^&*()_+]/.test(value)
        const reqPassLength = value.length >= 8;
        setValidators({digits, letters, symbols, reqPassLength})
    }

    useEffect(()=>{

        if (password === ''){
            setStyle('none')
            return
        }

        if (!validators.reqPassLength){
            setStyle('red')
        }

        if (
            (validators.letters && validators.reqPassLength)
            ||
            (validators.symbols && validators.reqPassLength)
            ||
            (validators.digits && validators.reqPassLength)
        ) {
            setStyle('easy')
        }

        if (
            (validators.letters && validators.symbols && validators.reqPassLength)
            ||
            (validators.letters && validators.digits && validators.reqPassLength)
            ||
            (validators.digits && validators.symbols && validators.reqPassLength)
        ) {
            setStyle('medium')
        }

        if (validators.symbols && validators.digits && validators.letters && validators.reqPassLength) {
            setStyle('strong')
        }
    }, [validators, password])


    return (
        <form className={'form'}>
            <input
                id={'password-input'}
                placeholder={'Your password'}
                type={inputType}
                value={password}
                onChange={handleChange}
                onKeyUp={handleKeyUp}
            >
            </input>
            <button id={'show-password'} onClick={handleClick}>Show password</button>
            <section className={'validate'}>
                <p className={`password-strength ${style}`} id={'easy'}>Easy</p>
                <p className={`password-strength ${style}`} id={'medium'}>Medium</p>
                <p className={`password-strength ${style}`} id={'strong'}>Strong</p>
            </section>
        </form>
    );
};

export default PasswordField;