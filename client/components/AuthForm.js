import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authenticate } from '../store'
import '../../public/style.css'
import img from '../../public/woman-bar.jpg'
// Relative path to image file from js file

// Material UI below vvvvvvvvvvvvv

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Nip-Sip
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage:
      'url(https://i.enkirelations.com/UlZ1TkGckIHNowZ09dq2aBBtTas=/400x0//images/2016/09/c4ba99e29cdb025a44a50d0cbd1525a1.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

// Material UI above ^^^^^^^^^^^^

function isEmail(email) {
  const regexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regexp.test(email)
}

const AuthForm = ({ login }) => {
  const dispatch = useDispatch()
  const { error } = useSelector(state => state.auth)
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')

  // Material UI below vvvvvvvvvvvvv
  const classes = useStyles()
  // Material UI above ^^^^^^^^^^^^

  const handleSubmit = e => {
    e.preventDefault()
    const formName = e.target.name
    const email = e.target.email.value
    const password = e.target.password.value
    if (email.length < 3 || password.length < 3) {
      alert('Email and or password must not be less than 3')
      return
    }
    if (!isEmail(email)) {
      alert('Invalid email!')
      return
    }
    dispatch(authenticate(email, password, formName))
  }

  return (
    <React.Fragment>
      {/* // Material UI below vvvvvvvvvvvvv */}
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form
              className="auth-form"
              onSubmit={handleSubmit}
              name={login ? 'login' : 'signup'}
              className="opacity"
              id="authform"
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="email"
                onChange={e => setEmail(e.target.value)}
                name="email"
                className={
                  email.length >= 3 ? 'inputCorrect' : 'inputIncorrect'
                }
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="password"
                type="password"
                id="password"
                onChange={e => setPw(e.target.value)}
                className={pw.length >= 3 ? 'inputCorrect' : 'inputIncorrect'}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                {login ? 'Login' : 'Sign Up'}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
      {/* // Material UI above ^^^^^^^^^^^^ */}
      {/* <div className="authForm enableBlur">
        <div className="bar-lady"></div>
        <form
          className="auth-form"
          onSubmit={handleSubmit}
          name={login ? 'login' : 'signup'}
          className="opacity"
          id="authform"
        >
          <h1>{login ? 'Login' : 'Signup'}</h1>
          <p className="s-e">An adventure of your life time awaits...</p>
          <div id="subauth">
            <div>
              <label htmlFor="email">Email</label>
              <input
                onChange={e => setEmail(e.target.value)}
                name="email"
                type="text"
                className={
                  email.length >= 3 ? 'inputCorrect' : 'inputIncorrect'
                }
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                onChange={e => setPw(e.target.value)}
                name="password"
                type="password"
                className={pw.length >= 3 ? 'inputCorrect' : 'inputIncorrect'}
              />
            </div>
            <button type="submit">{login ? 'Login' : 'Sign Up'}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div> */}
    </React.Fragment>
  )
}

export const Login = () => <AuthForm login />
export const Signup = () => <AuthForm />

// Material UI below vvvvvvvvvvvvv
// Material UI above ^^^^^^^^^^^^
