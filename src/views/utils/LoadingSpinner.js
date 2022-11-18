import { CircularProgress } from '@mui/material'
import React from 'react'

const LoadingSpinner = ({ size }) => {
  return <CircularProgress size={size || '20px'} />
}

export default LoadingSpinner
