const mongoose = require('mongoose');
const GeolocalizacaoEvidencia = mongoose.model('GeolocalizacaoEvidencia');

exports.getAllGeolocalizacoesEvidencia = async (req, res) => {
    try {
        const geolocalizacoesEvidencia = await GeolocalizacaoEvidencia.find().sort({ createdAt: -1 });
        res.status(200).json(geolocalizacoesEvidencia);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar geolocalizações de evidências" });
    }
};

exports.getGeolocalizacaoEvidenciaById = async (req, res) => {
    const { id } = req.params;
    try {
        const geolocalizacaoEvidencia = await GeolocalizacaoEvidencia.findById(id);
        if (!geolocalizacaoEvidencia) {
            return res.status(404).json({ error: "Geolocalização de evidência não encontrada" });
        }

        res.status(200).json(geolocalizacaoEvidencia);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar geolocalização de evidência" });
    }
};

exports.createGeolocalizacaoEvidencia = async (req, res) => {
    const { latitude, longitude } = req.body;

    try {
        const newGeolocalizacaoEvidencia = new GeolocalizacaoEvidencia({
            latitude,
            longitude
        });

        const savedGeolocalizacaoEvidencia = await newGeolocalizacaoEvidencia.save();

        res.status(201).json({ message: "Geolocalização de evidência criada com sucesso!", geolocalizacaoEvidencia: savedGeolocalizacaoEvidencia });
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar geolocalização de evidência" });
    }
};

exports.updateGeolocalizacaoEvidencia = async (req, res) => {
    const { id } = req.params;
    const { latitude, longitude } = req.body;

    try {
        const updatedGeolocalizacaoEvidencia = await GeolocalizacaoEvidencia.findByIdAndUpdate(id, {
            latitude,
            longitude
        }, { new: true });

        if (!updatedGeolocalizacaoEvidencia) {
            return res.status(404).json({ error: "Geolocalização de evidência não encontrada" });
        }

        res.status(200).json({ message: "Geolocalização de evidência atualizada com sucesso!", geolocalizacaoEvidencia: updatedGeolocalizacaoEvidencia });
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar geolocalização de evidência" });
    }
};

exports.deleteGeolocalizacaoEvidencia = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedGeolocalizacaoEvidencia = await GeolocalizacaoEvidencia.findByIdAndDelete(id);
        if (!deletedGeolocalizacaoEvidencia) {
            return res.status(404).json({ error: "Geolocalização de evidência não encontrada" });
        }

        res.status(200).json({ message: "Geolocalização de evidência deletada com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar geolocalização de evidência" });
    }
};
