import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from "./components/Signup"
import Signin from "./components/Signin"
import {Blogs} from "./pages/Blogs"


function App() {  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/blogs" element={<Blogs/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
