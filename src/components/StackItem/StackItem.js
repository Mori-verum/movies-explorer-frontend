import './StackItem.css'

function StackItem({ text }) {
    return (
        <li className="stack-item">
            <p className="stack-item__text">{text}</p>
        </li>
    )
}

export default StackItem;