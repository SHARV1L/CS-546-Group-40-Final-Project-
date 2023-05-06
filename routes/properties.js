import { Router } from 'express';

const router = Router();

import { usersData } from '../data/index.js';
import validation from '../validation.js';
import { propertyData } from '../data/index.js';

router
  .route('/')
  .get(async (req, res) => {
    try {
      let propertyList = await propertyData.getAllProperty();
      res.json(propertyList);
    } catch (e) {
      res.sendStatus(500);
    }
  })
  .post(async (req, res) => {
    let propertyInfo = req.body;
    if (!propertyInfo || Object.keys(propertyInfo).length === 0) {
      return res
        .status(400)
        .json({ error: 'There are no fields in the request body' });
    }

    // try {
    //   userInfo.firstName = validation.checkString(
    //     userInfo.firstName,
    //     'First Name'
    //   );
    //   userInfo.lastName = validation.checkString(
    //     userInfo.lastName,
    //     'Last Name'
    //   );
    //   userInfo.email=validation.checkValidEmail(userInfo.email,"email");
    //   userInfo.password=validation.checkValidPassword(userInfo.password,"passwd");
    //   userInfo.phoneNumber=validation.checkValidPhone(userInfo.phoneNumber,"phone");
    //   userInfo.accountType=validation.checkString(userInfo.accountType,"accountType");



    // } catch (e) {
    //   return res.status(400).json({error: e});
    // }

    //should write some validation functions here
    try {
      const newProperty = await propertyData.createProperty(
        //propertyInfo.userId,
        propertyInfo.propertyName,
        propertyInfo.description,
        propertyInfo.numberOfRooms,
        propertyInfo.numberofBathrooms,
        propertyInfo.amenities,
        propertyInfo.address,
        propertyInfo.latitude,
        propertyInfo.longitude,
        propertyInfo.pricePerNight,
        propertyInfo.availability
      );
      res.json(newProperty);
    } catch (e) {
      res.status(500).send("Error creating property");

    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      req.params.id = validation.checkId(req.params.id, 'ID URL Param');
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      let property = await propertyData.getPropertyById(req.params.id);
      res.json(property);
    } catch (e) {
      res.status(404).json({ error: 'User not found' });
    }
  })
  .put(async (req, res) => {
    let propertyInfo = req.body;
    if (!propertyInfo || Object.keys(propertyInfo).length === 0) {
      return res
        .status(400)
        .json({ error: 'There are no fields in the request body' });
    }
    try {
      req.params.id = validation.checkId(req.params.id);
      //   userInfo.firstName = validation.checkString(
      //     userInfo.firstName,
      //     'First Name'
      //   );
      //   userInfo.lastName = validation.checkString(
      //     userInfo.lastName,
      //     'Last Name'
      //   );
      //add validation functioins here
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      const updatedProperty = await propertyData.updatePropertyPut(
        //req.params.id,
        propertyInfo.propertyName,
        propertyInfo.description,
        propertyInfo.numberOfRooms,
        propertyInfo.numberofBathrooms,
        propertyInfo.amenities,
        propertyInfo.address,
        propertyInfo.latitude,
        propertyInfo.longitude,
        propertyInfo.pricePerNight,
        propertyInfo.availability
      );
      res.json(updatedUser);
    } catch (e) {
      let status = e[0] ? e[0] : 500;
      let message = e[1] ? e[1] : 'Internal Server Error';
      res.status(status).send({ error: message });
    }
  })
  .patch(async (req, res) => {
    let propertyInfo = req.body;
    if (!propertyInfo || Object.keys(propertyInfo).length === 0) {
      return res
        .status(400)
        .json({ error: 'There are no fields in the request body' });
    }
    try {
      req.params.id = validation.checkId(req.params.id);
      //   if (userInfo.firstName) {
      //     userInfo.firstName = validation.checkString(
      //       userInfo.firstName,
      //       'First Name'
      //     );
      //   }

      //   if (userInfo.lastName) {
      //     userInfo.lastName = validation.checkString(
      //       userInfo.lastName,
      //       'Last Name'
      //     );
      //   }
      // write validation functions here
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      const updatedProperty = await propertyData.updatePropertyPatch(
        req.params.id,
        propertyInfo
      );
      res.json(updatedProperty);
    } catch (e) {
      let status = e[0] ? e[0] : 500;
      let message = e[1] ? e[1] : 'Internal Server Error';
      res.status(status).send({ error: message });
    }
  })
  .delete(async (req, res) => {
    try {
      req.params.id = validation.checkId(req.params.id);
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      let deletedProperty = await propertyData.removePropertyById(req.params.id);
      res.json(deletedProperty);
    } catch (e) {
      let status = e[0] ? e[0] : 500;
      let message = e[1] ? e[1] : 'Internal Server Error';
      res.status(status).send({ error: message });
    }
  });

export default router;