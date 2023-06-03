// import { Link } from 'react-router-dom';
import './ContactLink.css'

function ContactLink({ link, text }) {
    return (
        <a className="contact-link" href={link} target="_blank" rel="noopener noreferrer">{ text }</a>
    )
}

export default ContactLink;