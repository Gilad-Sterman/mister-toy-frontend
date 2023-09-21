import { useDispatch, useSelector } from 'react-redux'
import { toyService } from '../services/toy.service'
import { loadToys, removeToy, saveToy } from '../store/actions/toy.actions'
import { ADD_TOY, REMOVE_TOY, SET_FILTER_BY, SET_IS_LOADING, SET_TOYS, UPDATE_TOY } from '../store/reducers/toy.reducer'

import { useEffect } from 'react'
import { ToyList } from '../cmps/ToyList'
import { Link } from 'react-router-dom'
import { ToyFilter } from '../cmps/ToyFilter'

export function ToyIndex() {
    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToys()
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load toys')
            })
    }, [filterBy])

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                console.log('Toy removed')
                // showSuccessMsg('Toy removed')
            })
            .catch(err => {
                console.log('Cannot remove toy', err)
                // showErrorMsg('Cannot remove toy')
            })
    }

    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })
        // console.log(filterBy)
    }

    return (
        <section className="toy-index">
            <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <button className='btn-add-toy'>
                <Link to={`/toy/edit/`}>Add Toy ➕</Link>
            </button>
            <ToyList toys={toys} onRemoveToy={onRemoveToy} />
        </section>
    )
}