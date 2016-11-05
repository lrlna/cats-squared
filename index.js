#! /usr/bin/env node

const bignum = require('bignum')
const prompt = require('prompt')
const chalk = require('chalk')
const yargs = require('yargs')
  .command({
    command: 'get-cats',
    desc: 'find out the number of kitty-cats u gonna have',
    handler: getCats()
  })
  .demand(1)
  .help()
  .argv


function getCats (yargs) {
  prompt.start()

  prompt.get(getPromptSchema(), function(err, result) {
    // get the rate of cat increase; v important
    var rate = result.current/result.initial
    // get number of weeks left in your lifetime :(; ssshhhh don't be sad
    var time = (100-result.age)*52
    var populationGrowth = calculatePopulationGrowth(result.initial, rate, time)

    console.log(`\nWowza, you'll have \n${chalk.red(populationGrowth)} \ncats at the age of ${99}`)
  })
}

function calculatePopulationGrowth (initial, rate, time) {
  // use bignum to deal with infinity(and beyond)
  return bignum(initial).mul(bignum.pow(Math.E, bignum(rate * time))).toString()
}

function getPromptSchema() {
  return schema = {
    properties: {
      initial: {
        description: 'intial number of cats',
      },
      current: {
        description: 'current number of cats'
      },
      age: {
        description: 'your age'
      }
    }
  }
}
