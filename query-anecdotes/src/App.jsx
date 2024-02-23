import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query' 
import { getAnecdotes, updateVotes } from './requests' 
import {  useNotification } from './NotificationContext' 


const App = () => {
  const { dispatch } = useNotification();

  const createNotification = (message) => {
    dispatch({ type: 'SHOW_NOTIFICATION', payload: message });
  };


  const result = useQuery({
    queryKey: [ 'anecdotes' ],
    queryFn: getAnecdotes
  })
  console.log(JSON.parse(JSON.stringify(result)))

  const queryClient = useQueryClient()

  const voteMutation = useMutation({ 
    mutationFn: updateVotes,
    onSuccess: (data, variables) => {
      console.log('the data', data, 'the variables:', variables)
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      createNotification(`you voted "${variables.content}"`)
    }
   })

  const handleVote = (anecdote) => {
    console.log('anecdote is', anecdote)
    const updatedVotes = { ...anecdote, votes: anecdote.votes + 1 } 
    voteMutation.mutate( updatedVotes, { content: anecdote.content } )
  }

  if(result.isLoading) {
    return <div>loading data...</div>
  }

  if(result.isError) {
    return <div>anedote service is not available due to problems in server</div>
  }

  const anecdotes = result.data


  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm createNotification={createNotification} />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
