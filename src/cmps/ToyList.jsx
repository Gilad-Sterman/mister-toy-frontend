import { Link } from "react-router-dom"
import { ToyPreview } from "./ToyPreview"


export function ToyList({ toys, onRemoveToy }) {
    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />
                    <div>
                        <button onClick={() => onRemoveToy(toy._id)}>X</button>
                        {/* <button onClick={() => onEditToy(toy)}>Edit</button> */}
                        <button>
                            <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
                        </button>
                    </div>
                </li>
            )}
        </ul>
    )
}