import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../store/users'

const AllUsers = () => {
  const dispatch = useDispatch()
  const { users } = useSelector(s => s)

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  const useStyles = makeStyles(theme => ({
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    button: {
      display: 'flex',
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
      justifyContent: 'flex-end'
    }
  }))
  const classes = useStyles()

  return (
    <div id="allUsers">
      <TableContainer component={Paper}>
        <Table aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={8}>
                All Users
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">User Id</TableCell>
              <TableCell align="left">First Name</TableCell>
              <TableCell align="left">Last Name</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">Zip Code</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Account Created</TableCell>
              <TableCell align="left">User is Admin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow id="singleUser" key={user.id}>
                {console.log(user)}
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.zipcode}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {' '}
                  {new Date(user.createdAt).toLocaleDateString('en-US')}
                </TableCell>
                <TableCell>{user.isAdmin.toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default AllUsers
