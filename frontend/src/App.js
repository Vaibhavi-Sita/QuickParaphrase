import React, { useState } from 'react'
import axios from 'axios'
import Slider from '@mui/material/Slider'
import './App.css'

function App() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [mode, setMode] = useState('standard')
  const [synonymsLevel, setSynonymsLevel] = useState(3)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const modes = [
    'standard',
    'fluency',
    'humanize',
    'formal',
    'academic',
    'simple',
    'creative',
  ]

  const handleParaphrase = async (e) => {
    e.preventDefault()
    if (!inputText.trim()) return

    setIsLoading(true)
    setError('')

    try {
      const response = await axios.post(
        'https://api.deepseek.com/v1/paraphrase',
        {
          text: inputText,
          mode: mode,
          synonyms_level: synonymsLevel,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_DEEPSEEK_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      )

      setOutputText(response.data.result)
    } catch (err) {
      setError('Error paraphrasing text. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='container'>
      <h1>DeepSeek Paraphraser</h1>

      <div className='controls'>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className='mode-select'
        >
          {modes.map((mode) => (
            <option key={mode} value={mode}>
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </option>
          ))}
        </select>

        <div className='slider-container'>
          <label>Synonyms Level: {synonymsLevel}</label>
          <Slider
            value={synonymsLevel}
            min={1}
            max={5}
            onChange={(e, value) => setSynonymsLevel(value)}
            className='synonyms-slider'
          />
        </div>
      </div>

      <div className='text-container'>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder='Enter text to paraphrase...'
          className='text-area'
        />

        <div className='output-area'>
          {isLoading ? (
            <div className='loader'>Processing...</div>
          ) : (
            outputText || 'Paraphrased text will appear here'
          )}
          {error && <div className='error'>{error}</div>}
        </div>
      </div>

      <button
        onClick={handleParaphrase}
        disabled={isLoading}
        className='paraphrase-btn'
      >
        Paraphrase Now
      </button>
    </div>
  )
}

export default App
