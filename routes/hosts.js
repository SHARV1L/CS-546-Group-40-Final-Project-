import { Router } from 'express';

const router = Router();

import { hostsData } from '../data/index.js';
import validation from '../validation.js';
//import {exportedFunctions} from '../data/users.js';

router
  .route('/')
  .get(async (req, res) => {
    try {
      let hostList = await hostsData.getAllHosts();
      res.json(hostList).render('components/guestHomePage', { title: 'Guest Home Page' });
    } catch (e) {
      res.sendStatus(500);
    }
  })
  .post(async (req, res) => {
    let hostInfo = req.body;
    if (!hostInfo || Object.keys(hostInfo).length === 0) {
      return res
        .status(400)
        .json({ error: 'There are no fields in the request body' });
    }

    try {
      hostInfo.firstName = validation.checkString(
        hostInfo.firstName,
        'First Name'
      );
      hostInfo.lastName = validation.checkString(
        hostInfo.lastName,
        'Last Name'
      );
      hostInfo.email = validation.checkValidEmail(hostInfo.email, "email");
      hostInfo.password = validation.checkValidPassword(hostInfo.password, "passwd");
      hostInfo.phoneNumber = validation.checkValidPhone(hostInfo.phoneNumber, "phone");
      hostInfo.accountType = validation.checkString(hostInfo.accountType, "accountType");

    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      const newHost = await hostsData.createHost(
        hostInfo.firstName,
        hostInfo.lastName,
        hostInfo.email,
        hostInfo.password,
        hostInfo.phoneNumber,
        hostInfo.accountType
      );
      res.json(newHost);
    } catch (e) {
      res.status(500).send("Error creating host");

    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    // try {
    //   req.params.id = validation.checkId(req.params.id, 'ID URL Param');
    // } catch (e) {
    //   return res.status(400).json({error: e});
    // }
    try {
      // let host = await hostsData.getHostById(req.params.id);
      //res.json(host).render('components/hostHomepage');
      res.render('components/hostHomepage', { title: 'Host Homepage' })
    } catch (e) {
      res.status(404).json({ error: 'Host not found' });
    }
  })
  .put(async (req, res) => {
    let hostInfo = req.body;
    if (!hostInfo || Object.keys(hostInfo).length === 0) {
      return res
        .status(400)
        .json({ error: 'There are no fields in the request body' });
    }
    try {
      req.params.id = validation.checkId(req.params.id);
      hostInfo.firstName = validation.checkString(
        hostInfo.firstName,
        'First Name'
      );
      hostInfo.lastName = validation.checkString(
        hostInfo.lastName,
        'Last Name'
      );
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      const updatedHost = await hostsData.updateHostByPut(
        req.params.id,
        hostInfo.firstName,
        hostInfo.lastName
      );
      res.json(updatedHost);
    } catch (e) {
      let status = e[0] ? e[0] : 500;
      let message = e[1] ? e[1] : 'Internal Server Error';
      res.status(status).send({ error: message });
    }
  })
  .patch(async (req, res) => {
    let hostInfo = req.body;
    if (!hostInfo || Object.keys(hostInfo).length === 0) {
      return res
        .status(400)
        .json({ error: 'There are no fields in the request body' });
    }
    try {
      req.params.id = validation.checkId(req.params.id);
      if (hostInfo.firstName) {
        hostInfo.firstName = validation.checkString(
          hostInfo.firstName,
          'First Name'
        );
      }

      if (hostInfo.lastName) {
        hostInfo.lastName = validation.checkString(
          hostInfo.lastName,
          'Last Name'
        );
      }
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      const updatedHost = await hostsData.updateHostByPatch(
        req.params.id,
        hostInfo
      );
      res.json(updatedHost);
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
      let deletedHost = await hostsData.removeHostById(req.params.id);
      res.json(deletedHost);
    } catch (e) {
      let status = e[0] ? e[0] : 500;
      let message = e[1] ? e[1] : 'Internal Server Error';
      res.status(status).send({ error: message });
    }
  });

export default router;