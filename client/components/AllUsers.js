import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../store/users'

const AllUsers = () => {
  const dispatch = useDispatch()
  const { users } = useSelector(s => s)

  useEffect(() => {
    dispatch(getUsers())
  }, [])
  return (
    <div id="allUsers">
      <table>
        <thead>
          <tr>
            <th>User Id</th>
            <th>User Email</th>
            <th>Account Created on</th>
            <th>User is Admin</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr id="singleUser" key={user.id}>
              {console.log(user)}
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td> {user.createdAt}</td>
              <td>{user.isAdmin.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AllUsers
