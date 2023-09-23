import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service"
import { saveToy } from "../store/actions/toy.actions"
import { Link, useNavigate, useParams } from "react-router-dom"
import { LabelSelect } from "../cmps/LabelSelect"

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
        let value = target.value
        if (field === 'price') value = +value
        if (field === 'inStock') value = (value === 'false') ? false : true
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
            <h1>New Toy</h1>
            {toy && <form className="toy-edit" onSubmit={onSaveToy}>
                <label htmlFor="name">
                    Name:
                    <input
                        placeholder="Name"
                        name="name"
                        id="name"
                        type="text"
                        value={toy.name}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="price">
                    Price:
                    <input
                        name="price"
                        type="number"
                        value={toy.price}
                        onChange={handleChange}
                    />
                </label>
                <select name="inStock" onChange={handleChange} value={(toy.inStock) ? true : "false"}>
                    <option value={true}>In stock</option>
                    <option value="false">Not in stock</option>
                </select>
                <LabelSelect toy={toy} setToy={setToy} />
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