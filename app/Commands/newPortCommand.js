"use strict";
var NewPortCommand = (function () {
    function NewPortCommand(port, isInput) {
        this.port = port;
        this.isInput = isInput;
    }
    NewPortCommand.prototype.Execute = function (scene, logger) {
        if (!scene.selectedNode)
            throw "scene.selectedNode is null";
        this.getPorts(scene.selectedNode).push(this.port);
        logger.debug('execute NewPortCommand portName = ' + this.port.name);
    };
    NewPortCommand.prototype.Revert = function (scene, logger) {
    };
    NewPortCommand.prototype.getPorts = function (node) {
        return this.isInput ? node.inputs : node.outputs;
    };
    return NewPortCommand;
}());
exports.NewPortCommand = NewPortCommand;
//# sourceMappingURL=newPortCommand.js.map