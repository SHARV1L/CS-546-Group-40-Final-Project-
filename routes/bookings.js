import { Router } from 'express';
import { bookingsData } from '../data/index.js';
import validation from '../validation.js';
//import {exportedFunctions} from '../data/users.js';

const router = Router();
router
    .route('/')
    .get(async (req, res) => {
        try {
            let bookingList = await bookingsData.getAll();
            res.json(bookingList);
        } catch (e) {
            res.sendStatus(500);
        }
    })
    .post(async (req, res) => {
        let bookingInfo = req.body;
        if (!bookingInfo || Object.keys(bookingInfo).length === 0) {
            return res
                .status(400)
                .json({ error: 'There are no fields in the request body' });
        }

        // validation functions here
        try {
            const newBooking = await bookingsData.create(
                bookingInfo.userId,
                //property_id,
                bookingInfo.checkInDate,
                bookingInfo.checkOutDate,
                bookingInfo.totalPrice
            );
            res.json(newBooking);
        } catch (e) {
            res.status(500).send("Error creating user");
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
            let booking = await bookingsData.get(req.params.id);
            res.json(booking);
        } catch (e) {
            res.status(404).json({ error: 'Booking not found' });
        }
    })
    .put(async (req, res) => {
        let bookingInfo = req.body;
        if (!bookingInfo || Object.keys(bookingInfo).length === 0) {
            return res
                .status(400)
                .json({ error: 'There are no fields in the request body' });
        }

        // write validation functions here

        try {
            const updatedBooking = await bookingsData.updatePut(
                req.params.id,
                bookingInfo.checkInDate,
                bookingInfo.checkOutDate,
                bookingInfo.totalPrice
            );
            res.json(updatedBooking);
        } catch (e) {
            let status = e[0] ? e[0] : 500;
            let message = e[1] ? e[1] : 'Internal Server Error';
            res.status(status).send({ error: message });
        }
    })
    .patch(async (req, res) => {
        let bookingInfo = req.body;
        if (!bookingInfo || Object.keys(bookingInfo).length === 0) {
            return res
                .status(400)
                .json({ error: 'There are no fields in the request body' });
        }

        //write validation functions here

        try {
            const updatedBooking = await bookingsData.updatePatch(
                req.params.id,
                userInfo
            );
            res.json(updatedBooking);
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
            let deletedBooking = await bookingsData.remove(req.params.id);
            res.json(deletedBooking);
        } catch (e) {
            let status = e[0] ? e[0] : 500;
            let message = e[1] ? e[1] : 'Internal Server Error';
            res.status(status).send({ error: message });
        }
    });


export default router;
