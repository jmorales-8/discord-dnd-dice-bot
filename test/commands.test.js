var assert = require('assert');
const { stringify } = require('querystring');
let roll = require('../commands/roll.js')

// All commands run the reply function on the message object that is passed in. 
// This is a dummt message object that just returns the message content of the result of the command being called.
let dummy = {
  reply(str) {
    return str;
  }
}

describe('Commands', function () {
  describe('Roll Command', function () {
    it('No arg test', function () {
      let result = roll.run(null, dummy, [""], null);
      if (!result.startsWith("Error"))
        assert.fail();
    });
    it('Bad arg test', function () {
      let result = roll.run(null, dummy, ["badargs"], null);
      if (!result.startsWith("Error"))
        assert.fail();
    });
  });

});
