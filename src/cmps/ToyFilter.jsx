import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service"
import { MySelect } from "./MySelect"


export function ToyFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    onSetFilter = useRef(utilService.debounce(onSetFilter))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function setNewFilter({ target }) {
        const field = target.name
        const value = target.value

        if (field === 'labels') {
            const newLabels = (filterBy.labels)
            newLabels.push(value)
            const newFilter = { ...filterBy, labels: newLabels }
            setFilterByToEdit(newFilter)
            return
        }

        const newFilter = { ...filterBy, [field]: value }
        setFilterByToEdit(newFilter)
    }

    return (
        <section className="filter-container">
            <section className="toy-filter">
                <input type="text" name="txt" placeholder="Search 🔎" onInput={setNewFilter} />
                <select name="inStock" onChange={setNewFilter}>
                    <option value="all">All</option>
                    <option value="inStock">In stock</option>
                    <option value="notInStock">Not in stock</option>
                </select>
                <select name="sortBy" onChange={setNewFilter}>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="createdAt">Date</option>
                </select>
            </section>
            <section className="toy-select">
                <MySelect onSetFilter={onSetFilter.current} filterBy={filterBy} />
            </section>
        </section>
    )
}