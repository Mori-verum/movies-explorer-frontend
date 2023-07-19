import { useState, useEffect } from "react";

export function useInputValidation(inputName, initialInputValue, validators) {
    const [inputValue, setInputValues] = useState(initialInputValue);
    const [isDirty, setIsDirty] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);
    const [isEmailError, setIsEmailError] = useState(false);
    const [isMinLengthError, setIsMinLengthError] = useState(false);
    const [validationMessage, setValidationMessage] = useState('');
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (isEmpty || isEmailError || isMinLengthError) {
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    }, [isEmpty, isEmailError, isMinLengthError])

    useEffect(() => {
        let message = '';
        for (const validator in validators) {
            // eslint-disable-next-line default-case
            switch (validator) {
                case "isEmpty":
                    if (!inputValue) {
                        setIsEmpty(true);
                        message = `Поле ${inputName} не должно быть пустым`;
                    } else {
                        setIsEmpty(false);
                    }
                    break;
                case "isEmail":
                    const isValidEmail = String(inputValue)
                        .toLowerCase()
                        .match(
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        );
                    if (inputValue && !isValidEmail) {
                        message = `${inputName} должен быть корректным`;
                        setIsEmailError(true);
                    } else {
                        setIsEmailError(false);
                    }
                    break;
                case "minLength":
                    if (inputValue && inputValue.length < validators[validator]) {
                        message = `Длина поля ${inputName} не должна быть меньше ${validators[validator]} символов`;
                        setIsMinLengthError(true);
                    } else {
                        setIsMinLengthError(false);
                    }
                    break;
            }
        }
        setValidationMessage(message);
    }, [inputValue])

    function handleInputChange(evt) {
        handleInputBlur(evt);
        setInputValues(evt.target.value);
    }

    function handleInputBlur() {
        setIsDirty(true);
    }

    return {
        inputValue,
        handleInputChange,
        handleInputBlur,
        isValid,
        isDirty,
        isEmpty,
        isEmailError,
        isMinLengthError,
        validationMessage,
    }
}