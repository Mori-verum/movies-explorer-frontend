import { useState } from "react";
import Form from "../Form/Form";
import InputFieldset from "../InputFieldset/InputFieldset";
import { mainApi } from "../../utils/Api/MainApi";
import { useNavigate } from 'react-router-dom';
import { paths } from "../../utils/config";

function LoginForm(props) {
    const navigate = useNavigate();
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
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
        mainApi.login(formValue.email, formValue.password)
            .then((data) => {
                if (data.token) {
                    setFormValue({
                        email: '',
                        password: ''
                    });
                    props.handleLogin();
                    navigate(paths.main, { replace: true });
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <Form onSubmit={handleSubmit} formSubmitText="Войти">
            <InputFieldset
                onChange={handleChange}
                value={formValue.email}
                required={true}
                type="email"
                name="email"
                label="E-mail"
                placeholder="Введите email"
                id="profile-email"
                autoComplete="on"
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
                autoComplete="off"
            />
        </Form>
    )
}

export default LoginForm;