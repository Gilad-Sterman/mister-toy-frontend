import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service"
import { saveToy } from "../store/actions/toy.actions"
import { Link, useNavigate, useParams } from "react-router-dom"

export function ToyEdit() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        if (!toyId) {
            setToy(toyService.getEmptyToy())
            return
        }
        toyService.getById(toyId)
            .then((toy) => setToy(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                // showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        const field = target.name
        const value = (field === 'name') ? target.value : +target.value
        setToy(prevToy => ({ ...prevToy, [field]: value }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        toyService.save(toy)
            .then(() => navigate('/toy'))
            .catch(err => {
                console.log('Cannot save toy', err)
            })
    }

    return (
        <section className="toy-edit-add">
            <h1>Toy edit/add</h1>
            {toy && <form className="toy-edit" onSubmit={onSaveToy}>
                <input
                    name="name"
                    type="text"
                    value={toy.name}
                    onChange={handleChange}
                />
                <input
                    name="price"
                    type="number"
                    value={toy.price}
                    onChange={handleChange}
                />
                <button>Save</button>
            </form>
            }
            {!toy && <form className="toy-add">
                <input type="text" placeholder="Name" />
                <input type="text" placeholder="Price" />
            </form>
            }
            <Link to="/toy">Back</Link>
        </section>
    )
}