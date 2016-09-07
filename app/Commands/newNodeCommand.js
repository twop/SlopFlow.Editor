"use strict";
var node_1 = require("../Model/node");
var NewNodeCommand = (function () {
    function NewNodeCommand(nodeModel) {
        this.nodeModel = nodeModel;
    }
    NewNodeCommand.prototype.Execute = function (scene, logger) {
        var newNode = new node_1.Node(this.nodeModel.name);
        scene.nodes.push(newNode);
        scene.selectNode(newNode);
        logger.debug("execute NewNodeCommand name = " + this.nodeModel.name);
    };
    NewNodeCommand.prototype.Revert = function (scene, logger) {
    };
    return NewNodeCommand;
}());
exports.NewNodeCommand = NewNodeCommand;
//# sourceMappingURL=newNodeCommand.js.map