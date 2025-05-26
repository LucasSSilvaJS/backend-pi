const mongoose = require('mongoose');

const GeolocalizacaoEvidenciaSchema = new mongoose.Schema({
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
}, { timestamps: true });

const GeolocalizacaoEvidencia = mongoose.model('GeolocalizacaoEvidencia', GeolocalizacaoEvidenciaSchema);

module.exports = GeolocalizacaoEvidencia;
