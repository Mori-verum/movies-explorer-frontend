import './PageWithForm.css';
import Greeting from '../Greeting/Greeting';
import ClickThrough from '../ClickThrough/ClickThrough';

function PageWithForm(props) {
    return (
        <main>
            <section className="page-with-form">
                <Greeting text={props.greetingText} />
                <div className="page-with-form__container container">
                    {props.form}
                    <ClickThrough text={props.clickThroughText} path={props.clickThroughPath} linkText={props.clickThroughLinkText} />
                </div>
            </section>
        </main>
    )
}

export default PageWithForm;