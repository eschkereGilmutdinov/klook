import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Header from './containers/header.jsx'
import Page from './pages/mainPage.jsx'
import TourPage from './pages/tourPage.jsx'
import Footer from './containers/footer.jsx'
import './App.css'
import './styles/page.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={(
            <>
              <Header></Header>
              <Page></Page>
              <Footer></Footer>
            </>
          )}
        />
        <Route path="/tour/:id" element={<TourPage></TourPage>} />
        <Route path="*" element={<Navigate to="/" replace></Navigate>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
