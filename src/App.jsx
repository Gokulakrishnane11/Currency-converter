import { useState } from 'react'
import './App.css'
import { CurrencyConverter } from './Components/Currency-converter'

function App() {
  const [count, setCount] = useState(0)


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center">
      <div className=' container'>
          <CurrencyConverter/>
      </div>
      
      
    </div>
  )
}

export default App
