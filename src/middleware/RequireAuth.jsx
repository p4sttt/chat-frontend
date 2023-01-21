import React from 'react'
import { useStore } from '../store'
import {Navigate} from 'react-router-dom'

export default function RequireAuth({children}) {
  const [Name, Room] = useStore(state => [state.Name, state.Room])

  if(!(Name && Room)){
    return <Navigate to="/login" replace={true}/>
  }

  return (children)
}
