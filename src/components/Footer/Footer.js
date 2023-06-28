import './Footer.css'

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container container">
                <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
                <p className="footer__copyright">&copy; 2023</p>
                <nav className="footer__navigation">
                    <a href="https://practicum.yandex.ru/" target="_blank" className="footer__link link" rel="noreferrer">Яндекс.Практикум</a>
                    <a href="https://github.com/Mori-verum" target="_blank" className="footer__link link" rel="noreferrer">Github</a>
                </nav>
            </div>
        </footer>
    )
}

export default Footer;