import { useState } from 'react'
import { Card, Grid, Button, Divider, MenuItem, TextField, Typography, Alert } from '@mui/material'
import { CardHeader, InputLabel, IconButton, CardContent, CardActions } from '@mui/material'
import { FormControl, OutlinedInput, InputAdornment, Select, Box } from '@mui/material'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import Icon from 'src/@core/components/icon'
import LoadingSpinner from './../../../utils/LoadingSpinner'

const FormLayoutsSeparator = ({ headingText, isEditMode, employeeData, onSubmit, isLoading, error = '' }) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(prevState => {
      return !prevState
    })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const formSubmitHandler = values => {
    onSubmit(values)
  }

  // Iinitial Values for formik
  let initialValues = {
    name: '',
    email: '',
    role: 'employee',
    kudos: '0',
    phoneNumber: '',
    password: ''
  }

  if (isEditMode) {
    // Initial values when editing a user
    delete initialValues.password

    initialValues = {
      name: employeeData?.name,
      email: employeeData?.email,
      role: employeeData?.role,
      kudos: employeeData?.kudos,
      phoneNumber: employeeData?.phoneNumber
    }
  }

  // Formik validation schema
  let validationSchema
  if (isEditMode) {
    validationSchema = Yup.object({
      name: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .max(15, 'Name must be between 3-15 characters')
        .required('Name is required'),
      email: Yup.string().email('Please enter a valid email').required('Email is required'),
      phoneNumber: Yup.string()
        .required('Phone Number is reuqired')
        .matches(/^[0-9]+$/, 'Phone number must be only digits')
        .min(11, 'Phone number must be exactly 11 digits')
        .max(11, 'Phone number must be exactly 11 digits')
    })
  } else {
    validationSchema = Yup.object({
      name: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .max(15, 'Name must be between 3-15 characters')
        .required('Name is required'),
      email: Yup.string().email('Please enter a valid email').required('Email is required'),
      phoneNumber: Yup.string()
        .required('Phone Number is reuqired')
        .matches(/^[0-9]+$/, 'Phone number must be only digits')
        .min(11, 'Phone number must be exactly 11 digits')
        .max(11, 'Phone number must be exactly 11 digits'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
    })
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: formSubmitHandler
  })

  const editModeFields = (
    <>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label='Name'
          id='name'
          name='name'
          {...formik.getFieldProps('name')}
          error={Boolean(formik.touched.name && formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label='Email'
          id='email'
          name='email'
          {...formik.getFieldProps('email')}
          error={Boolean(formik.touched.email && formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label='Phone No.'
          id='phoneNumber'
          name='phoneNumber'
          {...formik.getFieldProps('phoneNumber')}
          error={Boolean(formik.touched.phoneNumber && formik.errors.phoneNumber)}
          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel id='form-layouts-separator-select-label'>Role</InputLabel>
          <Select
            label='Role'
            id='form-layouts-separator-select'
            labelId='form-layouts-separator-select-label'
            {...formik.getFieldProps('role')}
          >
            <MenuItem value='manager'>Manager</MenuItem>
            <MenuItem value='employee'>Employee</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField fullWidth label='Kudos' id='kudos' name='kudos' {...formik.getFieldProps('kudos')} />
      </Grid>
    </>
  )

  const allFields = (
    <>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label='Name'
          id='name'
          name='name'
          {...formik.getFieldProps('name')}
          error={Boolean(formik.touched.name && formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label='Email'
          id='email'
          name='email'
          {...formik.getFieldProps('email')}
          error={Boolean(formik.touched.email && formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label='Phone No.'
          id='phoneNumber'
          name='phoneNumber'
          {...formik.getFieldProps('phoneNumber')}
          error={Boolean(formik.touched.phoneNumber && formik.errors.phoneNumber)}
          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel
            htmlFor='form-layouts-separator-password'
            error={Boolean(formik.touched.password && formik.errors.password)}
          >
            Password
          </InputLabel>
          <OutlinedInput
            label='Password'
            id='password'
            type={showPassword ? 'text' : 'password'}
            name='password'
            {...formik.getFieldProps('password')}
            error={Boolean(formik.touched.password && formik.errors.password)}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  edge='end'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  aria-label='toggle password visibility'
                >
                  <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        {formik.touched.password && formik.errors.password ? (
          <Typography lineHeight='1.25' marginLeft='14px' marginTop='3px' fontSize='0.75rem' color='error'>
            {formik.errors.password}
          </Typography>
        ) : null}
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel id='form-layouts-separator-select-label'>Role</InputLabel>
          <Select
            label='Role'
            id='form-layouts-separator-select'
            labelId='form-layouts-separator-select-label'
            {...formik.getFieldProps('role')}
          >
            <MenuItem value='manager'>Manager</MenuItem>
            <MenuItem value='employee'>Employee</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel id='form-layouts-separator-select-label'>Kudos</InputLabel>
          <Select
            label='Kudos'
            id='form-layouts-separator-select'
            labelId='form-layouts-separator-select-label'
            {...formik.getFieldProps('kudos')}
          >
            <MenuItem value='0'>0</MenuItem>
            <MenuItem value='5'>5</MenuItem>
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='15'>15</MenuItem>
            <MenuItem value='20'>20</MenuItem>
            <MenuItem value='25'>25</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </>
  )

  const formFields = isEditMode ? editModeFields : allFields
  const submitFromButtonText = isEditMode ? 'Save' : 'Add'
  const errorComponent = (
    <Box width='95%' maxWidth='400px' display='flex' justifyContent='center' margin='1rem auto 0' textAlign='center'>
      <Alert severity='error'>{error}</Alert>
    </Box>
  )
  return (
    <Card>
      <CardHeader title={headingText} />
      <Divider sx={{ m: '0 !important' }} />
      {error && errorComponent}
      <form onSubmit={formik.handleSubmit}>
        <CardContent>
          <Grid container spacing={5}>
            {formFields}
          </Grid>
        </CardContent>
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained' disabled={isLoading}>
            {isLoading ? <LoadingSpinner /> : submitFromButtonText}
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default FormLayoutsSeparator
