const router = require('express').Router();
const AccidentPoint = require('../models/AccidentPoint');

router.get('/', async (req, res) => {
    try {
        const accidentPoints = await AccidentPoint.find();
        res.send({
            status: 200,
            message: 'Success',
            data: accidentPoints.map(accidentPoint => ({
                id: accidentPoint._id,
                lon: accidentPoint.lon,
                lat: accidentPoint.lat,
                accidentTotal: accidentPoint.accidents.length
            }))
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

router.get('/:accidentPointId', async (req, res) => {
    const { accidentPointId } = req.params;
    try {
        const accidentPoint = await AccidentPoint.findById(accidentPointId).populate('accidents');
        console.log(accidentPoint);
        res.send({
            status: 200,
            message: 'Success',
            data: accidentPoint
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: 500,
            message: error.message,
            body: null
        });   
    }
})

module.exports = router;