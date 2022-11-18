import React from 'react'
import FormLayoutsSeparator from '../forms/form-layouts/FormLayoutsSeparator'

import styles from './NewMember.module.css'

const NewMemberForm = ({ headingText, isEditMode, employeeData, onSubmit, isLoading, error }) => {

  return (
    <div className={styles.new_memeber_form}>
      <FormLayoutsSeparator
        headingText={headingText}
        isEditMode={isEditMode}
        onSubmit={onSubmit}
        isLoading={isLoading}
        employeeData={employeeData}
        error={error}
      />
    </div>
  )
}

export default NewMemberForm
