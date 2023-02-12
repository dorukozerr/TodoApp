import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { VscClose } from 'react-icons/vsc'
import { uploadImgURL } from '../helpers/endpoints'

export default function AddFileModal(props) {
  const { userData, fetchTodos } = useContext(AppContext)
  // eslint-disable-next-line react/prop-types
  const { onClose, type, _id } = props
  const [file, setFile] = useState(null)

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
          {type === 'image' && (
            <form
              onSubmit={async e => {
                e.preventDefault()
                const formData = new FormData()

                formData.append('image', file, file.name)

                var requestOptions = {
                  method: 'POST',
                  body: formData,
                  redirect: 'follow',
                  headers: {
                    Authorization: `Bearer ${userData.token}`,
                  },
                }

                const res = await fetch(
                  `${uploadImgURL()}?id=${_id}&is_thumbnail=true`,
                  requestOptions
                )
                  .then(response => response.json())
                  .then(result => {
                    return result
                  })
                  .catch(error => console.log('error', error))

                if (!res?.error) {
                  fetchTodos(userData.token)
                  onClose()
                }
              }}>
              <h1>Thumbnail Upload</h1>
              <input
                // eslint-disable-next-line react/no-unknown-property
                filename={file}
                onChange={() => setFile(event.target.files[0])}
                type='file'
                accept='image/*'
              />
              <button>Submit</button>
            </form>
          )}
          {type === 'all' && (
            <form
              onSubmit={async e => {
                e.preventDefault()
                const formData = new FormData()

                formData.append('image', file, file.name)

                var requestOptions = {
                  method: 'POST',
                  body: formData,
                  redirect: 'follow',
                  headers: {
                    Authorization: `Bearer ${userData.token}`,
                  },
                }

                const res = await fetch(
                  `${uploadImgURL()}?id=${_id}&name=${
                    file.name
                  }&is_thumbnail=false`,
                  requestOptions
                )
                  .then(response => response.json())
                  .then(result => {
                    return result
                  })
                  .catch(error => console.log('error', error))

                console.log(res)

                if (!res.error) {
                  fetchTodos(userData.token)
                  onClose()
                }
              }}>
              <h1>Attachment Upload</h1>
              <input
                // eslint-disable-next-line react/no-unknown-property
                filename={file}
                onChange={() => setFile(event.target.files[0])}
                type='file'
                accept='*'
              />
              <button>Submit</button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
