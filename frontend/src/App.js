import React, { useState } from 'react'
import axios from 'axios'
import Slider from '@mui/material/Slider'
import CircularProgress from '@mui/material/CircularProgress'
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
        `${process.env.REACT_APP_API_URL}/api/paraphrase`,
        {
          text: inputText,
          mode: mode,
          synonymsLevel: synonymsLevel, // Match backend DTO field name
        }
      )

      setOutputText(response.data)
    } catch (err) {
      setError(err.response?.data || 'Error paraphrasing text')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='container'>
      <h1>AI Paraphraser</h1>

      <div className='controls'>
        <div className='control-group'>
          <label>Mode:</label>
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
        </div>

        <div className='control-group'>
          <label>Synonyms Intensity:</label>
          <div className='slider-container'>
            <Slider
              value={synonymsLevel}
              min={1}
              max={5}
              onChange={(e, value) => setSynonymsLevel(value)}
              valueLabelDisplay='auto'
              marks={[
                { value: 1, label: 'Low' },
                { value: 3, label: 'Medium' },
                { value: 5, label: 'High' },
              ]}
            />
          </div>
        </div>
      </div>

      <div className='text-container'>
        <div className='input-section'>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder='Enter text to paraphrase...'
            className='text-area'
            rows={8}
          />
          <button
            onClick={handleParaphrase}
            disabled={isLoading || !inputText.trim()}
            className='paraphrase-btn'
          >
            {isLoading ? <CircularProgress size={24} /> : 'Paraphrase'}
          </button>
        </div>

        <div className='output-section'>
          <div className='output-content'>
            {isLoading ? (
              <div className='loading-overlay'>
                <CircularProgress />
                <p>Rewriting text...</p>
              </div>
            ) : (
              outputText || (
                <div className='placeholder'>
                  Your paraphrased text will appear here
                </div>
              )
            )}
            {error && <div className='error-message'>{error}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
