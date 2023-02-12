import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { VscAdd } from 'react-icons/vsc'
import { Puff } from 'react-loading-icons'
import Todo from '../components/Todo'
import CreateTodoModal from '../components/CreateTodoModal'
import FilterModal from '../components/FilterModal'

const options = ['content', 'tags', 'status']

export default function UserPanel() {
  const { todos, isPending, userData } = useContext(AppContext)
  const [todosToMap, setTodosToMap] = useState([])
  const [activeModal, setActiveModal] = useState('')
  const [isDropdownActive, setIsDropdownActive] = useState(false)
  const [dropdownContent, setDropdownContent] = useState('')
  const [filterTerm, setFilterTerm] = useState('')

  const closeModals = () => {
    setActiveModal('')
  }

  useEffect(() => {
    setTodosToMap(todos)
  }, [todos])

  useEffect(() => {
    if (filterTerm === '') {
      setTodosToMap(todos)
    } else {
      const filteredTodos = todos.filter(todo => {
        if (dropdownContent === 'content') {
          return todo.content.toLowerCase().includes(filterTerm.toLowerCase())
        }
        if (dropdownContent === 'tags') {
          let isExists = false
          todo.tags.forEach(tag => {
            if (tag.toLowerCase().includes(filterTerm.toLowerCase())) {
              isExists = true
            }
          })
          return isExists
        }
        if (dropdownContent === 'status') {
          return todo.status.toLowerCase().includes(filterTerm.toLowerCase())
        }
      })
      setTodosToMap(filteredTodos)
    }
  }, [filterTerm])

  return (
    <div className='userPanel'>
      <div className='infoPanel'>
        <div className='left'>
          <h3>
            Welcome <br />
            {userData.name}
          </h3>
        </div>
        <div className='right'>
          {todos && todos.length > 0 && (
            <div className='filterContainer'>
              <span>Filter By</span>
              <div
                className={`${
                  isDropdownActive
                    ? 'dropdownContainer activeDropdown'
                    : 'dropdownContainer'
                }`}>
                <div
                  className='dropdownBtn'
                  onClick={() => setIsDropdownActive(!isDropdownActive)}>
                  {dropdownContent === '' ? 'Select' : dropdownContent}
                </div>
                <div className='dropdownContent'>
                  {options.map((option, index) => (
                    <div
                      key={index}
                      className='option'
                      onClick={() => (
                        setDropdownContent(option), setIsDropdownActive(false)
                      )}>
                      {option}
                    </div>
                  ))}
                </div>
              </div>
              <input
                type='text'
                value={filterTerm}
                onChange={e => setFilterTerm(e.target.value)}
              />
            </div>
          )}
          <VscAdd onClick={() => setActiveModal('create')} />
        </div>
      </div>
      <div className='todosContainer'>
        {isPending ? (
          <Puff />
        ) : (
          todosToMap &&
          todosToMap.map(todo => <Todo key={todo._id} props={todo} />)
        )}
      </div>

      {activeModal === 'filter' && <FilterModal onClose={closeModals} />}
      {activeModal === 'create' && <CreateTodoModal onClose={closeModals} />}
    </div>
  )
}
