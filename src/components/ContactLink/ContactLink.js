import './ContactLink.css'

function ContactLink({ link, text }) {
    return (
        <a className="contact-link link" href={link} target="_blank" rel="noopener noreferrer">{text}</a>
    )
}

export default ContactLink;