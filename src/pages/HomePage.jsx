import { Link, NavLink } from 'react-router-dom'
import pic from '../assets/img/toys.jpg'

export function HomePage() {
    return (
        <section className="home-page">
            <h1>Welcome to Mister Toy</h1>
            <img src={pic} style={{maxWidth: '70vw'}} />
            <button className="btn-to-catalog">
                <Link to="/toy">To the catalog →</Link>
            </button>
        </section>
    )
}

