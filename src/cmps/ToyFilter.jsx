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
        <section className="toy-filter">
            <input type="text" name="txt" onInput={setNewFilter} />
            <select name="labels" onChange={setNewFilter} >
                <option value="onWheels">On wheels</option>
                <option value="boxGame">Box game</option>
                <option value="art">Art</option>
                <option value="doll">Doll</option>
            </select>
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
    )
}