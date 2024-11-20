import express from 'express';
import {
  createVolunteer,
  getVolunteers,
  getVolunteerById,
  updateVolunteer,
  deleteVolunteer
} from '../controllers/volunteerController.js';
import { authVolunteer, authAdmin } from '../middlewares/authVerify.js';

const router = express.Router();

router.post('/', createVolunteer);
router.get('/', getVolunteers);
router.get('/:id', getVolunteerById);
router.patch('/:id', authAdmin, updateVolunteer);
router.delete('/:id', authAdmin, deleteVolunteer);

export default router;