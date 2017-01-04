var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BABYLON;
(function (BABYLON) {
    var Container2DD = (function (_super) {
        __extends(Container2DD, _super);
        // Public members
        // Private members
        /**
         * @constructor
         * @param {string} name - the name and id to be given to this node
         * @param {BABYLON.Scene} - the scene this node will be added to
         */
        function Container2DD(name, scene) {
            return _super.call(this, name, scene) || this;
        }
        // Override render
        Container2DD.prototype.render = function (subMesh, enableAlphaMode) {
            // Disable depth buffer
            this.getEngine().setDepthBuffer(false);
            // Render
            _super.prototype.render.call(this, subMesh, enableAlphaMode);
            // Re-enable depth buffer
            this.getEngine().setDepthBuffer(true);
        };
        Object.defineProperty(Container2DD.prototype, "x", {
            get: function () { return this.position.x; },
            set: function (x) { this.position.x = x; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container2DD.prototype, "y", {
            get: function () { return this.position.y; },
            set: function (y) { this.position.y = y; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container2DD.prototype, "scaleX", {
            get: function () { return this.scaling.x; },
            set: function (x) { this.scaling.x = x; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container2DD.prototype, "scaleY", {
            get: function () { return this.scaling.y; },
            set: function (y) { this.scaling.y = y; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container2DD.prototype, "scaleXY", {
            set: function (xy) {
                this.scaling.x = this.scaling.y = xy;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container2DD.prototype, "rotationZ", {
            get: function () { return this.rotation.z; },
            set: function (rotation) { this.rotation.z = rotation; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container2DD.prototype, "width", {
            get: function () { return 0; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container2DD.prototype, "height", {
            get: function () { return 0; },
            enumerable: true,
            configurable: true
        });
        return Container2DD;
    }(BABYLON.Mesh));
    BABYLON.Container2DD = Container2DD;
})(BABYLON || (BABYLON = {}));

//# sourceMappingURL=babylon.container2d.js.map
