import React, { useState } from 'react'
import axios from 'axios'
import {
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material'
import { FiArrowRight } from 'react-icons/fi'
import './App.css'

const App = () => {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [mode, setMode] = useState('standard')
  const [synonymsLevel, setSynonymsLevel] = useState(3)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const modes = [
    { value: 'standard', label: 'Standard' },
    { value: 'fluency', label: 'Fluency' },
    { value: 'humanize', label: 'Humanize' },
    { value: 'formal', label: 'Formal' },
    { value: 'academic', label: 'Academic' },
    { value: 'simple', label: 'Simple' },
    { value: 'creative', label: 'Creative' },
  ]

  const handleParaphrase = async (e) => {
    e.preventDefault()
    if (!inputText.trim()) {
      setError('Please enter some text to paraphrase')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/paraphrase`,
        {
          text: inputText,
          mode: mode,
          synonymsLevel: synonymsLevel,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      setOutputText(response.data)
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to paraphrase text. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='app-container'>
      <header className='app-header'>
        <h1>AI Paraphraser</h1>
        <p>Transform your text using advanced AI rewriting</p>
      </header>

      <div className='controls-container'>
        <FormControl fullWidth className='mode-select'>
          <InputLabel>Paraphrasing Mode</InputLabel>
          <Select
            value={mode}
            label='Paraphrasing Mode'
            onChange={(e) => setMode(e.target.value)}
          >
            {modes.map((mode) => (
              <MenuItem key={mode.value} value={mode.value}>
                {mode.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className='slider-container'>
          <label>Synonyms Intensity (Level {synonymsLevel})</label>
          <Slider
            value={synonymsLevel}
            min={1}
            max={5}
            step={1}
            marks={[
              { value: 1, label: 'Low' },
              { value: 2, label: '' },
              { value: 3, label: 'Medium' },
              { value: 4, label: '' },
              { value: 5, label: 'High' },
            ]}
            onChange={(e, value) => setSynonymsLevel(value)}
            valueLabelDisplay='auto'
          />
        </div>
      </div>

      <div className='text-container'>
        <div className='input-section'>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder='Enter text to paraphrase...'
            className='text-area'
            disabled={isLoading}
          />
          <button
            onClick={handleParaphrase}
            disabled={isLoading || !inputText.trim()}
            className='paraphrase-button'
          >
            {isLoading ? (
              <CircularProgress size={24} color='inherit' />
            ) : (
              <>
                Paraphrase Now
                <FiArrowRight className='arrow-icon' />
              </>
            )}
          </button>
        </div>

        <div className='output-section'>
          <div className='output-content'>
            {isLoading ? (
              <div className='loading-overlay'>
                <CircularProgress size={40} />
                <p>Rewriting your text...</p>
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
