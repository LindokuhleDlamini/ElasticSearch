module.exports = (app) => {
    const elasticSearch = require('../controllers/elastic-search.controller.js')

    app.get('/elastic/ping', elasticSearch.ping);

    app.post('/elastic/index/init/:indexName', elasticSearch.initIndex)

    app.post('/elastic/index/check', elasticSearch.indexExist)

    app.post('/elastic/index/mapping', elasticSearch.initMapping)

    app.post('/elastic/add', elasticSearch.addDocument)

    app.put('/elastic/update/:indexId', elasticSearch.updateDocument)

    app.post('/alastic/search', elasticSearch.search)

    app.delete('/elastic/delete_document/:indexId', elasticSearch.delete)

    app.delete('/elastic/delete_all', elasticSearch.deleteAll)
}