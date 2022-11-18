// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'

// ** Third Party Components
import toast from 'react-hot-toast'

// ** Custom Components
import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/@core/components/mui/avatar'
import NewMember from '../forms/Employee/Index'
import EditEmployee from '../teams/EditEmployee'
import RemoveEmployee from './../teams/RemoveEmployee'

// ** renders client column
const renderClient = params => {
  const { row } = params
  const stateNum = Math.floor(Math.random() * 6)
  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
  return <CustomAvatar src={row.avatarSrc || '/images/avatars/1.png'} sx={{ mr: 3, width: 34, height: 34 }} />
}

// Icons Manager
const iconsManager = {
  admin: {
    icon: (
      <Box component='span' sx={{ display: 'flex', mr: 2, color: 'error.main' }}>
        <Icon icon='mdi:laptop' />
      </Box>
    )
  },
  manager: {
    icon: (
      <Box component='span' sx={{ display: 'flex', mr: 2, color: 'success.main' }}>
        <Icon icon='mdi:cog' />
      </Box>
    )
  },
  employee: {
    icon: (
      <Box component='span' sx={{ display: 'flex', mr: 2, color: 'primary.main' }}>
        <Icon icon='mdi:account-outline' />
      </Box>
    )
  },
  kudos: {
    icon: (
      <Box component='span' sx={{ display: 'flex', mr: 2, color: 'success.main' }}>
        <Icon icon='mdi:chart-donut' />
      </Box>
    )
  },
  edit: {
    icon: (
      <Box component='span' sx={{ display: 'flex', mr: 2, color: 'primary.main' }}>
        <Icon icon='mdi:pencil' />
      </Box>
    )
  },
  trash: {
    icon: (
      <Box component='span' sx={{ display: 'flex', mr: 2, color: 'error.main' }}>
        <Icon icon='mdi:trash' />
      </Box>
    )
  }
}

const TableColumns = props => {
  const [editFormOpen, setEditFormOpen] = useState(false)
  const [removeUserForm, setRemoveUserForm] = useState(false)

  const handlers = {
    openEditFrom() {
      setEditFormOpen(true)
    },
    closeEditForm() {
      setEditFormOpen(false)
    },
    openRemoveUser() {
      setRemoveUserForm(true)
    },
    closeRemoveUser() {
      setRemoveUserForm(false)
    }
  }

  const [editUserFormValues, setEditUserFormValues] = useState({
    name: '',
    email: '',
    role: '',
    kudos: '',
    phoneNumber: ''
  })
  const [userToBeRemoved, setUserToBeRemoved] = useState({
    email: '',
    name: ''
  })

  const userEditHandler = params => {
    const { row } = params
    setEditUserFormValues({
      name: row.name,
      email: row.email,
      phoneNumber: row.phoneNumber,
      kudos: row.kudos,
      role: row.role,
      id: row.id
    })
    handlers.openEditFrom()
  }

  const userRemoveHandler = params => {
    const { row } = params
    setUserToBeRemoved({
      name: row.name,
      email: row.email
    })
    handlers.openRemoveUser()
  }

  const columns = [
    {
      flex: 0.25,
      minWidth: 290,
      field: 'full_name',
      headerName: 'Name',
      renderCell: params => {
        const { row } = params
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(params)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                noWrap
                variant='body2'
                sx={{ color: 'text.primary', fontWeight: 600 }}
                textTransform='capitalize'
              >
                {row.name}
              </Typography>
              <Typography noWrap variant='caption'>
                {row.phoneNumber}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.175,
      minWidth: 120,
      headerName: 'Email',
      field: 'email',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.email}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 110,
      field: 'role',
      headerName: 'Role',
      renderCell: params => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {iconsManager[params.row.role].icon || iconsManager.employee.icon}
          <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{params.row.role}</Typography>
        </Box>
      )
    },
    {
      flex: 0.2,
      minWidth: 140,
      field: 'kudos',
      headerName: 'Kudos',
      renderCell: params => {
        const { row } = params
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {iconsManager.kudos.icon}
            <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{row.kudos}</Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.125,
      minWidth: 140,
      field: 'actions',
      headerName: 'Actions',
      renderCell: params => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='small' color='primary' onClick={() => userEditHandler(params)}>
              {iconsManager.edit.icon}
            </Button>
            <Button size='small' color='error' onClick={() => userRemoveHandler(params)}>
              {iconsManager.trash.icon}
            </Button>
          </Box>
        )
      }
    }
  ]

  return (
    <Card>
      <DataGrid
        autoHeight
        rows={props.data}
        columns={columns}
        pagination={undefined}
        hideFooter
        disableSelectionOnClick
      />
      <EditEmployee
        open={editFormOpen}
        handleClose={handlers.closeEditForm}
        employeeData={editUserFormValues}
        updateTable={props.updateTable}
      />
      <RemoveEmployee
        open={removeUserForm}
        handleClose={handlers.closeRemoveUser}
        updateTable={props.updateTable}
        user={userToBeRemoved}
      />
    </Card>
  )
}

export default TableColumns
