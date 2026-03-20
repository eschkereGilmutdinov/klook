import '../styles/tourPageStyles.css'
import Header from '../containers/header'
import Footer from '../containers/footer'
import TourPageContainer from '../containers/tourPage/TourPageContainer'

export default function ShowTourPage() {
    return (
        <div className="tour-page-scope">
            <Header></Header>
            <main>
                <div className="page">
                    <TourPageContainer></TourPageContainer>
                </div>
            </main>
            <Footer></Footer>
        </div>
    )
}
