import React from 'react'
import { useState } from 'react'
import { VscEdit, VscAdd } from 'react-icons/vsc'
import UpdateTodoModal from './updateModal'
import AddFileModal from './AddFileModal'

export default function Todo(todo) {
  const { content, status, tags, _id, thumbnail, attachments } = todo.props
  const [activeModal, setActiveModal] = useState('')
  const [modalType, setModalType] = useState('')

  const onClose = () => {
    setActiveModal('')
  }

  // eslint-disable-next-line no-undef
  const img = `${process.env.SERVER_URL}/files/${thumbnail}`

  return (
    <div className='todoContainer'>
      <div className='todoLeft'>
        <div className='row row1'>
          <div className='label'>Content</div>
          <div className='value'>{content}</div>
        </div>
        <div className='row row2'>
          <div className='label'>Status</div>
          <div className='value'>{status}</div>
        </div>
        <div className='row row3'>
          <div className='label'>Tags</div>
          <div className='value tags'>
            {tags.map((tag, index) => (
              <div className='tag' key={index}>
                {tag}
              </div>
            ))}
          </div>
        </div>
        <div className='row row4'>
          <div className='label'>Attachments</div>
          <div className='value'>
            <div className='attachmentsContainer'>
              {attachments.length !== 0 &&
                attachments.map((attachment, index) => (
                  <div className='attachment' key={index}>
                    <a
                      target='_blank'
                      key={`attachment-${content}-${index}`}
                      href={`${process.env.SERVER_URL}/files/${attachment.urlHash}`}
                      rel='noreferrer'>
                      {attachment.name}
                    </a>
                  </div>
                ))}
              <div
                className='addBtn'
                onClick={() => {
                  setActiveModal('addFile')
                  setModalType('all')
                }}>
                <VscAdd />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='todoRight'>
        {thumbnail === null ? (
          <button
            onClick={() => {
              setActiveModal('addFile')
              setModalType('image')
            }}>
            Add Thumbnail
          </button>
        ) : (
          <img src={img} alt='Thumbnail Image' />
        )}
        <div className='editBtn' onClick={() => setActiveModal('update')}>
          <VscEdit />
        </div>
      </div>

      {activeModal === 'update' && (
        <UpdateTodoModal onClose={onClose} data={todo.props} />
      )}
      {activeModal === 'addFile' && (
        <AddFileModal
          onClose={onClose}
          data={todo.props}
          type={modalType}
          _id={_id}
        />
      )}
    </div>
  )
}
