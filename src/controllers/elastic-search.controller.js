const elasticsearch = require('elasticsearch');
const elasticClient = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

exports.ping = (req, res) => {
    elasticClient.ping({
        requestTimeout: 30000,
    }).catch(error => {
        if(error) {
            return res.status(500).send({
                message: error.message || "ElasticSearch cluster is down"
            })
        }
        return res.status(200).send({
            message: "ElasticSearch cluster is up"
        })
    })
};

exports.initIndex = (req, res) => {
    elasticClient.indices.create({
        index: req.body.indexName? req.body.indexName: ""
    }).then(response => {
        if(response) {
            return res.status(200).send({
                message: "Index created"
            })
        }
        return res.status(400).send({
            message: "error index not created"
        })
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Internal error"
        })
    })
};

exports.indexExist = (req, res) => {
    elasticClient.indices.exists({
        index: req.body.indexName
    }).then(response => {
        if(response) {
            return res.status(200).send({
                message: "Index created",
                index: response,
            })
        }

        return res.status(400).send({
            message: "error index does not exist"
        })
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Internal error"
        })
    })
};

exports.initMapping = (req, res) => {
    elasticClient.indices.putMapping({
        index: req.body.indexName,
        type: req.body.docType,
        body: req.body.payload,
    }).then(response => {
        if (response) {
            return res.status(200).send({
                message: "Index Mapped succesfully",
                index: response,
            })
        }

        return res.status(400).send({
            message: "error index does not exist"
        })
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Internal error"
        })
    })
};

exports.addDocument = (req, res) => {
    elasticClient.index({
        index: req.body.indexName,
        type: req.body.docType,
        id: req.body.indexId,
        body: req.body.payload,
    }).then(response => {
        if(response) {
            return res.status(200).send({
                message: "Index document added",
                index: response,
            })
        }

        return res.status(400).send({
            message: "error index document could not be added"
        })
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Internal error"
        })
    })
};

exports.updateDocument = (req, res) => {
    elasticClient.update({
        id: req.body.indexId,
        index: req.body.indexName,
        type: req.body.docType,
        body: req.body.payload,
    }, (error, response) => {
        if(response) {
            return res.status(200).send({
                message: "Index document Updated succesfully",
                index: response,
            })
        } else if (error) {
            return res.status(400).send({
                message: error.message || "error index document could not be updated"
            })
        }

        return res.status(500).send({
            message: "Internal error"
        })
    })
};

exports.search = (req, res) => {
    elasticClient.search({
        index: req.body.indexName,
        type: req.body.docType,
        body: req.body.payload,
    }).then(response => {
        if(response) {
            return res.status(200).send({
                message: "Index document found",
                index: response,
            })
        }

        return res.status(400).send({
            message: "error index document could not be updated"
        })
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Internal error"
        })
    })
};

exports.delete = (req, res) => {
    elasticClient.indices.delete({
        id: req.params.indexId,
    }).catch(err => {
        if (err) {
            return res.status(400).send({
                message: err.message || "error index document does not exist"
            })
        }
        return res.status(500).send({
            message: "Internal error"
        })
    })
};

exports.deleteAll = (req, res) => {
    elasticClient.delete({
        index: '_all'
    }).catch(err => {
        if (err) {
            return res.status(400).send({
                message: err.message || "error index document does not exist"
            })
        }
        return res.status(500).send({
            message: "Internal error"
        })
    })
};