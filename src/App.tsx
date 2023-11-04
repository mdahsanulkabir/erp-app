import Footer from "./components/footer/Footer"
import Navbar from "./components/navbar/Navbar"
import styles from './App.module.css'
import Login from "./pages/login/Login"

function App() {

  return (
    <div className={styles.layout}>
      <header>
        <Navbar />
      </header>
      <main>
        {/* <div>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
          <p>slkfjalskjflaskdjfl</p>
        </div> */}
        <Login />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App
