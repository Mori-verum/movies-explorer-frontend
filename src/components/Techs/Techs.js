import SectionTitle from '../SectionTitle/SectionTitle';
import StackItem from '../StackItem/StackItem';
import './Techs.css'

function Techs() {
    return (
        <section className="techs section">
            <div className="container">
                <SectionTitle title="Технологии"/>
                <h3 className="techs__title">7 технологий</h3>
                <p className="techs__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <div className="techs__stack">
                    <StackItem text="HTML"/>
                    <StackItem text="CSS"/>
                    <StackItem text="JS"/>
                    <StackItem text="React"/>
                    <StackItem text="Git"/>
                    <StackItem text="Express.js"/>
                    <StackItem text="mongoDB"/>
                </div>
            </div>
        </section>
    )
}

export default Techs;