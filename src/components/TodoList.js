import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Item from "./Item"
import { Styles } from "./style"
import { addTaskAction } from '../store/actions'

const TodoList = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState(false)
  const tasks = useSelector((state) => state.data)
  const dispatch = useDispatch()

  const addTask = () => {
    if (title === "") {
      setError(true)
      return
    }
    setError(false)
    dispatch(addTaskAction({ title, description }))
    setTitle("")
    setDescription("")
  }

  return (
    <div style={Styles.container}>
      <h1 style={Styles.header}>To-Do List</h1>
      <div className="flex">
        <div className="flex column input col-9">
          <div className="flex justify-space mb-30">
            <div className="col-3 left">Title</div>
            <input
              className="col-9"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="flex justify-space">
            <div className="col-3 left">Description</div>
            <textarea
              className="col-9"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <button className="col-3" type="button" onClick={addTask}>
          Add Task
        </button>
      </div>
      <div className={`${!error && "hide"} error`}>Title must not be empty</div>
      <div>
        {tasks.map((task, index) => (
          <Item key={index} task={task} index={index} />
        ))}
      </div>
    </div>
  )
}

export default TodoList
