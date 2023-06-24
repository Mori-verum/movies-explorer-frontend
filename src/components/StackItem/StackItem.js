import './StackItem.css'

function StackItem({ key, text }) {
    return (
        <li key={key} className="stack-item">
            <p className="stack-item__text">{ text }</p>
        </li>
    )
}

export default StackItem;