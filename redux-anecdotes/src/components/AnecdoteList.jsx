import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteSlice'
import Notification from './Notification'
import { displayNotification } from '../utilis/notificationUtils'



const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter.value)
    const dispatch = useDispatch()

    const filteredAnecdotes = anecdotes.filter(anecdote => {
        if (filter && typeof filter === 'string') {
            return anecdote.content.toLowerCase().includes(filter.toLowerCase());
        }
        return true;    // If no filter, return all anecdotes
    });

    const handleVote = (id, content) => {
        console.log('vote', id)

        dispatch(voteAnecdote(id))
        displayNotification(dispatch, `you voted ${content}`, 10)
    }


    return (
        <div>
            <Notification />
            {filteredAnecdotes
                .sort((a, b) => b.votes - a.votes)
                .map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            { console.log("Anecdote content:", anecdote.content) }
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => handleVote(anecdote.id, anecdote.content)}>vote</button>

                        </div>
                    </div>
                )}
        </div>
    )
}

export default AnecdoteList