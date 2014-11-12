/**
 * Created by cellis on 10/13/14.
 */

var should = require('chai').should(),
    supertest = require('supertest'),
    api = supertest('http://localhost:3001'),
    http = require('http');

describe('users api', function(){
    var app = require('../app');
    var server = {};

    before(function(){
      server = http.createServer(app).listen(3001);
    });

    it('can get a list of datasets', function(done) {
        api.get('/users')
            .expect(200, done)
    });

    var testdatasetid = "";

    it('can insert a new user from a put', function(done) {
        api.put('/users/himom@dad.com')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({ name: "Jon Doe" })
        .expect(function(res) {
            testdatasetid = res.body.id;
            if (!res.body.id) throw "no id found in response: " + res.body.toString();
        })
        .expect(201,done);
    });


    after(function(){
        server.close();
    })
});


