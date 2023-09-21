import { Link } from "react-router-dom"


export function ToyPreview({ toy }) {
    return (
        <article>
            <h1>{toy.name}</h1>
            {!toy.inStock && <h5>Out of stock</h5>}
            <h3>🧸</h3>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <hr />
            <Link to={`/toy/${toy._id}`}>Details</Link>
        </article>
    )
}