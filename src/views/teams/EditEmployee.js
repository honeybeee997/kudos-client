import React, { useState } from 'react'
import { Modal } from '@mui/material'
import EmployeeForm from '../forms/Employee/EmployeeForm'
import { useHttp } from 'src/hooks/useHttp'
import { server, token } from './../../../serverConfig'
import { toast } from 'react-hot-toast'

const EditEmployee = props => {
  const { open, handleClose, employeeData, updateTable } = props
  const [error, setError] = useState(null)
  const { isLoading, sendRequest } = useHttp()
  const updateEmployeeHandler = async data => {
    setError(null)
    const userId = employeeData.id
    const body = JSON.stringify(data)
    const headers = { Authorization: `Bearer ${token}`, 'content-type': 'application/json' }
    const response = await sendRequest(`${server}/admin/edit-member/${userId}`, 'PUT', body, headers)
    if (response.status !== 'success') {
      return setError(response.message || 'Something went wrong. Please try again')
    }
    handleClose()
    updateTable()
    toast.success('Member updated successfully')
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <div>
        <EmployeeForm
          headingText='Editing member'
          isEditMode={true}
          employeeData={employeeData}
          isLoading={isLoading}
          error={error}
          onSubmit={updateEmployeeHandler}
        />
      </div>
    </Modal>
  )
}

export default EditEmployee
