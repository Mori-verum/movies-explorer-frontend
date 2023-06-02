import './StackItem.css'

function StackItem({ text }) {
    return (
        <div className="stack-item">
            <p className="stack-item__text">{ text }</p>
        </div>
    )
}

export default StackItem;