/**
 * Created by cellis on 10/13/14.
 */

var should = require('chai').should(),
    supertest = require('supertest'),
    api = supertest('http://localhost:3001'),
    http = require('http');

describe('datasets api', function(){
    var app = require('../app');
    var server = {};

    before(function(){
      server = http.createServer(app).listen(3001);
    });

    it('can get a list of datasets', function(done) {
        api.get('/datasets')
            .expect(200, done)
    });

    var testdatasetid = "";

    it('can insert a new dataset from a post', function(done) {
        api.post('/datasets')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({ name: "datasettest1" })
        .expect(function(res) {
            testdatasetid = res.body.id;
            if (!res.body.id) throw "no id found in response: " + res.body.toString();
        })
        .expect(201,done);
    });

    it('can get the new dataset', function(done) {
        api.get('/datasets/'+testdatasetid)
            .expect(200,done);
    });

    it('can update a dataset from a put', function(done) {
        api.put('/datasets/'+testdatasetid)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({ newfield: "update worked" })
            .expect(function(res) {
                testdatasetid = res.body.id;
                if (!res.body.id) throw "no id found in response: " + res.body.toString();
            })
            .expect(200,done);
    });

    it('can delete the new dataset', function(done) {
        api.delete('/datasets/'+testdatasetid)
            .expect(200,done);
    });

    it('errors on delete if id doenst exist', function(done) {
        api.delete('/datasets/'+"12345")
            .expect(500,done);
    });

    after(function(){
        server.close();
    })
});


