import {Router} from 'express';
import propertyMethods from '../data/properties.js';
const router = Router();

// http://localhost:3000/search
router.route('/').get(async (req, res) => {
  //code here for GET
  try {
    res.render('components/search_rental', {title: 'Rental Finder Homepage'});
  } catch (error) {
    res.status(400).json({error: error});
  }
});

// http://localhost:3000/search/list
router.route('/list').post(async (req, res) => {
    try {
      let propertyList  = await propertyMethods.getAllProperty(req.body);
            
      //write code to fetch available properties and pass them as venues
     
     res.render('components/listing', {title: 'Property Listing',propertyList:propertyList,checkin:req.body.checkinDate,checkout:req.body.checkoutDate});
    } catch (error) {
      res.status(400).json({error: error});
    }
  });

// http://localhost:3000/search/property_search_by_id
router.route('/:listingId').get(async (req, res) => {
  try {
    let propertyDetails = await propertyMethods.getPropertyById(req.params.listingId);
    res.render('components/property', {title: 'Your property', propertyDetails:propertyDetails,checkin:req.query.checkin,checkout:req.query.checkout});
    
  } catch (error) {
    res.status(400).json({error: e});
  }
});

// http://localhost:3000/bookings{:id}   //move this to booking
router.route('/bookings').get(async (req, res) => {
  try {
    res.render('components/booking', {title: 'Your property'})
  } catch (error) {
    res.status(400).json({error: e});
  }
});

export default router;