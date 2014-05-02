var assert = require('assert'),
    mocks = require('./mocks')
    // protocol = require('../lib/protocol')

xdescribe('Protocol', function() {
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
})