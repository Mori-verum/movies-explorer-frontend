import ContactLink from '../ContactLink/ContactLink';
import SectionTitle from '../SectionTitle/SectionTitle';
import studentImage from '../../images/XxFJQcjgTVw.jpg'
import './AboutMe.css'
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
    return (
        <section className="student">
            <div className="student__container container">
                <SectionTitle title="Студент" />
                <div className="student__info-container">
                    <div className="student__text-container">
                        <h3 className="student__info-title">Анастасия</h3>
                        <p className="student__info-subtitle">Начинающий фронтенд-разработчик, 22&nbsp;года</p>
                        <p className="student__info-text">Прошла курс ЯПрактикума по веб-разработке. Увлекаюсь спортом, музыкой, книгами и языками. В дальнейшем хочу развиваться в сфере фронтенд-разработки, заниматься реальными проектами, изучать новый стек и углублять знания уже знакомых инструментов.</p>
                        <div className="student__contacts">
                            <ContactLink link="https://github.com/Mori-verum" text="Github" />
                        </div>
                    </div>
                    <img alt="Портрет студента" className="student__image" src={studentImage} />
                </div>
            </div>
            <Portfolio />
        </section>
    )
}

export default AboutMe;