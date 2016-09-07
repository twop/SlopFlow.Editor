"use strict";
var Node = (function () {
    function Node(name) {
        this.name = name;
        this.inputs = new Array();
        this.outputs = new Array();
    }
    Node.prototype.addInput = function (port) {
        this.inputs.push(port);
    };
    Node.prototype.addOutput = function (port) {
        this.outputs.push(port);
    };
    return Node;
}());
exports.Node = Node;
//# sourceMappingURL=node.js.map