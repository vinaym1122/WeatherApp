import express from 'express';
import * as weatherService from '../services/weatherService.js';

const router = express.Router();

const getCoordinates = (req) => {
    const latitude = req.body?.latitude ?? req.query?.latitude;
    const longitude = req.body?.longitude ?? req.query?.longitude;
    return { latitude, longitude };
};

router.get("/current", async (req, res) => {
    const { latitude, longitude } = getCoordinates(req);
    const result = await weatherService.getWeather(latitude, longitude);
    res.status(result.code ?? 200).json(result);
});

router.post("/current", async (req, res) => {
    const { latitude, longitude } = getCoordinates(req);
    const result = await weatherService.getWeather(latitude, longitude);
    res.status(result.code ?? 200).json(result);
});

export default router;