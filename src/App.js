import React, { useState, useEffect, useContext } from 'react'
import List from './List'
import Alert from './Alert'
import { AppContext } from './context'

function App() {  
  const {setItem,handleSubmit,item,list,isEditing,error}=useContext(AppContext)
  return (
    <div className="section">
      <h1>Grocery</h1>
      {error.show && (<Alert {...error} />)}
      <form onSubmit={handleSubmit} >
        <input value={item} onChange={(e)=>setItem(e.target.value)} type="text" placeholder="Tell me your dream" />
        <button type="submit">{isEditing.edit?"Edit":"Add"}</button>
      </form>
      {list.length > 0 && list.map(item=>{
        return <List key={item.id} {...item} />
      }) }
    </div>
  )
}

export default App
