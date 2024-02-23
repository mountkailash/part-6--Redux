import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'


const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    vote: (state, action) => {
      const { id } = action.payload;
      const anecdoteToVote = state.find(anecdote => anecdote.id === id);
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1;
      }
    },
    createAnecdote: (state, action) => {
      state.push(action.payload)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export const fetchAnecdotes = () => async (dispatch) => {
  
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  
};

export const createNewAnecdote = (content) => async(dispatch) => {

  const newanecdote = await anecdoteService.createNew(content)
  dispatch(createAnecdote(newanecdote))
}

export const voteAnecdote = (id) => async(dispatch, getstate) => {
  const state = getstate()
  const anecdoteToVote = state.anecdotes.find(anecdote => anecdote.id === id)
  if(!anecdoteToVote) return

  // update on the backend
  await anecdoteService.updateVote(id, anecdoteToVote.content, anecdoteToVote.votes + 1)

  // Fetch the updated anecdote from the backend
  const updatedAnecdote = await anecdoteService.getAnecdote(id)

  // Merge the updated votes from the backend while keeping other properties
  dispatch(vote({id, votes: updatedAnecdote.votes }))
}


export const { vote, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
