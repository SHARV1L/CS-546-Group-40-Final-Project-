import { Router } from 'express';

const router = Router();

// http://localhost:3000/
router.route('/').get(async (req, res) => {
  //code here for GET
  try {
    res.render('components/landingPage', { title: 'Rental Finder Homepage' });
  } catch (error) {
    res.status(400).json({ error: e });
  }
});

// http://localhost:3000/search_rentals
router.route('/search_rentals').get(async (req, res) => {
  try {
    res.render('components/listing', { title: 'Property Listing' },);
  } catch (error) {
    res.status(400).json({ error: e });
  }
});

// http://localhost:3000/search_rentals/property_search_by_id
router.route('./search_rentals/:propertyId').get(async (req, res) => {
  try {
    res.render('components/property', { title: 'Your property' })
  } catch (error) {
    res.status(400).json({ error: e });
  }
});

// http://localhost:3000/bookings{:id}  
router.route('/bookings').get(async (req, res) => {
  try {
    res.render('components/booking', { title: 'Your property' })
  } catch (error) {
    res.status(400).json({ error: e });
  }
});

// http://localhost:3000/search_rentals/property_search_by_id
router.route('./search_rentals/:propertyId').get(async (req, res) => {
  try {
    res.render('components/property', { title: 'Your property' })
  } catch (error) {
    res.status(400).json({ error: e });
  }
});

// http://localhost:3000/bookings{:id}  
router.route('/bookings').get(async (req, res) => {
  try {
    res.render('components/booking', { title: 'Your property' })
  } catch (error) {
    res.status(400).json({ error: e });
  }
});

export default router;