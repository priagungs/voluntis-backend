const express = require('express');
const router = express.Router();
const Accident = require('../models/Accident');
const AccidentPoint = require('../models/AccidentPoint');

const roundUsing = (func, number, prec) => {
    let tempnumber = number * Math.pow(10, prec);
    tempnumber = func(tempnumber);
    return tempnumber / Math.pow(10, prec);
}

const getDistance = (lon1, lat1, lon2, lat2) => {
    return Math.sqrt(Math.pow(lon1-lon2, 2) + Math.pow(lat1-lat2, 2));
}

const getNearestGridPoint = (p, p1, p2, p3, p4) => {
    dist1 = getDistance(p.lon, p.lat, p1.lon, p1.lat);
    dist2 = getDistance(p.lon, p.lat, p2.lon, p2.lat);
    dist3 = getDistance(p.lon, p.lat, p3.lon, p3.lat);
    dist4 = getDistance(p.lon, p.lat, p4.lon, p4.lat);
    if (dist1 === Math.min(dist1, dist2, dist3, dist4)) {
        return p1;
    } else if (dist2 === Math.min(dist1, dist2, dist3, dist4)) {
        return p2;
    } else if (dist3 === Math.min(dist1, dist2, dist3, dist4)) {
        return p3;
    } else {
        return p4;
    }
}

const getGridPoint = (lon, lat) => {
    const lon1 = roundUsing(Math.floor, lon, 3);
    const lon2 = roundUsing(Math.ceil, lon, 3);
    const lat1 = roundUsing(Math.floor, lat, 3);
    const lat2 = roundUsing(Math.ceil, lon, 3);
    const p = { lon, lat }
    const p1 = { lon: lon1, lat: lat1 };
    const p2 = { lon: lon1, lat: lat2 };
    const p3 = { lon: lon2, lat: lat1 };
    const p4 = { lon: lon2, lat: lat2 };
    return getNearestGridPoint(p, p1, p2, p3, p4);
}

router.post('/', async (req, res) => {
    try {
        const { lon, lat, description, picture } = req.body;
        const accident = await Accident.create({
            lon, lat, description, picture, user: req.userId
        });
        const gridPoint = getGridPoint(lon, lat);
        let accidentPoint = await AccidentPoint.findOne({
            lon: gridPoint.lon,
            lat: gridPoint.lat
        });
        if (accidentPoint) {
            accidentPoint.accidents.push(accident._id);
            await accidentPoint.save();
        } else {
            accidentPoint = await AccidentPoint.create({
                accidents: [accident._id],
                lon: gridPoint.lon,
                lat: gridPoint.lat
            });
        }
        res.send({
            status: 200,
            message: 'Success',
            data: {
                accident,
                accidentPoint,
            }
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: 500,
            message: error.message,
            body: null
        });
    }
});

module.exports = router;