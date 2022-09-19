const Stripe = require('stripe')(process.env.API_SECRET)
const customError = require('../errors')
const {StatusCodes} = require('http-status-codes')


const payment = async(req,res)=>{
    const {purchase, total_amount, shipping_fee} = req.body

    const generateSum = ()=>{
        return total_amount + shipping_fee
    }

    const paymentIntent = await Stripe.paymentIntents.create({
        amount:generateSum(),
        currency:'usd'
    })

    res.status(StatusCodes.CREATED).json({clientSecret:paymentIntent.client_secret})
}












module.exports = payment