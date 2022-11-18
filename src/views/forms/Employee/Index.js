import React, { useState } from 'react'
import { Box, Button, Modal } from '@mui/material'
import toast from 'react-hot-toast'
import EmployeeForm from './EmployeeForm'
import { useHttp } from 'src/hooks/useHttp'
import { server, token } from './../../../../serverConfig'

const NewMember = ({ headingText, updateTable }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [error, setError] = useState(null)

  const { isLoading, sendRequest } = useHttp()

  const createNewUserHandler = async data => {
    setError(null)
    const body = JSON.stringify(data)
    const headers = { Authorization: `Bearer ${token}`, 'content-type': 'application/json' }
    const response = await sendRequest(`${server}/admin/add-new-member`, 'POST', body, headers)
    if (response.status !== 'success') {
      return setError(response.message || 'Something went wrong. Please try again')
    }
    handleClose()
    updateTable()
    toast.success('Member added successfully')
  }

  return (
    <>
      <Box paddingTop='3rem'>
        <Button variant='contained' onClick={handleOpen}>
          Add new member
        </Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <div>
          <EmployeeForm headingText={headingText} onSubmit={createNewUserHandler} isLoading={isLoading} error={error} />
        </div>
      </Modal>
    </>
  )
}

export default NewMember
