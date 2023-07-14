import './PortfolioLink.css'

function PortfolioLink({ link, text }) {
    return (
        <a className="portfolio-link link" href={link} target="_blank" rel="noreferrer">
            {text}
        </a>
    )
}

export default PortfolioLink;