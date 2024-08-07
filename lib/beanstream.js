
'use strict';

Beanstream.DEFAULT_HOST = "https://api.na.bambora.com/";
Beanstream.DEFAULT_VERSION = "v1";

// use default timeout supplied by Node
Beanstream.DEFAULT_TIMEOUT = require('http').createServer().timeout;

var apis = {
  Payments: require('./api/payments'),
  Profiles: require('./api/profiles'),
  Reports: require('./api/reports')
};
Beanstream.apis = apis;

function Beanstream(merchantId, paymentsApiKey, profilesApiKey, reportsApiKey, version) {

  if (!(this instanceof Beanstream)) {
    return new Beanstream(merchantId, paymentsApiKey, profilesApiKey, reportsApiKey, version);
  }

  this._config = {
    host: Beanstream.DEFAULT_HOST,
    apiVersion: Beanstream.DEFAULT_VERSION,
    timeout: Beanstream.DEFAULT_TIMEOUT,
  };

  this._prepApis();
  this.setMerchantId(merchantId);
  this.setPaymentsApiKey(paymentsApiKey);
  this.setProfilesApiKey(profilesApiKey);
  this.setReportsApiKey(reportsApiKey);
  this.setApiVersion(version);
}

Beanstream.prototype = {
  
  _prepApis: function() {
    for (var name in apis) {
      this[
        name[0].toLowerCase() + name.substring(1)
      ] = new apis[name](this);
    }
  },

  _setConfigField: function(key, value) {
    this._config[key] = value;
  },

  getConfigField: function(key) {
    return this._config[key];
  },

  setHost: function(url) {
    this._setConfigField("host", url);
  },

  setApiVersion: function(version) {
    if (version) {
      this._setConfigField("apiVersion", version);
    } else {
      this._setConfigField("apiVersion", Beanstream.DEFAULT_VERSION);
    }
  },

  setMerchantId: function(merchantId) {
    this._setConfigField("merchantId", merchantId);
  },

  setPaymentsApiKey: function(key) {
    this._setConfigField("paymentsApiKey", key);
  },

  setReportsApiKey: function(key) {
    this._setConfigField("reportsApiKey", key);
  },

  setProfilesApiKey: function(key) {
    this._setConfigField("profilesApiKey", key);
  },

  setTimeout: function(timeout) {
    this._setConfigField("timeout", timeout);
  },

  getRequestUrl: function(timeout) {
    return this.getConfigField("host")+this.getConfigField("apiVersion")+"/";
  },

  setSubMerchantId: function(merchantId) {
    this._setConfigField("subMerchantId", merchantId);
  },

};

module.exports = Beanstream;
module.exports.Beanstream = Beanstream;
