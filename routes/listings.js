import {Router} from 'express';

const router = Router();

// http://localhost:3000/
router.route('/').get(async (req, res) => {
  //code here for GET
  try {
    res.render('components/landingPage', {title: 'Rental Finder Homepage'});
  } catch (error) {
    res.status(400).json({error: e});
  }
});

// http://localhost:3000/search_rentals
router.route('/search').get(async (req, res) => {
    try {
      //write code to fetch available properties and pass them as venues
      res.render('components/listing', {title: 'Property Listing',venues:[{id:"12345",name:"Test Prop",listing_url:"xyz",picture_url:"",address:"Test Address",city:"Amroha",state:"UP",amenities:"Locks on Bedroon, TV , bathTub , AC , Wifi",roomType:"private"}]} );
    } catch (error) {
      res.status(400).json({error: e});
    }
  });

// http://localhost:3000/search_rentals/property_search_by_id
router.route('/:listingId').get(async (req, res) => {
  try {
    console.log("req.params:",req.params.listingId);
    res.render('components/property', {title: 'Your property',venueData:{id:"12345",name:"Test Prop",listing_url:"xyz",picture_url:"",address:"Test Address",city:"Amroha",state:"UP",amenities:"Locks on Bedroon, TV , bathTub , AC , Wifi",roomType:"private"}})
  } catch (error) {
    res.status(400).json({error: e});
  }
});

// http://localhost:3000/bookings{:id}  
router.route('/bookings').get(async (req, res) => {
  try {
    res.render('components/booking', {title: 'Your property'})
  } catch (error) {
    res.status(400).json({error: e});
  }
});

export default router;