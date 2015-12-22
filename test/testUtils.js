'use strict';

require('mocha');
// Ensure we are using the 'as promised' libs before any tests are run:
require('chai').use(require('chai-as-promised'));
var Client = require("node-rest-client").Client;
var client = new Client();

module.exports = {

  getTestBeanstream: function() {
    return require('../lib/beanstream')('300200578', '4BaD82D9197b4cc4b70a221911eE9f70', 'D97D3BE1EE964A6193D17A571D9FBC80', '4e6Ff318bee64EA391609de89aD4CF5d', 'v1');
  },

  getOrderNum: function(prefix) {
    if (!prefix) {
      prefix = "test";
    }
    return prefix+"-"+(Math.random()*10000000);
  },

  tokenizeCard: function(card) {
    return new Promise(function(resolve, reject) {
      var args = {
        data: card,
        headers: {
          "Content-Type": "application/json"
        },
        requestConfig: {
          timeout: 12000,
          keepAlive:false
        },
        responseConfig: {
          timeout: 12000
        }
      };
      
      // send request
      client.post("https://www.beanstream.com/scripts/tokenization/tokens", args, function(data, response) {
        if(Buffer.isBuffer(data)){
          console.log(data.toString('utf8'));
          data = JSON.parse(data.toString('utf8'));
        }
        if (response.statusCode == 200) {
          resolve(data);
        } else {
          reject(data);
        }
        
      });
    });
  },
};