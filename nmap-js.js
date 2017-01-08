var sys = require('sys');
var exec = require('child_process').exec;
var os = require('os');
module.exports = {
    getDevices: (addresses, successCallback, errorCallback) => {
        var command = "nmap -sP ";
        if(process.platform === 'linux' || process.platform === 'darwin'){
            command = `sudo ${command}`;
        }
        if(addresses && Array.isArray(addresses)) {
            command = `${command} ${addresses.join(' ')}`;
        }
            
        exec(command, function(error, stdout, stderr) {
            if(error) {
                errorCallback(error);
                return;
            }

            var devices = [];
                var mac = [];
                var tmpArr = stdout.split("\n");
                for (x in tmpArr) {
                    if(tmpArr[x].indexOf('Nmap') !== -1) {
                        tmpArr[x] = tmpArr[x].substring(21);
                        if(tmpArr[x].indexOf('(') === -1) {
                            tmpArr[x] = 'unknown ' + tmpArr[x];
                        }
                        tmpArr[x] = tmpArr[x].replace("(","");
                        tmpArr[x] = tmpArr[x].replace(")","");
                        var tmpSplit = tmpArr[x].split(" ");
                        var tmpJson = {
                            "name":	tmpSplit[0],
                            "ip": tmpSplit[1],
                        }
                        devices[x] = tmpJson;					
                        // If no mac in nmap output for host, fill in Unknown.
                        if(tmpArr[x++].indexOf('MAC') === -1) {
                            mac[x] = "Unknown";
                        }
                    }
                    if(tmpArr[x].indexOf('MAC') !== -1) {
                        tmpArr[x] = tmpArr[x].substring(13);
                        tmpArr[x] = tmpArr[x].replace("(","");
                        tmpArr[x] = tmpArr[x].replace(")","");
                        mac[x] = tmpArr[x];
                    }
                }
                devices = devices.filter(function(n){return n}); //Removes all empty elements
                mac = mac.filter(function(n){return n}); //Removes all empty elements
                for (x in devices) {
                    devices[x].mac = mac[x];
                }
                successCallback(devices);
        });
    }
}