var assert = require('assert');
const { stringify } = require('querystring');
let help = require('../commands/help.js');
let reload = require('../commands/reload.js');
let roll = require('../commands/roll.js');

const { Collection } = require("discord.js");

// All commands run the reply function on the message object that is passed in. 
// This is a dummy message object that just returns the message content of the result of the command being called.

let dummyClient = {}
const commands = new Collection();
const aliases = new Collection();
const slashcmds = new Collection();

// To reduce client pollution we'll create a single container property
// that we can attach everything we need to.
dummyClient.container = {
  commands,
  aliases,
  slashcmds
};

let dummyMessage = {
  reply(str) {
    return str;
  }
}

describe('Command tests', function () {

  describe('Help command tests', function () {

    describe('Bad arg tests', function () {

    });

    describe('Good arg tests', function () {

    });

  });

  describe('Reload command tests', function () {

    describe('Bad arg tests', function () {

      it('Null arg test', function () {
        dummyClient.container.commands = [];
        const result = roll.run(dummyClient, dummyMessage, null, null);
        if (!result.startsWith("Error"))
          assert.fail();
      });

      it('Empty arg test', function () {
        const result = roll.run(dummyClient, dummyMessage, [""], null);
        if (!result.startsWith("Error"))
          assert.fail();
      });

      it('Bad arg test', function () {
        const result = roll.run(null, dummyMessage, ["badarg"], null);
        if (!result.startsWith("Error"))
          assert.fail();
      });

    });

    describe('Good arg tests', function () {



    });

  });

  describe('Roll Command tests', function () {

    // Tests to see if the command will reject bad arguments
    describe('Bad arg tests', function () {

      // Checks to see if the command will fail if there is are no arguments passed.
      it('Null arg test', function () {
        const result = roll.run(null, dummyMessage, null, null);
        if (!result.startsWith("Error"))
          assert.fail();
      });

      // Checks to see if the command will fail if there is empty arguments passed.
      it('Empty arg test', function () {
        const result = roll.run(null, dummyMessage, [""], null);
        if (!result.startsWith("Error"))
          assert.fail();
      });

      // Checks to see if the command will fail if there is a nonsense arg passed.
      it('Bad arg test', function () {
        const result = roll.run(null, dummyMessage, ["badargs"], null);
        if (!result.startsWith("Error"))
          assert.fail();
      });

      // Checks to see if the 'keep count' fail occurs.
      it('Keep count test', function () {
        const result = roll.run(null, dummyMessage, ["1d8k2"], null);
        if (!result.startsWith("Error"))
          assert.fail();
      });

    });

    describe('Good arg tests', function () {

      it('Simple roll test', function () {
        const result = roll.run(null, dummyMessage, ["1d8"], null);
        if (!result.startsWith("Rolling"))
          assert.fail();
      });

      it('Simple roll test (excluding leading number)', function () {
        const result = roll.run(null, dummyMessage, ["d8"], null);
        if (!result.startsWith("Rolling"))
          assert.fail();
      });

      it('Addition roll test', function () {
        const result = roll.run(null, dummyMessage, ["1d8+4"], null);
        if (!result.startsWith("Rolling"))
          assert.fail();
      });

      it('Keep roll test', function () {
        const result = roll.run(null, dummyMessage, ["2d8k1"], null);
        if (!result.startsWith("Rolling"))
          assert.fail();
      });

      it('Keep lower roll test', function () {
        const result = roll.run(null, dummyMessage, ["2d8kl1"], null);
        if (!result.startsWith("Rolling"))
          assert.fail();
      });

      it('Multiply roll test', function () {
        const result = roll.run(null, dummyMessage, ["1d8x4"], null);
        if (!result.startsWith("Rolling"))
          assert.fail();
      });

      it('Sort roll test', function () {
        const result = roll.run(null, dummyMessage, ["2d8s"], null);
        if (!result.startsWith("Rolling"))
          assert.fail();
      });

      it('Sort asc roll test', function () {
        const result = roll.run(null, dummyMessage, ["2d8sa"], null);
        if (!result.startsWith("Rolling"))
          assert.fail();
      });

      it('Complex roll tests', function () {
        let args = ["2d8x6sa", "6d8kl4x6sa", "d8+4x5", "3d4+5kl2x3sa"]
        for (let i = 0; i < args.length; i++) {
          let result = roll.run(null, dummyMessage, [args[i]], null);
          if (!result.startsWith("Rolling"))
            assert.fail();
        }
      });

    });

  });

});
