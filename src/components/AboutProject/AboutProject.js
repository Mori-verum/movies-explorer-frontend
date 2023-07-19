import './AboutProject.css'
import SectionTitle from '../SectionTitle/SectionTitle';

function AboutProject() {
    return (
        <section id="#aboutProject" className="about">
            <div className="container">
                <SectionTitle title="О проекте" />
                <div className="about__items">
                    <div className="about__item">
                        <h3 className="about__item-title">Дипломный проект включал 5&nbsp;этапов</h3>
                        <p className="about__item-description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.</p>
                    </div>
                    <div className="about__item">
                        <h3 className="about__item-title">На&nbsp;выполнение диплома ушло 5&nbsp;недель</h3>
                        <p className="about__item-description">У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </div>
                </div>
                <div className="about__timeline">
                    <div className="about__stage-back about__timeline-item">1 неделя</div>
                    <div className="about__stage-front about__timeline-item">4 недели</div>
                    <p className="about__stage-caption">Back-end</p>
                    <p className="about__stage-caption">Front-end</p>
                </div>
            </div>
        </section>
    )
}

export default AboutProject;