import React from 'react'
import { Modal } from '@mui/material'
import FormLayoutsIcons from './../forms/forms/form-layouts/FormLayoutsIcons'

import styles from './RemoveEmployee.module.css'

const RemoveEmployee = props => {
  const { open, handleClose, user, updateTable } = props

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <div className={styles.remove_employee_wrapper}>
        <FormLayoutsIcons user={user} updateTable={updateTable} closeModal={handleClose} />
      </div>
    </Modal>
  )
}

export default RemoveEmployee
