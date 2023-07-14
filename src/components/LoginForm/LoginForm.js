import Form from "../Form/Form";
import InputFieldset from "../InputFieldset/InputFieldset";
import { useInputValidation } from "../../utils/hooks/use-input-validation";

function LoginForm(props) {
    const email = useInputValidation('E-mail', '', { isEmpty: true, isEmail: false });
    const password = useInputValidation('Пароль', '', { isEmpty: true, minLength: 8 });

    function handleSubmit() {
        props.handleLogin({ password: password.inputValue, email: email.inputValue });
    }

    return (
        <Form
            serverErrorMessage={props.loginMessage}
            handleSubmit={handleSubmit}
            isSubmitDisabled={!email.isValid || !password.isValid}
            formSubmitText={props.isLoadingMessage ? props.loadingMessage : "Войти"}
        >
            <InputFieldset
                validationMessage={email.validationMessage}
                isDirty={email.isDirty}
                value={email.inputValue}
                onChange={email.handleInputChange}
                onBlur={email.handleInputBlur}
                required={true}
                type="email"
                name="email"
                label="E-mail"
                placeholder="Введите email"
                id="profile-email"
                autoComplete="on"
            />
            <InputFieldset
                validationMessage={password.validationMessage}
                isDirty={password.isDirty}
                value={password.inputValue}
                onChange={password.handleInputChange}
                onBlur={password.handleInputBlur}
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