import './Promo.css';
import landingLogo from '../../images/landing-logo.svg';

function Promo() {

    function handleClick(evt) {
        evt.preventDefault();
        const element = document.getElementById("#aboutProject");
        element.scrollIntoView({behavior: "smooth"});
    }

    return (
        <section className="promo">
            <div className="promo__container container">
                <div className="promo__text-container">
                    <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
                    <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                    <button onClick={handleClick} className="promo__button button">Узнать больше</button>
                </div>
                <img className="promo__image" src={landingLogo} alt="Веб-Земля" />
            </div>
        </section>
    )
}

export default Promo;