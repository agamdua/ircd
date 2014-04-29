var assert = require('assert'),
    mocks = require('./mocks')

describe('User', function() {
  beforeEach(function () {
    this.user = mocks.user('ma')
  })

  it('sends reply', function () {
    this.user.sendReply("001", ":Welcome")
    assert.deepEqual(this.user.connection.sent, [":test.local 001 ma :Welcome\r\n"])
  })
})