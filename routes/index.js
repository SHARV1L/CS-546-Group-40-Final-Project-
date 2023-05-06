import guestRoutes from './guest.js';
import hostRoutes from './hosts.js';
import bookingRoutes from './bookings.js';
import propertyRoutes from './properties.js';
import reviewRoutes from './reviews.js';
import listingRoutes from './listings.js';
//import loginRoutes from './loginUser.js';
import userRoutes from './loginUser.js';

const constructorMethod = (app) => {
  app.use('/', userRoutes); // Landing Page route
  app.use('/guest', guestRoutes);
  app.use('/host', hostRoutes);
  app.use('/booking', bookingRoutes);
  app.use('/property', propertyRoutes);
  app.use('/review', reviewRoutes);
  app.use('/search', listingRoutes);  // Property Listing Page route


  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not Found' }); //render('error',  {class: 'Not Found', message: "No matching values"});
  });
};

export default constructorMethod;