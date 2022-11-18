// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

const roleObj = {
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
  }
}

const renderUserAvatar = row => {
  return <CustomAvatar src={row.avatarSrc || '/images/avatars/1.png'} sx={{ mr: 3, width: 34, height: 34 }} />
}

const columns = [
  {
    flex: 0.25,
    field: 'name',
    minWidth: 200,
    headerName: 'User',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderUserAvatar(row)}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
              {row.name}
            </Typography>
            <Typography variant='caption' sx={{ lineHeight: 1.6667 }}>
              {row.username}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.3,
    minWidth: 250,
    field: 'email',
    headerName: 'Email',
    renderCell: ({ row }) => <Typography variant='body2'>{row.email}</Typography>
  },
  {
    flex: 0.2,
    minWidth: 130,
    field: 'role',
    headerName: 'Role',
    renderCell: ({ row }) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {roleObj[row.role].icon}
        <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{row.role}</Typography>
      </Box>
    )
  },
  {
    flex: 0.25,
    minWidth: 130,
    field: 'kudos',
    headerName: 'Kudos',
    renderCell: ({ row }) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box component='span' sx={{ display: 'flex', mr: 2, color: 'success.main' }}>
          <Icon icon='mdi:chart-donut' />
        </Box>
        <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{row.kudos}</Typography>
      </Box>
    )
  }
]

const CrmTable = props => {
  return (
    <Card>
      <DataGrid
        autoHeight
        hideFooter
        rows={props.data}
        columns={columns}
        disableSelectionOnClick
        pagination={undefined}
      />
    </Card>
  )
}

export default CrmTable
