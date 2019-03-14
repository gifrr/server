const Gif = require('../model/gif')
const Tag = require('../model/tag')

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

    static generateTags(req, res) {
        autoGenerateTags(req.file.cloudStoragePublicUrl)
        .then(labels => {
            res 
                .status(200)
                .json({
                    labels,
                    image: req.file.cloudStoragePublicUrl
                })
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    msg: `Internal server error`,
                    err: err
                }) 
        })        
    }

    static create(req, res) {
        let data = req.body
        let promises = []
        let readyToPutTag = []
        data.tags = data.tags.map(e => e.text)
        data.tags.forEach(tag => {
            promises.push(
                Tag.findOne({
                    name: tag
                })
            )
        })
        Promise.all(promises)
        .then(tags => {
            readyToPutTag = tags.filter(e => e !== null)
            if (readyToPutTag.length > 0) {
                readyToPutTag.forEach(tg => {
                    let index = data.tags.findIndex(e => e === tg.name)
                    data.tags.splice(index, 1)
                })
            }
            readyToPutTag = readyToPutTag.map(e => e._id)
            let creatingTag = []
            data.tags.forEach(tag => {
                creatingTag.push(
                    Tag.create({
                        name: tag
                    })
                )
            })
            return Promise.all(creatingTag)
        })
        .then(createdTags => {
            let createGif = {
                title: data.title,
                // creator: req.decoded.id,
                tags: createdTags,
                gif: data.gif
            }

            createGif.tags = createGif.tags.map(e => e._id).concat(readyToPutTag)
            Gif.create(createGif)
            .then(newGif => {
                res
                    .status(200)
                    .json({
                        msg: 'Gif has been successfully uploaded',
                        newGif
                    })                
            })
        })
        .catch(err => {
            console.log(err)
            res
                .status(500)
                .json({
                    msg: `internal server error`,
                    err: err
                })
        })
    }
}

module.exports = Controller