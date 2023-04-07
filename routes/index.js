import userRoutes from './users.js';
import hostRoutes from './hosts.js';
import bookingRoutes from './bookings.js';
import propertyRoutes from './property.js';
import reviewRoutes from './reviews.js';
import listingRoutes from './listings.js';

const constructorMethod = (app) => {
  app.use('/user', userRoutes);
  app.use('/host', hostRoutes);
  app.use('/booking', bookingRoutes);
  app.use('/property', propertyRoutes);
  app.use('/review', reviewRoutes);
  app.use('/search_rentals', listingRoutes);


  app.use('*', (req, res) => {
    res.status(404).json({error: 'Not found'}).render('error');
  });
};

export default constructorMethod;