var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BABYLON;
(function (BABYLON) {
    (function (DockState) {
        DockState[DockState["LEFT"] = 1] = "LEFT";
        DockState[DockState["RIGHT"] = 2] = "RIGHT";
        DockState[DockState["TOP"] = 4] = "TOP";
        DockState[DockState["BOTTOM"] = 8] = "BOTTOM";
        DockState[DockState["CENTER_HORIZONTAL"] = 16] = "CENTER_HORIZONTAL";
        DockState[DockState["CENTER_VERTICAL"] = 32] = "CENTER_VERTICAL";
        DockState[DockState["CENTER_ALL"] = 48] = "CENTER_ALL";
    })(BABYLON.DockState || (BABYLON.DockState = {}));
    var DockState = BABYLON.DockState;
    var Container2D = (function (_super) {
        __extends(Container2D, _super);
        /**
         * @constructor
         * @param {string} name - the name and id to be given to this node
         * @param {BABYLON.Scene} the scene this node will be added to
         */
        function Container2D(name, scene) {
            _super.call(this, name, scene);
            // Public members
            this.dockState = DockState.CENTER_ALL;
            // Private members
            this._position2d = BABYLON.Vector2.Zero();
            this._scaling2d = new BABYLON.Vector2(1, 1);
            this._rotation2d = 0;
        }
        // Override render
        Container2D.prototype.render = function (subMesh, enableAlphaMode) {
            // Disable depth buffer
            this.getEngine().setDepthBuffer(false);
            // Set positions according to dock state
            var engine = this.getEngine();
            var width = engine.getRenderWidth();
            var height = engine.getRenderHeight();
            if (this.dockState === DockState.CENTER_ALL) {
                this.position.x = (this._position2d.x * 2.0) / width;
                this.position.y = (this._position2d.y * 2.0) / height;
            }
            else {
                // Horizontal docking
                if (this.dockState & DockState.LEFT) {
                    this.position.x = -width / 2 + this.width + this._position2d.x * 2.0;
                }
                else if (this.dockState & DockState.RIGHT) {
                    this.position.x = width / 2 - this.width - this._position2d.x * 2.0;
                }
                else if (this.dockState & DockState.CENTER_HORIZONTAL) {
                    this.position.x = (this._position2d.x * 2.0) / width + this._position2d.x * 2.0;
                }
                // Vertical docking
                if (this.dockState & DockState.TOP) {
                    this.position.y = -height / 2 + this.height + this._position2d.y * 2.0;
                }
                else if (this.dockState & DockState.BOTTOM) {
                    this.position.y = height / 2 - this.height - this._position2d.y * 2.0;
                }
                else if (this.dockState & DockState.CENTER_VERTICAL) {
                    this.position.y = (this._position2d.y * 2.0) / height + this._position2d.y * 2.0;
                }
            }
            this.rotation.z = this._rotation2d;
            this.scaling.x = this._scaling2d.x;
            this.scaling.y = this._scaling2d.y;
            this.computeWorldMatrix(true);
            // Render
            _super.prototype.render.call(this, subMesh, enableAlphaMode);
            // Re-enable depth buffer
            this.getEngine().setDepthBuffer(true);
        };
        Object.defineProperty(Container2D.prototype, "x", {
            get: function () { return this._position2d.x; },
            set: function (x) { this._position2d.x = x; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container2D.prototype, "y", {
            get: function () { return this._position2d.y; },
            set: function (y) { this._position2d.y = y; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container2D.prototype, "scaleX", {
            get: function () { return this._scaling2d.x; },
            set: function (x) { this._scaling2d.x = x; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container2D.prototype, "scaleY", {
            get: function () { return this._scaling2d.y; },
            set: function (y) { this._scaling2d.y = y; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container2D.prototype, "scaleXY", {
            set: function (xy) {
                this._scaling2d.x = this._scaling2d.y = xy;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container2D.prototype, "rotationZ", {
            get: function () { return this._rotation2d; },
            set: function (rotation) { this._rotation2d = rotation; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container2D.prototype, "width", {
            get: function () { return 0; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container2D.prototype, "height", {
            get: function () { return 0; },
            enumerable: true,
            configurable: true
        });
        return Container2D;
    }(BABYLON.Mesh));
    BABYLON.Container2D = Container2D;
})(BABYLON || (BABYLON = {}));
