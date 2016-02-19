/* 
 *  Connector Class
 *  Used to communicate to the server.
 *  Handles all sockets and applies crypto (in the future .. hopefully)
 *
 *  Author: henry[AT]levec[DOT]net
 */


function Connector(host, httpPort, websockPort, secret) {
    this.lrcHost = host;
    this.lrcHttpPort = httpPort;
    this.lrcWsockPort = websockPort;
    this.lrcWsock = new WebSocket('ws://' + this.lrcHost + ':' + this.lrcWsockPort);
    this.lrcSecret = secret;            // for future use
}

// Send lrc command via HTTP
Connector.prototype.lrcCommand = function(command) {
    return $.get("http://" + this.lrcHost + ":" + this.lrcHttpPort + '/lrc', {cmd: command});
}

// Send music command via HTTP
Connector.prototype.musicCommand = function(mAction, mArgs) {
    return $.get("http://" + this.lrcHost + ":" + this.lrcHttpPort + "/music", {action: mAction, args: mArgs});
}

// get Info from server via ajax
Connector.prototype.getInfo = function(fCallback) {
    $.ajax({
        url: "http://" + this.lrcHost + ":" + this.lrcHttpPort + "/music",
        data: {info: 0},
        dataType: "jsonp",
        cache: false,
        jsonpCallback: fCallback});
}

// Send command via WebSocket
Connector.prototype.wsockCommand = function(command) {
    if (this.lrcWsock === null || this.lrcWsock.readyState != WebSocket.OPEN) {
        this.lrcWsock = new WebSocket('ws://' + this.lrcHost + ':' + this.lrcWsockPort);
    }
    this.lrcWsock.send(command);
}
