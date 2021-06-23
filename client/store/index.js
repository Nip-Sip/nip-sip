import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import auth from './auth'
import { productsReducer, visibilityReducer } from './products'
import cartReducer from './cart'
import adminReducer from './admin'
import usersReducer from './users'
import orderReducer from './order'

const reducer = combineReducers({
  auth,
  products: productsReducer,
  visibleProducts: visibilityReducer,
  cart: cartReducer,
  admin: adminReducer,
  users: usersReducer,
  order: orderReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
