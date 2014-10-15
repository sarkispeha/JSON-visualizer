/**
 * Created by cellis on 10/13/14.
 */

var should = require('chai').should(),
    supertest = require('supertest'),
    api = supertest('http://localhost:3001'),
    http = require('http');

describe('elements api', function(){
    var app = require('../app');
    var testElementId = "";
    var server = {};

    before(function(){
        server = http.createServer(app).listen(3001);


        api.post('/datasets')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({ name: "datasettest1" })
            .expect(function(res) {
                testdatasetid = res.body.id;
                if (!res.body.id) throw "no id found in response: " + res.body.toString();
            });
    });

    it('can insert a new element from a post', function(done) {
        api.post('/datasets/datasettest1/elements')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({ name: "pieceOfArt1" })
        .expect(function(res) {
            testElementId = res.body.id;
            if (!res.body.id) throw "no id found in response: " + res.body.toString();
        })
        .expect(201,done);
    });

    it('can get a list of elements', function(done) {
        api.get('/datasets/datasettest1/elements')
            .expect(200, done)
    });

    it('can get the new element', function(done) {
        api.get('/datasets/datasettest1/elements/'+testElementId)
            .expect(200,done);
    });

    it('can update an element from a put', function(done) {
        api.put('/datasets/datasettest1/elements/'+testElementId)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({ newfield: "update worked" })
            .expect(function(res) {
                testdatasetid = res.body.id;
                if (!res.body.id) throw "no id found in response: " + res.body.toString();
            })
            .expect(200,done);
    });

  //  it('can delete the new element', function(done) {
  //      api.delete('/datasets/datasettest1/elements/'+testElementId)
  //          .expect(200,done);
  //  });


    //TODO: SHOULD RETURN 404!!!!!
    it('errors on delete if element id doenst exist', function(done) {
        api.delete('/datasets/datasettest1/elements/'+"bogus")
            .expect(500,done);
    });

    after(function(){
        server.close();
    })
});


