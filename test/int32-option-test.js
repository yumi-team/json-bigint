var mocha = require('mocha'),
  assert = require('chai').assert,
  expect = require('chai').expect,
  BigNumber = require('bignumber.js');

describe("Testing 'parseAsBigInt32' option", function () {
  var input = '{ "minOk": -2147483648, "maxOk": 2147483647, "pos": 2147483648, "neg": -2147483649 }';

  it('Should keep int32 values as Number and convert outside range to BigNumber', function (done) {
    var JSONbig = require('../index')({ parseAsBigInt32: true });
    var result = JSONbig.parse(input);
    expect(result.minOk, 'min int32').to.equal(-2147483648);
    expect(result.maxOk, 'max int32').to.equal(2147483647);
    expect(result.pos, 'pos outside int32').to.be.instanceof(BigNumber);
    expect(result.neg, 'neg outside int32').to.be.instanceof(BigNumber);
    done();
  });

  it('Should convert outside range to native BigInt when enabled', function (done) {
    if (typeof BigInt === 'undefined') {
      return done();
    }
    var JSONbig = require('../index')({
      parseAsBigInt32: true,
      useNativeBigInt: true,
    });
    var result = JSONbig.parse(input);
    expect(typeof result.minOk, 'min int32').to.equal('number');
    expect(typeof result.maxOk, 'max int32').to.equal('number');
    expect(typeof result.pos, 'pos outside int32').to.equal('bigint');
    expect(typeof result.neg, 'neg outside int32').to.equal('bigint');
    done();
  });
});
