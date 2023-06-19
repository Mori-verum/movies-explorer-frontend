import './Greeting.css'
import Logo from '../Logo/Logo';

function Greeting(props) {
    return (
        <section className="greeting">
            <div className="greeting__container container">
                <Logo />
                <h2 className="greeting__text">{props.text}</h2>
            </div>
        </section>
    )
}

export default Greeting;