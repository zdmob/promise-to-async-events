var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var PromiseAsync = require("../PromiseAsync");

// var  a = new PromiseAsync( Promise.resolve(1) )

describe('PromiseAsync', function() {


  it('test constructor new PromiseAsync( Promise.resolve(1) )', function() {

    new PromiseAsync( Promise.resolve(1) )
    .subscribe(function(data){
      expect(1).to.be.equal(data);
    })
    .start()

  });

  it('test new PromiseAsync( Promise.reject(1) )', function() {

    new PromiseAsync( Promise.reject(1) )
    .subscribe({
      onError:function(err){
        expect(1).to.be.equal(err);
      }
    })
    .start()

  });


  it('test new PromiseAsync( Promise.resolve(1), Promise.resolve(2) )', function() {

    new PromiseAsync( Promise.resolve(1), Promise.resolve(2) )
    .subscribe(function(a,b){
      expect(1).to.be.equal(a);
      expect(2).to.be.equal(b);
    })
    .start()

  });


  it('test new PromiseAsync( Promise.reject(1), Promise.resolve(2) )', function() {

    new PromiseAsync( Promise.reject(1), Promise.resolve(2) )
    .subscribe({
      onError:function(error){
        expect(1).to.be.equal(error);
      }
    })
    .start()

  });

  it('test new PromiseAsync( Promise.resolve(2), Promise.reject(1) )', function() {

    new PromiseAsync( Promise.resolve(2), Promise.reject(1) )
    .subscribe({
      onError:function(error){
        expect(1).to.be.equal(error);
      }
    })
    .start()

  });


  it('test flat return value', function() {

    new PromiseAsync( Promise.resolve(1), Promise.resolve(2) )
    .flat(function(a,b){
      return a + b;
    })
    .subscribe(function(c){
      expect(3).to.be.equal(c);
    })
    .start()

  });

  it('test flat return promise', function() {

    new PromiseAsync( Promise.resolve(1), Promise.resolve(2) )
    .flat(function(a,b){
      return Promise.resolve(a + b);
    })
    .subscribe(function(c){
      expect(3).to.be.equal(c);
    })
    .start()

  });




  it('test .flat().merge()', function() {

    new PromiseAsync( Promise.resolve(1), Promise.resolve(2) )
    .flat(function(a, b){
      return Promise.resolve( a + b );
    })
    .merge(Promise.resolve(4))
    .subscribe(function(a, b){
      expect(3).to.be.equal(a);
      expect(4).to.be.equal(b);
    })
    .start()

  });

});
