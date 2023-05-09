import {Router} from 'express';
import Stripe from 'stripe';
import  bookingsData from '../data/bookings.js';
const stripe = new Stripe('sk_test_51N5qcDEuIcBHXzpWzgCrIGtEYRUV1MaR0sSZlVRU3A9uATCWFjnvmFvFL8SBBsM3xDWkZ2rOXoImLNcmDxhytGcu00pkX42pQ0');
const router = Router();

// app.use(express.static('public'));

 const YOUR_DOMAIN = 'http://localhost:3000';

router.route('/').get(async (req,res)=>{
    res.render('components/checkout',{title:"CheckOut Page",totalPrice:req.query.totalPrice,bookingId:req.query.bookingId,pName:req.query.pName,pImage:req.query.pImage});
})
router.post('/create-checkout-session', async (req, res) => {

const product = await stripe.products.create({
    name: `Booking${req.body.bookingId}`,
    description: 'Booking Property',
    images: ['https://example.com/t-shirt.png'],
  });
  
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: Number(req.body.price)*100,
    currency: 'usd'
  });
  
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: price.id,
        quantity: 1
        
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/payment/success?id=${req.body.bookingId}`,
    cancel_url: `${YOUR_DOMAIN}/payment/cancel?id=${req.body.bookingId}`,
    customer_email: req.session.user.email
  });

  res.redirect(303, session.url);
});

router
.route('/success')
.get(async (req,res) => {
    let bookingConfirmation  = await bookingsData.confirmBooking(req.query.id);
    res.render('components/paymentSuccess',{title:"Payment Success Page",bookingDetails:bookingConfirmation});
});

router
.route('/cancel')
.get(async (req,res) => {
    let deleteBooking = await bookingsData.removeBookingById(req.query.id);
    res.render('components/paymentCancel',{title:"Payment Cancel Page"});
})

export default router;