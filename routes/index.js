import userRoutes from './users.js';
import hostRoutes from './hosts.js';
import bookingRoutes from './bookings.js';
import loginRoutes from './login.js';
import propertyRoutes from './properties.js';
import reviewRoutes from './reviews.js';
import listingRoutes from './listings.js';

const constructorMethod = (app) => {
  app.use('/', listingRoutes); // Homepage route
  app.use('/user', userRoutes);
  app.use('/host', hostRoutes);
  app.use('/booking', bookingRoutes);
  app.use('/property', propertyRoutes);
  app.use('/review', reviewRoutes);
  app.use('/search_rentals', listingRoutes);  // Property Listing Page route
  app.use('/login', loginRoutes);
  app.use('/login', loginRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not Found' }); //render('error',  {class: 'Not Found', message: "No matching values"});
  });
};

export default constructorMethod;