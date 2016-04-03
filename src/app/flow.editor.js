var FlowEditor;
(function (FlowEditor) {
    var Point = (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        return Point;
    }());
    FlowEditor.Point = Point;
})(FlowEditor || (FlowEditor = {}));
var FlowEditor;
(function (FlowEditor) {
    var Canvas = (function () {
        function Canvas(element, theme) {
            var _this = this;
            this._pointerPosition = new FlowEditor.Point(0, 0);
            this._nodes = [];
            this._currentState = null;
            this._hoverObject = null;
            this._theme = theme;
            this._canvas = element;
            var scale = this.devicePixelRatio;
            this._canvas.width = this._canvas.clientWidth * scale;
            this._canvas.height = this._canvas.clientHeight * scale;
            this._canvas.focus();
            this._context = this._canvas.getContext("2d");
            this._context.scale(scale, scale);
            this._mouseDownHandler = function (e) { _this.mouseDown(e); };
            this._mouseUpHandler = function (e) { _this.mouseUp(e); };
            this._mouseMoveHandler = function (e) { _this.mouseMove(e); };
            this._canvas.addEventListener("mousedown", this._mouseDownHandler, false);
            this._canvas.addEventListener("mouseup", this._mouseUpHandler, false);
            this._canvas.addEventListener("mousemove", this._mouseMoveHandler, false);
        }
        Canvas.prototype.dispose = function () {
            if (this._canvas !== null) {
                this._canvas.removeEventListener("mousedown", this._mouseDownHandler);
                this._canvas.removeEventListener("mouseup", this._mouseUpHandler);
                this._canvas.removeEventListener("mousemove", this._mouseMoveHandler);
                this._canvas = null;
                this._context = null;
            }
        };
        Canvas.prototype.addNode = function (node) {
            this._nodes.push(node);
            this.update();
        };
        Object.defineProperty(Canvas.prototype, "devicePixelRatio", {
            get: function () {
                return (('devicePixelRatio' in window) && (window.devicePixelRatio > 1)) ? window.devicePixelRatio : 1;
            },
            enumerable: true,
            configurable: true
        });
        Canvas.prototype.mouseDown = function (e) {
            e.preventDefault();
            this._canvas.focus();
            this.updateMousePosition(e);
            if (this._hoverObject != null && this._currentState == null) {
                this._currentState = new FlowEditor.NodeDragState(this._hoverObject, this._pointerPosition);
                this.updateMouseCursor();
            }
        };
        Canvas.prototype.mouseUp = function (e) {
            e.preventDefault();
            this.updateMousePosition(e);
            if (this._currentState != null) {
                if (this._currentState.mouseUp(this._pointerPosition)) {
                    this._currentState = null;
                    this.updateMouseCursor();
                }
                this.update();
                return;
            }
        };
        Canvas.prototype.mouseMove = function (e) {
            e.preventDefault();
            this.updateMousePosition(e);
            if (this._currentState != null) {
                if (this._currentState.mouseMove(this._pointerPosition)) {
                    this._currentState = null;
                }
                this.update();
                return;
            }
            var currentNode = null;
            for (var i = 0; i < this._nodes.length; i++) {
                var node = this._nodes[i];
                node.isHover = node.hitTest(this._pointerPosition);
                if (node.isHover) {
                    currentNode = node;
                }
            }
            if (currentNode != this._hoverObject) {
                console.log("current hover:" + currentNode);
                this._hoverObject = currentNode;
                this.update();
            }
        };
        Canvas.prototype.updateMouseCursor = function () {
            if (this._currentState) {
                this._canvas.style.cursor = this._currentState.getCurrentCursor();
                return;
            }
            this._canvas.style.cursor = this._hoverObject ? FlowEditor.Cursors.hover : FlowEditor.Cursors.default;
        };
        Canvas.prototype.updateMousePosition = function (e) {
            this._pointerPosition = new FlowEditor.Point(e.clientX, e.clientY);
        };
        Canvas.prototype.update = function () {
            this.updateMouseCursor();
            this._canvas.style.background = this._theme.background;
            this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
            for (var i = 0; i < this._nodes.length; i++) {
                this._context.save();
                this._nodes[i].paint(this._context, this._theme);
                this._context.restore();
            }
        };
        return Canvas;
    }());
    FlowEditor.Canvas = Canvas;
})(FlowEditor || (FlowEditor = {}));
var FlowEditor;
(function (FlowEditor) {
    var Rectangle = (function () {
        function Rectangle(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
        Rectangle.prototype.contains = function (point) {
            return ((point.x >= this.x) && (point.x <= (this.x + this.width)) && (point.y >= this.y) && (point.y <= (this.y + this.height)));
        };
        Rectangle.prototype.inflate = function (dx, dy) {
            this.x -= dx;
            this.y -= dy;
            this.width += dx + dx + 1;
            this.height += dy + dy + 1;
        };
        Rectangle.prototype.union = function (rectangle) {
            var x1 = (this.x < rectangle.x) ? this.x : rectangle.x;
            var y1 = (this.y < rectangle.y) ? this.y : rectangle.y;
            var x2 = ((this.x + this.width) < (rectangle.x + rectangle.width)) ? (rectangle.x + rectangle.width) : (this.x + this.width);
            var y2 = ((this.y + this.height) < (rectangle.y + rectangle.height)) ? (rectangle.y + rectangle.height) : (this.y + this.height);
            return new Rectangle(x1, y1, x2 - x1, y2 - y1);
        };
        Object.defineProperty(Rectangle.prototype, "topLeft", {
            get: function () {
                return new FlowEditor.Point(this.x, this.y);
            },
            enumerable: true,
            configurable: true
        });
        Rectangle.prototype.clone = function () {
            return new Rectangle(this.x, this.y, this.width, this.height);
        };
        return Rectangle;
    }());
    FlowEditor.Rectangle = Rectangle;
})(FlowEditor || (FlowEditor = {}));
var FlowEditor;
(function (FlowEditor) {
    var Node = (function () {
        function Node(position, name) {
            this.isHover = false;
            this._inputs = [];
            this._portOffset = 10;
            this._width = 100;
            this._name = name;
            var port1 = new FlowEditor.Port("input1");
            var port2 = new FlowEditor.Port("input2");
            this._inputs.push(port1);
            this._inputs.push(port2);
            this.moveTo(position);
        }
        Node.prototype.hitTest = function (point) {
            return this._rectangle.contains(point);
        };
        Node.prototype.paint = function (context, theme) {
            var strokeStyle = this.isHover ? theme.nodeBorderHover : theme.nodeBorder;
            FlowEditor.Drawer.paintFilledRect(context, this._rectangle, theme.node, strokeStyle);
            this._inputs.forEach(function (input) { input.paint(context, theme); });
            var headerPos = this._rectangle.topLeft;
            headerPos.x += 5;
            headerPos.y -= 5;
            //console.log("render " +  this._name + " isHover = " + this.isHover);
            FlowEditor.Drawer.paintText(context, this._name, headerPos, theme.portText);
        };
        Node.prototype.moveBy = function (deltaX, deltaY) {
            var leftTop = this._rectangle.topLeft;
            leftTop.x += deltaX;
            leftTop.y += deltaY;
            this.moveTo(leftTop);
        };
        Node.prototype.moveTo = function (leftTop) {
            var y = leftTop.y + this._portOffset + FlowEditor.Port.size / 2;
            for (var index = 0; index < this._inputs.length; index++) {
                var input = this._inputs[index];
                input.setCenter(leftTop.x, y);
                y += this._portOffset + FlowEditor.Port.size;
            }
            y -= FlowEditor.Port.size / 2;
            this._rectangle = new FlowEditor.Rectangle(leftTop.x, leftTop.y, this._width, y - leftTop.y);
        };
        return Node;
    }());
    FlowEditor.Node = Node;
})(FlowEditor || (FlowEditor = {}));
var FlowEditor;
(function (FlowEditor) {
    var Drawer = (function () {
        function Drawer() {
        }
        Drawer.paintFilledRect = function (context, rectangle, fillStyle, strokeStyle, shadowColor) {
            if (shadowColor === void 0) { shadowColor = "black"; }
            context.save();
            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;
            context.shadowBlur = 3;
            context.shadowColor = shadowColor;
            context.fillStyle = fillStyle;
            context.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
            context.restore();
            context.strokeStyle = strokeStyle;
            context.lineWidth = 1;
            context.strokeRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
        };
        Drawer.paintText = function (context, text, position, textStyle, shadowColor) {
            if (shadowColor === void 0) { shadowColor = "black"; }
            context.save();
            context.font = "8.25pt Tahoma";
            context.shadowOffsetX = 1;
            context.shadowOffsetY = 1;
            context.shadowBlur = 2;
            context.shadowColor = shadowColor;
            context.fillStyle = textStyle;
            context.lineWidth = 2;
            context.fillText(text, position.x, position.y);
        };
        return Drawer;
    }());
    FlowEditor.Drawer = Drawer;
})(FlowEditor || (FlowEditor = {}));
var FlowEditor;
(function (FlowEditor) {
    var Port = (function () {
        function Port(name) {
            this._textOffset = 5;
            this.isHover = false;
            this.portName = name;
        }
        Port.prototype.setCenter = function (x, y) {
            this._rectangle = new FlowEditor.Rectangle(x - Port.size / 2, y - Port.size / 2, Port.size, Port.size);
        };
        Port.prototype.hitTest = function (point) {
            return this._rectangle.contains(point);
        };
        Port.prototype.paint = function (context, theme) {
            var strokeStyle = this.isHover ? theme.portBorderHover : theme.portBorder;
            FlowEditor.Drawer.paintFilledRect(context, this._rectangle, theme.port, strokeStyle);
            var position = new FlowEditor.Point(this._rectangle.x + this._rectangle.width + this._textOffset, this._rectangle.y + Port.size - 2);
            FlowEditor.Drawer.paintText(context, this.portName, position, theme.portText);
        };
        Port.size = 10;
        return Port;
    }());
    FlowEditor.Port = Port;
})(FlowEditor || (FlowEditor = {}));
var FlowEditor;
(function (FlowEditor) {
    var Cursors = (function () {
        function Cursors() {
        }
        Cursors.default = "default";
        Cursors.drag = "move";
        Cursors.hover = "pointer";
        return Cursors;
    }());
    FlowEditor.Cursors = Cursors;
})(FlowEditor || (FlowEditor = {}));
var FlowEditor;
(function (FlowEditor) {
    var NodeDragState = (function () {
        function NodeDragState(node, mousePos) {
            this._lastMousePos = new FlowEditor.Point(mousePos.x, mousePos.y);
            this._node = node;
        }
        NodeDragState.prototype.mouseUp = function (mousePos) {
            return true;
        };
        NodeDragState.prototype.getCurrentCursor = function () {
            return FlowEditor.Cursors.drag;
        };
        NodeDragState.prototype.mouseMove = function (mousePos) {
            this._node.moveBy(mousePos.x - this._lastMousePos.x, mousePos.y - this._lastMousePos.y);
            this._lastMousePos.x = mousePos.x;
            this._lastMousePos.y = mousePos.y;
            return false;
        };
        return NodeDragState;
    }());
    FlowEditor.NodeDragState = NodeDragState;
})(FlowEditor || (FlowEditor = {}));
//# sourceMappingURL=flow.editor.js.map