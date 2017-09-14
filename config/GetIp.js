/**
 * 获取系统ip
 */
var os = require('os');

var IPv4;
var nets = os.networkInterfaces()['以太网'];
for (var i = 0; i < nets.length; i++) {
    if (nets[i].family == 'IPv4') {
        IPv4 = nets[i].address;
    }
}


module.exports = IPv4;