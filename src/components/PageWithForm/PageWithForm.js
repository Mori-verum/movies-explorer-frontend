import './PageWithForm.css';
import Form from '../Form/Form';
import Greeting from '../Greeting/Greeting';
import ClickThrough from '../ClickThrough/ClickThrough';

function PageWithForm(props) {
    return (
        <section className="page-with-form">
            <Greeting text={ props.greetingText } />
            <div className="page-with-form__container container">
                <Form buttonText={ props.formSubmitText }>
                    { props.formInputs }
                </Form>
                <ClickThrough text={ props.clickThroughText } path={ props.clickThroughPath } linkText={ props.clickThroughLinkText } />
            </div>
        </section>
    )
}

export default PageWithForm;