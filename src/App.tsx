// src/App.tsx

import { useState } from 'react'
import reactLogo from './assets/react.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-[480px] w-full space-y-8">
        <header className="flex justify-center gap-4">
          {/* <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
            <img src={viteLogo} className="h-12" alt="Vite logo" />
          </a> */}
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img src={reactLogo} className="h-12" alt="React logo" />
          </a>
        </header>

        <main className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-white">Vite + React</h1>
          <button
            onClick={() => setCount((c) => c + 1)}
            className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            count is {count}
          </button>
          <p className="mt-4 text-sm text-gray-300">
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </main>
      </div>
    </div>
  )
}

export default App
