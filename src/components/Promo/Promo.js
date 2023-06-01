import './Promo.css';
import landingLogo from '../../images/landing-logo.svg';

function Promo() {
    return (
        <section className="promo">
            <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
            <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
            <button className="promo__button">Узнать больше</button>
            <img className="promo__image" src={landingLogo} alt="Лэндинг" />
        </section>
    )
}

export default Promo;