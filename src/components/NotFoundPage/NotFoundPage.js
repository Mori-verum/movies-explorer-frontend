import './NotFoundPage.css';

import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
    const navigate = useNavigate();

    function goBack() {
        navigate(-1);
    }

    return (
        <section className="not-found-page">
            <div className="not-found-page__info-container">
                <h1 className="not-found-page__title">404</h1>
                <p className="not-found-page__subtitle">Страница не найдена</p>
            </div>
            <button className="not-found-page__button button" onClick={goBack}>Назад</button>
        </section>
    )
}

export default NotFoundPage;