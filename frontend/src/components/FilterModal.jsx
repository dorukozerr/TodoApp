import React, { useState, useEffect } from 'react'
import { VscClose, VscAdd, VscRemove, VscChevronDown } from 'react-icons/vsc'

const options = ['Not Started', 'In Progress', 'Completed']

export default function FilterModal(props) {
  // eslint-disable-next-line react/prop-types
  const { onClose, filter } = props
  const [content, setContent] = useState('')
  const [tag, setTag] = useState('')
  const [tags, setTags] = useState([])
  const [status, setStatus] = useState()
  const [isDropdownActive, setIsDropdownActive] = useState(false)

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
            <h4>Filter Modal</h4>
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
              filter({
                content,
                tags,
                status,
              })

              onClose()
            }}>
            Filter
          </button>
        </div>
      </div>
    </div>
  )
}
