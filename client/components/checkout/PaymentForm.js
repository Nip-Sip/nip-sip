import React, { useState, useEffect, useRef }  from 'react'
import { useDispatch } from 'react-redux'
import { submitPayment } from '../../store/order'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

export default function PaymentForm() {
  const dispatch = useDispatch()

  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
  })
  const paymentRef = useRef(paymentInfo)

  const handleChange = (event) => {
    setPaymentInfo({...paymentInfo, [event.target.id]: event.target.value})
  }

  useEffect(() => {
    paymentRef.current = paymentInfo
  })

  useEffect(() => {
    return () => {
    paymentRef.current.cardNumber = paymentRef.current.cardNumber.toString().split('').map((num, idx) => {
      if (idx < 12) {
        return '#'
      }
      else {
        return num
      }
    }).join('')
    paymentRef.current.cvv = paymentRef.current.cvv.toString().split('').map((num) => '#').join('')
    dispatch(submitPayment({ ...paymentRef.current }))}
  }, [])

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
