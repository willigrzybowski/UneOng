import express from 'express';
import { buscarOngController } from '../controllers/buscarOng.controllers.js';

const router = express.Router();

router.get('/buscar', buscarOngController);

export default router;
