"use strict";
var Drawer = (function () {
    function Drawer() {
    }
    Drawer.paintRect = function (context, rectangle, borderStyle, shadowColor) {
        if (shadowColor === void 0) { shadowColor = "black"; }
        context.save();
        // context.shadowOffsetX = 1;
        // context.shadowOffsetY = 1;
        context.shadowBlur = 1;
        context.shadowColor = shadowColor;
        context.beginPath();
        context.lineWidth = 1;
        context.strokeStyle = borderStyle;
        context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
        context.stroke();
        context.restore();
    };
    Drawer.paintFilledRect = function (context, rectangle, borderStyle, fillStyle, shadowColor) {
        if (shadowColor === void 0) { shadowColor = "black"; }
        context.save();
        context.fillStyle = fillStyle;
        context.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
        Drawer.paintRect(context, rectangle, borderStyle, shadowColor);
        context.restore();
    };
    Drawer.paintText = function (context, text, x, y, font, textColor, shadowColor) {
        if (shadowColor === void 0) { shadowColor = "black"; }
        context.save();
        context.font = font;
        // context.shadowOffsetX = 1;
        // context.shadowOffsetY = 1;
        // context.shadowBlur = 2;
        // context.shadowColor = shadowColor;
        context.fillStyle = textColor;
        //context.lineWidth = 1;
        context.fillText(text, x, y);
        context.restore();
    };
    return Drawer;
}());
exports.Drawer = Drawer;
//# sourceMappingURL=drawer.js.map