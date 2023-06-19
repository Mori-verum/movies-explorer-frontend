import './PageWithForm.css';
import Form from '../Form/Form';
import InputFieldset from '../InputFieldset/InputFieldset';
import Greeting from '../Greeting/Greeting';
import ClickThrough from '../ClickThrough/ClickThrough';

function PageWithForm(props) {
    return (
        <section className="page-with-form">
            <Greeting text="Добро пожаловать!" />
            <div className="page-with-form__container container">
                <Form buttonText="Зарегистрироваться">
                    <InputFieldset name="name" label="Имя" />
                    <InputFieldset name="email" label="E-mail" />
                    <InputFieldset name="password" label="Пароль" />
                </Form>
                <ClickThrough text="Уже зарегистрированы?" path="/signin" linkText="Войти" />
            </div>
        </section>
    )
}

export default PageWithForm;