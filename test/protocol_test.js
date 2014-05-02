var assert = require('assert'),
    mocks = require('./mocks'),
    protocol = require('../lib/protocol')

describe('Protocol', function() {
  beforeEach(function () {
    this.server = mocks.server()
    this.user = mocks.user('ma')
  })

  it('handles NICK', function () {
    protocol.NICK(this.server, this.user, { nick: 'test' })
    
    assert.equal(this.user.nick, 'test')
  })
  
  it('handles USER', function () {
    protocol.USER(this.server, this.user, { hostname: 'hostname' })
    
    assert.equal(this.user.connection.sent,
                 ":test.local 001 ma :Welcome\r\n" +
                 ":test.local 002 ma :Your host is hostname, running version ircd-1.0\r\n" +
                 ":test.local 376 ma :End of /MOTD command.\r\n")
  })

  it('handles JOIN', function () {
    this.server.getChannel('#mychannel').join(mocks.user('bob'))

    protocol.JOIN(this.server, this.user, { channel: '#mychannel' })

    assert.equal(this.user.connection.sent,
                 ":ma!~marc@ma.local JOIN #mychannel\r\n" +
                 ":test.local 353 ma @ #mychannel :bob\r\n" +
                 ":test.local 353 ma @ #mychannel :ma\r\n" +
                 ":test.local 366 ma #mychannel :End of /NAMES list.\r\n")
  })
})