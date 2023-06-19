import { Link } from 'react-router-dom';
import './ClickThrough.css';

function ClickThrough(props) {
    return (
        <section className="click-through">
            <div className="click-through__container container">
                <p className="click-through__subtitle">{props.text} <Link to={props.path} className="click-through__link link">{props.linkText}</Link></p>
            </div>
        </section>
    )
}

export default ClickThrough;