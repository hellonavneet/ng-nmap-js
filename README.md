# nmap-js
Gets a list of devices on the network and their MAC addressess
Depending upon the address ranges the call can take a long time, so be patient.
## prerequisites ##

nmap must be installed and the installed location must be added to the system PATH variable.

https://nmap.org/

## install ##

To install `npm install nmap-js`

## example ##
```javascript
var nmap = require('nmap-js');

var addresses = [
  '192.168.1.0/24' //nmap target specification https://nmap.org/book/man-target-specification.html
];

nmap.getDevices(addresses, function(devices) {
  for (var item of devices) {
    console.log(JSON.stringify(item));    
  }
  console.log("done");
}, function(error) {
   console.log(error);
});
```