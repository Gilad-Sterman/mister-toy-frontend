import { MyChart } from "../cmps/MyChart"
import { useDispatch, useSelector } from 'react-redux'
import { loadToys } from "../store/actions/toy.actions"
import { MyPieChart } from "../cmps/MyPieChart"
import { MyLineChart } from "../cmps/MyLineChart"
import { SET_FILTER_BY } from "../store/reducers/toy.reducer"
import { toyService } from "../services/toy.service"
import { useEffect } from "react"


export function Dashboard() {
    const dispatch = useDispatch()

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = toyService.getDefaultFilter()

    const cheapToys = toys.filter(toy => toy.price <= 30)
    const reasonableToys = toys.filter(toy => toy.price > 30 && toy.price <= 100)
    const expensiveToys = toys.filter(toy => toy.price > 100)
    const toysInStock = toys.filter(toy => toy.inStock)

    useEffect(() => {
        dispatch({ type: SET_FILTER_BY, filterBy })
        loadToys()
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load toys')
            })
    }, [])

    const dataPrice = {
        labels: ['Cheap', 'Reasonable', 'Expensive'],
        datasets: [
            {
                label: 'Count',
                data: [cheapToys.length, reasonableToys.length, expensiveToys.length],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    const dataStock = {
        labels: ['In stock', 'Out of stock'],
        datasets: [
            {
                label: 'Count',
                data: [toysInStock.length, toys.length - toysInStock.length],
                backgroundColor: [
                    'rgba(155, 130, 132, 0.6)',
                    'rgba(155, 206, 86, 0.6)',
                ],
                borderColor: [
                    'rgba(155, 99, 132, 1)',
                    'rgba(155, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const dataSales = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Sales per month',
                data: ['25', '37', '56', '32', '43', '65', '76'],
                borderColor: 'rgb(55, 199, 132)',
                backgroundColor: 'rgba(55, 199, 132)',
            },
        ],
    };


    return (
        <section className="dashboard">
            <h1>Dashboard</h1>
            <MyLineChart data={dataSales} />
            <section className="charts">
                <MyChart data={dataPrice} />
                <MyPieChart data={dataStock} />
            </section>
        </section>
    )
}