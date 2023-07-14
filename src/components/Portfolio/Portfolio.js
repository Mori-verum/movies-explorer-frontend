import PortfolioLink from '../PortfolioLink/PortfolioLink';
import './Portfolio.css'

function Portfolio() {
    return (
        <div className="portfolio">
            <div className="portfolio__container container">
                <h4 className="portfolio__title">Портфолио</h4>
                <ul className="portfolio__project-list">
                    <li className="portfolio__project-item">
                        <PortfolioLink link="https://mori-verum.github.io/how-to-learn/" text="Статичный сайт" />
                    </li>
                    <li className="portfolio__project-item">
                        <PortfolioLink link="https://mori-verum.github.io/russian-travel/" text="Адаптивный сайт" />
                    </li>
                    <li className="portfolio__project-item">
                        <PortfolioLink link="https://github.com/Mori-verum/react-mesto-api-full-gha" text="Одностраничное приложение" />
                    </li>
                </ul>
            </div>
        </div >
    )
}

export default Portfolio;