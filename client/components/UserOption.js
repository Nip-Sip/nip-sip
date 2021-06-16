import React from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'

const UserOption = () => {
  const { username } = useSelector(state => state.auth)
  return (
    <div>
      <h3>Hooks: Welcome, {username}</h3>
    </div>
  )
}

/**
 * COMPONENT
 */
// export const Home = props => {
//   const { username } = props

//   return (
//     <div>
//       <h3>Welcome, {username}</h3>
//       <Home1 />
//     </div>
//   )
// }

/**
 * CONTAINER
 */
// const mapState = state => {
//   return {
//     username: state.auth.username
//   }
// }

// export default connect(mapState)(Home)

export default UserOption
