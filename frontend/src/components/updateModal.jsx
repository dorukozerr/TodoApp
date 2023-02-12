/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react'
import { VscClose, VscAdd, VscRemove, VscChevronDown } from 'react-icons/vsc'
import { AppContext } from '../context/AppContext'

const options = ['Not Started', 'In Progress', 'Completed']

export default function UpdateTodoModal(props) {
  const { onClose, data } = props
  const { fetchTodos, userData, updateTodo } = useContext(AppContext)
  const [content, setContent] = useState('')
  const [tag, setTag] = useState('')
  const [tags, setTags] = useState([])
  const [status, setStatus] = useState()
  const [isDropdownActive, setIsDropdownActive] = useState(false)

  useEffect(() => {
    setContent(data.content)
    setTags(data.tags)
    setStatus(data.status)
  }, [])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'scroll'
    }
  })

  return (
    <div className='modalBackground'>
      <div className='modalBody'>
        <div className='topbar'>
          <div className='left'>
            <h4>Create Todo</h4>
          </div>
          <div className='right'>
            <VscClose onClick={onClose} />
          </div>
        </div>
        <div className='modalContent'>
          <input
            type='text'
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder='Todo Content'
          />
          <div className='tagContainer'>
            <input
              type='text'
              value={tag}
              onChange={e => setTag(e.target.value)}
              placeholder='Enter Tag...'
            />
            <div
              className='addBtn'
              onClick={() =>
                tag !== '' && (setTags([...tags, tag]), setTag(''))
              }>
              <VscAdd />
            </div>
          </div>
          <div className='tagsContainer'>
            {tags &&
              tags.map((tag, index) => (
                <div key={index} className='tag'>
                  {tag}
                  <div
                    className='removeBtn'
                    onClick={() =>
                      setTags(
                        tags.filter((tag, tagIndex) => tagIndex !== index)
                      )
                    }>
                    <VscRemove />
                  </div>
                </div>
              ))}
          </div>
          <div
            className={`${
              isDropdownActive
                ? 'dropdownContainer activeDropdown'
                : 'dropdownContainer'
            }`}>
            <div
              className='dropdownBtn'
              onClick={() => setIsDropdownActive(!isDropdownActive)}>
              <span>{status ? status : 'Please Choose an Option'}</span>

              <VscChevronDown />
            </div>
            <div className='dropdown'>
              {options.map(option => (
                <div
                  key={option}
                  className='item'
                  onClick={() => (
                    setStatus(option), setIsDropdownActive(false)
                  )}>
                  {option}
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={async () => {
              if (content !== '' && status !== '') {
                const isErr = await updateTodo({
                  id: data._id,
                  fields: {
                    content,
                    tags,
                    status,
                  },
                })
                console.log(isErr)
                if (!isErr) {
                  onClose()
                  fetchTodos(userData.token)
                }
              }
            }}>
            Update
          </button>
        </div>
      </div>
    </div>
  )
}
