import './AboutProject.css'

function AboutProject() {
    return (
        <section className="about section">
            <h2 className="about__title section-title">О проекте</h2>
            <div className="about__items">
                <div className="about__item">
                    <h3 className="about__item-title">Дипломный проект включал 5 этапов</h3>
                    <p className="about__item-description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about__item">
                    <h3 className="about__item-title">На выполнение диплома ушло 5 недель</h3>
                    <p className="about__item-description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="about__timeline">
                <div className="about__stage-back about__timeline-item">1 неделя</div>
                <div className="about__stage-front about__timeline-item">4 недели</div>
                <p className="about__stage-caption">Back-end</p>
                <p className="about__stage-caption">Front-end</p>
            </div>
        </section>
    )
}

export default AboutProject;