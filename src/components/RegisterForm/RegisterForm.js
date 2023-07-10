import { mainApi } from "../../utils/Api/MainApi";
import Form from "../Form/Form";
import InputFieldset from "../InputFieldset/InputFieldset";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { paths } from "../../utils/config";

function RegisterForm(props) {
    const navigate = useNavigate();
    const [formValue, setFormValue] = useState({
        name: '',
        email: '',
        password: '',
    })

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        const { name, password, email } = formValue;
        mainApi.register(name, password, email)
        .then((res) => {
            if(res) {
                navigate(paths.signIn, { replace: true });
            }
        })
    }

    return (
        <Form onSubmit={handleSubmit} formSubmitText="Зарегистрироваться">
            <InputFieldset
                onChange={handleChange}
                value={formValue.name}
                required={true}
                type="text"
                name="name"
                label="Имя"
                placeholder="Введите имя"
                id="profile-name"
            />
            <InputFieldset
                onChange={handleChange}
                value={formValue.email}
                required={true}
                type="email"
                name="email"
                label="E-mail"
                placeholder="Введите email"
                id="profile-email"
            />
            <InputFieldset
                onChange={handleChange}
                value={formValue.password}
                required={true}
                type="password"
                name="password"
                label="Пароль"
                placeholder="Введите пароль"
                id="profile-password"
            />
        </Form>
    )
}

export default RegisterForm;