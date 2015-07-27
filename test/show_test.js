var chai = require('chai');
var expect = require('chai').expect;
var chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

var port = 'localhost:3000';

// describe('/shows', function() {
// 	it('should respond to a get request', function(done) {
// 		chai.request('localhost:3000')
// 		.get('/shows')
// 		.end(function(err,res) {
// 			expect(err).to.be.null;
// 			expect(res).to.have.status(200);
// 			expect(res).to.be.a('object');
// 		})
// 	})
// })



// describe('show/:venue/shows', function() {
// 	it('should respond to a get request', function(done) {
// 		chai.request(port)
// 		.get('/show/55b69043f2ae087702bde66c/shows')
// 		.end(function(err,res) {
// 			expect(err).to.be.null;
// 			expect(res).to.have.status(200);
// 			expect(res).to.be.a('object');
// 			done();
// 		})
// 	})
// })

describe('show/:venue/shows/:show', function() {
	it('should respond to a get request', function(done) {
		chai.request(port)
		.get('/show/55b69043f2ae087702bde66c/shows/test')
		.end(function(err,res) {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			expect(res).to.be.a('object');
			done();
		})
	})
})

// describe('show/shows', function() {
// 	it('should respond to a post request', function(done) {
// 		chai.request('localhost:3000')
// 		.post('/show/shows')
// 		.send({
// 			showTitle: 'test',
// 			  bands: 'test', //will update later
// 			  description: 'test',
// 			  cost: 50,
// 			  age: true,
// 			  social: 'test'
// 		})
// 		.end(function(err,res) {
// 			expect(err).to.be.null;
// 			expect(res).to.have.status(200);
// 			expect(res).to.be.a('object');
// 			done();
// 		})
// 	})
// })

// describe('show/:venue/shows', function() {
// 	it('should respond to a post request', function(done) {
// 		chai.request('localhost:3000')
// 		.post('/show/:venue/shows')
// 		.send({
// 			showTitle: 'test',
// 			venue: '55b69043f2ae087702bde66c',
// 			  bands: 'test', //will update later
// 			  description: 'test',
// 			  cost: 50,
// 			  age: true,
// 			  social: 'test'
// 		})
// 		.end(function(err,res) {
// 			expect(err).to.be.null;
// 			expect(res).to.have.status(200);
// 			expect(res).to.be.a('object');
// 			done();
// 		})
// 	})
// })









