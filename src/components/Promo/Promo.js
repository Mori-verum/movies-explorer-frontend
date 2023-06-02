import './Promo.css';
import landingLogo from '../../images/landing-logo.svg';

function Promo() {
    return (
        <section className="promo section">
            <div className="promo__text-container">
                <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
                <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                <button className="promo__button">Узнать больше</button>
            </div>
            <img className="promo__image" src={landingLogo} alt="Веб-земля" />
        </section>
    )
}

export default Promo;