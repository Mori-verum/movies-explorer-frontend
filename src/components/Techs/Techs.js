import './Techs.css';
import SectionTitle from '../SectionTitle/SectionTitle';
import StackItem from '../StackItem/StackItem';

function Techs() {

    return (
        <section className="techs">
            <div className="container">
                <SectionTitle title="Технологии" />
                <h3 className="techs__description-title">7 технологий</h3>
                <p className="techs__description-subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <ul className="techs__stack">
                    <StackItem text="HTML" />
                    <StackItem text="CSS" />
                    <StackItem text="JS" />
                    <StackItem text="React" />
                    <StackItem text="Git" />
                    <StackItem text="Express.js" />
                    <StackItem text="mongoDB" />
                </ul>
            </div>
        </section>
    )
}

export default Techs;