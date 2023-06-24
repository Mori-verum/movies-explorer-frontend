import './Techs.css';
import SectionTitle from '../SectionTitle/SectionTitle';
import StackItem from '../StackItem/StackItem';
import { techStack } from '../../utils/config';

function Techs() {
    const stackItems = techStack.map((item) => <StackItem key={ item } text={ item } />);

    return (
        <section className="techs">
            <div className="container">
                <SectionTitle title="Технологии"/>
                <h3 className="techs__description-title">7 технологий</h3>
                <p className="techs__description-subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <ul className="techs__stack">
                    { stackItems }
                </ul>
            </div>
        </section>
    )
}

export default Techs;