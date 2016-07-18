const timer = require('timers');
const digitalocean = require('digitalocean');
const notifier = require('node-notifier');
const publicIP = require('public-ip');

const config = require('./config.json');
const client = digitalocean.client(config.digitalocean.client_key);
const domain = config.digitalocean.domain;
const record_id = config.digitalocean.record_id;
const delay = config.delay;

const displayNotification = (message) => {
  notifier.notify({
    'title': 'DNS Updater',
    'message': message
  });
}

const getRecord = (id) => {
  return client.domains.getRecord(domain, record_id);
}

const updateRecord = () => {
  displayNotification(`Updating IP for ${domain}...`);
  var record = getRecord(record_id);
  publicIP.v4().then(ip => {
    if (record.data === ip) {
      displayNotification(`IP already set to ${ip}`);
    } else {
      displayNotification(`Updated IP for ${domain} to ${ip}`);
    //   client.domains.updateRecord(domain, record_id, {
    //     data: ip
    //   }).then(function () {
    //     displayNotification(`Updated IP for ${domain} to ${ip}`);
    //   });
    }
  });
}

displayNotification(`Starting Updater. Updating every ${delay}.`);

timer.setInterval(updateRecord, delay);
