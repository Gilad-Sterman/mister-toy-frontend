import { MySelect } from "./MySelect"


export function ToyFilter({ filterBy, onSetFilter }) {

    function setNewFilter({ target }) {
        const field = target.name
        const value = target.value

        if (field === 'labels') {
            const newLabels = (filterBy.labels)
            newLabels.push(value)
            const newFilter = { ...filterBy, labels: newLabels }
            onSetFilter(newFilter)
            return
        }

        const newFilter = { ...filterBy, [field]: value }
        onSetFilter(newFilter)
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
                <MySelect onSetFilter={onSetFilter} filterBy={filterBy} />
            </section>
        </section>
    )
}