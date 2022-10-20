import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },      
    setAnecdotes(state, action) {
      return action.payload
    },
    changeAnecdote(state, action) {
      return state.map(anecdote => 
        anecdote.id !== action.payload.id ? anecdote : action.payload.changedAnecdote
      )
    }  

  }
})

export const { appendAnecdote, setAnecdotes, changeAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const notes = await anecdoteService.getAll()
    dispatch(setAnecdotes(notes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newNote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newNote))
  }
}

export const addVote = (id) => {
  return async (dispatch, getState) => {
    const anecdoteToChange = getState().anecdotes.find(anecdote => anecdote.id === id)
    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1
    }
    const response = await anecdoteService.update(id, changedAnecdote)
    dispatch(changeAnecdote({ id, changedAnecdote }))
  }
}

export default anecdoteSlice.reducer