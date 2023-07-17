import './PageWithForm.css';
import Greeting from '../Greeting/Greeting';
import ClickThrough from '../ClickThrough/ClickThrough';
import { Navigate } from "react-router-dom";
import { PATHS } from "../../utils/config";

function PageWithForm(props) {

    return (
        !props.loggedIn ?
            (<main>
                <section className="page-with-form">
                    <Greeting text={props.greetingText} />
                    <div className="page-with-form__container container">
                        {props.form}
                        <ClickThrough text={props.clickThroughText} path={props.clickThroughPath} linkText={props.clickThroughLinkText} />
                    </div>
                </section>
            </main>) :
            <Navigate to={PATHS.main} replace />
    )
}

export default PageWithForm;