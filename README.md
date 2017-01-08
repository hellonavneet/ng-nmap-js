# ng-nmap-js
Gets a list of devices on the network and their MAC addressess

## prerequisites ##

nmap must be installed and the installed location must be added to the system PATH variable.

https://nmap.org/

## install ##

To install `npm install ng-nmap-js`

## example ##
```javascript
var nmap = require('ng-nmap-js')
  
      let addresses = [
        'scanme.nmap.org',
        '10.0.2.0/25',
        '192.168.10.80-120',
        'fe80::42:acff:fe11:fd4e/64'
      ];
    
nmap.getDevices(addresses, function(devices) {
  for (var item in devices) {
    console.log(JSON.stringify(report[item]));
  }
}, function(error) {
   console.log(error);
});
```