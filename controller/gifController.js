const Gif = require('../model/gif')

class Controller {
    static findAll(req, res) {
        Gif
            .find({})
            .then(gifs => {
                res.status(200).json(gifs)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static update(req, res) {
        Gif
            .findByIdAndUpdate(req.params.id, { ...req.body })
            .then(updatedGif => {
                res.status(200).json(updatedGif)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static delete(req, res) {
        Gif
            .findByIdAndDelete(req.params.id)
            .then(deletedGif => {
                res.status(200).json(deletedGif)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

}


module.exports = Controller