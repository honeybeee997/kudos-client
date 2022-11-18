import { useRef, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import { Alert, Box, Typography } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useHttp } from './../../../../hooks/useHttp'
import { server, token } from './../../../../../serverConfig'
import { toast } from 'react-hot-toast'
import LoadingSpinner from 'src/views/utils/LoadingSpinner'

const FormLayoutsIcons = ({ user, updateTable, closeModal }) => {
  const [error, setError] = useState()

  const emailInputRef = useRef()

  const { isLoading, sendRequest } = useHttp()

  const formSubmitHandler = async e => {
    e.preventDefault()
    setError(null)

    // Getting the email input value on submit
    const email = emailInputRef.current.querySelector('input').value
    if (email !== user.email) {
      return setError("Email doesn't match")
    }

    const body = null
    const headers = { Authorization: `Bearer ${token}`, 'content-type': 'application/json' }
    const response = await sendRequest(`${server}/admin/delete/${email}`, 'DELETE', body, headers)
    if (response.status !== 'success') {
      return setError(response.message || 'Something went wrong. Please try again')
    }
    closeModal()
    updateTable()
    toast.success('Member Deleted successfully')
  }

  const alertIcon = (
    <Box component='span' sx={{ display: 'flex', mr: 2, color: 'error.main', justifyContent: 'center' }}>
      <Icon icon='mdi:alert' />
    </Box>
  )

  const email = user.email
  const name = user.name

  const errorComponent = (
    <Box width='95%' maxWidth='400px' display='flex' justifyContent='center' margin='0 auto 1rem' textAlign='center'>
      <Alert severity='error'>{error}</Alert>
    </Box>
  )

  return (
    <Card>
      <CardHeader title={alertIcon} />
      <Box textAlign='center'>
        <Typography variant='subtitle2'>{`Type ${email} to delete ${name}`}</Typography>
      </Box>
      <CardContent>
        {error && errorComponent}
        <form onSubmit={formSubmitHandler}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField fullWidth type='email' ref={emailInputRef} label='Email' placeholder={email} />
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' variant='contained' size='large' color='error' disabled={isLoading}>
                {isLoading ? <LoadingSpinner /> : 'Delete'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormLayoutsIcons
