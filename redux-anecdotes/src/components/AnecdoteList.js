import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        console.log(anecdotes)
        return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
    })
    const dispatch = useDispatch()
  
    const vote = (id) => {
      console.log(`vote ${id}`)
      dispatch(addVote(id))
      dispatch(setNotification(`you voted '${anecdotes.find(anecdote => anecdote.id === id).content}'`))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    }
    
    const sorted = [...anecdotes].sort((a, b) => b.votes - a.votes)

    return(
        <div>
            {sorted.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList