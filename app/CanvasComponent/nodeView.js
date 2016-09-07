"use strict";
var drawer_1 = require('./drawer');
var rectangle_1 = require('../Model/rectangle');
var NodeView = (function () {
    function NodeView(center, theme, node) {
        this.center = center;
        this.theme = theme;
        this.node = node;
        this.isHover = false;
        this.rectangle = new rectangle_1.Rectangle(0, 0, 0, 0);
        this.Invalidate();
    }
    NodeView.prototype.hitTest = function (point) {
        return this.rectangle.contains(point);
    };
    NodeView.prototype.paint = function (context) {
        var colors = this.theme.colors;
        var strokeStyle = this.isHover ? colors.nodeBorderHover : colors.nodeBorder;
        drawer_1.Drawer.paintRect(context, this.rectangle, strokeStyle);
        this.paintPorts(context, this.node.inputs, this.rectangle.x);
        this.paintPorts(context, this.node.outputs, this.rectangle.right);
        var headerX = this.rectangle.x + 5;
        var headerY = this.rectangle.y - 5;
        drawer_1.Drawer.paintText(context, this.node.name, headerX, headerY, this.theme.nodeFont, colors.portText);
    };
    NodeView.prototype.moveBy = function (deltaX, deltaY) {
        this.center.x += deltaX;
        this.center.y += deltaY;
        this.Invalidate();
    };
    NodeView.prototype.Invalidate = function () {
        this.rectangle.width = this.theme.nodeDefaultWidth;
        var portsCount = this.node.inputs.length;
        this.rectangle.height = this.theme.nodeDefaultHeight;
        this.rectangle.height += this.theme.portSize * portsCount;
        this.rectangle.height += this.theme.portInterval * (portsCount - 1);
        this.rectangle.x = this.center.x - this.rectangle.width / 2;
        this.rectangle.y = this.center.y - this.rectangle.height / 2;
    };
    NodeView.prototype.paintPorts = function (context, ports, xpos) {
        var _this = this;
        var colors = this.theme.colors;
        var portRect = new rectangle_1.Rectangle(xpos - this.theme.portSize / 2, this.rectangle.y + this.theme.nodeDefaultHeight / 2, this.theme.portSize, this.theme.portSize);
        ports.forEach(function (port) {
            var portNameX = portRect.x;
            var portNameY = portRect.y - _this.theme.portSize / 2;
            drawer_1.Drawer.paintText(context, port.name, portNameX, portNameY, _this.theme.portFont, colors.portText);
            drawer_1.Drawer.paintFilledRect(context, portRect, colors.portBorder, colors.port);
            portRect.y += _this.theme.portInterval + _this.theme.portSize;
        });
    };
    return NodeView;
}());
exports.NodeView = NodeView;
//# sourceMappingURL=nodeView.js.map