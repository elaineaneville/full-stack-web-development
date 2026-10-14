import './index.css'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import MovieList from './components/MovieList'

function App() {
  return (
    <>
      <Navigation />
      <main>
        <MovieList />
      </main>
      <Footer />
    </>
  )
}

export default App;