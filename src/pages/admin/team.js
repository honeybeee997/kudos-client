import { useState } from 'react'
import { Grid, Box } from '@mui/material'
import ApexChartWrapper from './../../@core/styles/libs/react-apexcharts/index'
import AddNewEmployee from '../../views/forms/Employee/Index'
import { server, token } from './../../../serverConfig'
import TableColumns from 'src/views/tables/TableColumns'
import { Typography } from '@mui/material'
import LoadingSpinner from 'src/views/utils/LoadingSpinner'
import { useHttp } from 'src/hooks/useHttp'

const Index = ({ data }) => {
  const teamData = data.members || []
  const [team, setTeam] = useState(teamData)
  const { isLoading, sendRequest } = useHttp()

  const updateTable = async () => {
    const body = null
    const headers = { Authorization: `Bearer ${token}` }
    const response = await sendRequest(`${server}/admin/all-members`, 'GET', body, headers)
    response.status === 'success' ? setTeam(response.members) : setTeam([])
  }

  const dataComponent = (
    <ApexChartWrapper>
      <Grid container spacing={6} className='match-height'>
        <Grid item xs={12} md={12}>
          <TableColumns data={team} updateTable={updateTable} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )

  const noDataComponent = (
    <Typography variant='h4' mt='2rem'>
      No member yet. Add one ?? 😪
    </Typography>
  )

  const pageComponent = team.length ? dataComponent : noDataComponent

  const loadingComponent = (
    <Box width='100%' display='flex' padding='2rem 0' alignItems='center' justifyContent='center'>
      <LoadingSpinner size='40px' />
    </Box>
  )

  return (
    <>
      {isLoading ? loadingComponent : pageComponent}
      <AddNewEmployee headingText='Add new member' updateTable={updateTable} />
    </>
  )
}
export default Index

// Snippet for SSR (fetching data before the page is rendered)
export async function getServerSideProps() {
  let data
  try {
    const response = await fetch(`${server}/admin/all-members`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const responseData = await response.json()
    data = responseData
  } catch (err) {
    data = 'Something went wrong'
  }
  return {
    props: {
      data
    }
  }
}
