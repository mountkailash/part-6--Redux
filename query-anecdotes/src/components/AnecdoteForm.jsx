import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests' 



const AnecdoteForm = ( {createNotification} ) => {

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (data, variables) => {
      console.log('Data received from createAnecdote mutation:', data);
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      createNotification(`added anecdote "${variables.content}"`)
    },
    onError: (error) => {
      console.error('An error occurred while creating the anecdote:', error);
      createNotification('Failed to create anecdote. Please try again later.');
    }
   })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (content.length >= 5) {
      newAnecdoteMutation.mutate({ content, votes: 0 })
      event.target.anecdote.value = ''
      console.log('new anecdote', content)
    } else {
      console.log('anecdote content must be at least 5 characters long.')
      createNotification('anecdote content must be at least 5 characters long.');
    }
    
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
