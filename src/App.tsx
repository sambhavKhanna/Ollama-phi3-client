import ollama from 'ollama/browser'
import { useState } from 'react'

function App() {

  const [prompt, setPrompt] = useState('')
  const [text, setText] = useState('')
  const sendPrompt = async () => {
    const response = await ollama.generate({
      model: 'phi3',
      prompt: prompt,
      stream: true
    })
    setText('')
    for await (const part of response) {
      setText(text => {

        return text + part.response
      })
    }
  }

  const generateImage = async () => {
    const test = await fetch(`http://127.0.0.1:5000/image-gen`, {
      method: 'GET',
    })
    const data = await test.json()
    console.log(data)
  }
  return (
    <div>
      <input onChange={(e) => { setPrompt(e.target.value) }}></input>
      <button onClick={sendPrompt}>Send</button>
      <div>
        {text}
      </div>
      <input onChange={(e) => { setPrompt(e.target.value) }}></input>
      <button onClick={generateImage}>Send</button>
    </div>
  )
}

export default App
