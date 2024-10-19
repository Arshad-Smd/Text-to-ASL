import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Pricing from './Pages/Pricing/Pricing'
import Learning from './Pages/Learning/Learning'
import CarouselWithQuiz from './Pages/CarouselWithQuiz/CarouselWithQuiz'
import Request from './Pages/Request/Request'


function App() {

  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/request' element={<Request />} />
      <Route path='/pricing' element={<Pricing />} />
      <Route path='/learning' element={<Learning />} />
      <Route path='/learning/test' element={<CarouselWithQuiz />} />
    </Routes>
    </>
  )
}

export default App
