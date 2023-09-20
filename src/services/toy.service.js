
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
// import { httpService } from './http.service.js'

// const BASE_URL = 'toy/'
const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            let toysToreturn = toys
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                toysToreturn = toysToreturn.filter(toy => regExp.test(toy.name))
            }
            if (filterBy.inStock === 'inStock') {
                toysToreturn = toysToreturn.filter(toy => toy.inStock)
            }
            if (filterBy.inStock === 'notInStock') {
                toysToreturn = toysToreturn.filter(toy => !toy.inStock)
            }
            if (filterBy.sortBy === 'price') {
                toysToreturn = toysToreturn.sort((toy1, toy2) => toy2.price - toy1.price)
            }
            if (filterBy.sortBy === 'createdAt') {
                toysToreturn = toysToreturn.sort((toy1, toy2) => toy2.createdAt - toy1.createdAt)
            }
            if (filterBy.sortBy === 'name') {
                toysToreturn = toysToreturn.sort((toy1, toy2) => {
                    if (toy2.name > toy1.name) return -1
                    return 1
                })
            }
            return toysToreturn
        })
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    // return Promise.reject('Oh no!')
    return storageService.remove(STORAGE_KEY, toyId)
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
        return httpService.put(BASE_URL, toy)
    } else {
        return storageService.post(STORAGE_KEY, toy)
        return httpService.post(BASE_URL, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: 0,
        labels: [],
        createdAt: Date.now(),
        inStock: true,
    }
}


function getDefaultFilter() {
    return { txt: '', inStock: 'all', labels: [], sortBy: 'name' }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


