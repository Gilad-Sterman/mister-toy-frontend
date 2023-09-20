import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { useState } from 'react'
import { Provider } from 'react-redux'
import './assets/style/main.css'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { store } from './store/store'
import { ToyIndex } from './pages/ToyIndex'
import { HomePage } from './pages/HomePage'
import { AppHeader } from './cmps/AppHeader'
import { ToyDetails } from './pages/ToyDetails'
import { ToyEdit } from './pages/ToyEdit'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout app">
          <AppHeader />
          <main>
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<ToyEdit />} path="/toy/edit/" />
              <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />
            </Routes>
          </main>
        </section>
      </Router>
    </Provider>
  )
}

export default App
