const Gif = require('../model/gif')

class Controller {


    static create(req, res) {

        Gif.create(req.body)
            .then(function (data) {
                res.status(200).json(data)

            })
            .catch(function (err) {
                res.status(500).json({
                    messege: 'not fond'
                })

            })
    }

    static all(req, res) {
        let condition = {}
        if (req.query.search) {
            condition = {
                title: req.query.search
            }
        }

        Gif.find(condition)
            .then(function (data) {
                // console.log(data);
                var arr = []
                for (var i = 0; i < data.length; i++) {
                    arr.push(data[i].title)
                }
                // console.log(arr);
                res.status(200).json(data)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })

    }
    static remove(req, res) {
        Gif.findByIdAndDelete(req.params.id)
            .then(function (data) {
                res.status(200).json(data)

            })
            .catch(function (err) {
                res.status(500).json({
                    messege: 'not fond'
                })

            })
    }
    static edit(req, res) {

        Gif.findByIdAndUpdate(req.params.id, req.body)
            .then(function (data) {
                res.status(200).json(data)
            })
            .catch(function (err) {
                res.status(500).json({
                    messege: 'not fond'
                })

            })
    }

}


module.exports = Controller