import React from 'react'
import { useDispatch } from 'react-redux'
import { displayNotification } from '../utilis/notificationUtils' 
import { createNewAnecdote } from '../reducers/anecdoteSlice' 


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createNewAnecdote(content))
        displayNotification(dispatch, `you added ${content}`, 10)
      }

      return (
        <div>
            <h2>create new</h2>
        <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
        </div>
      )
}

export default AnecdoteForm