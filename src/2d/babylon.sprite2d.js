var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BABYLON;
(function (BABYLON) {
    var Sprite2D = (function (_super) {
        __extends(Sprite2D, _super);
        // Static members
        /**
         * @constructor
         * @param {string} name - the name and id to be given to this node
         * @param {BABYLON.Scene} the scene this node will be added to
         */
        function Sprite2D(name, scene) {
            _super.call(this, name, scene);
            // Public members
            this.textures = [];
            this.material = null;
            // Private members
            this._vertices = [];
            this._vertexBuffer = null;
            this._indexBuffer = null;
            this._textureIndex = 0;
            // Initialize
            this.position.z = 1;
            this._prepareBuffers();
            this._createShaderMaterial();
        }
        /**
         * Sets the only texture of the sprite
         */
        Sprite2D.prototype.setTexture = function (texture) {
            this.setTextures([texture]);
        };
        /**
         * Sets the textures of the sprite
         */
        Sprite2D.prototype.setTextures = function (textures) {
            var _this = this;
            this.textures = textures;
            this._textureIndex = 0;
            // Set new positions in vertex data
            textures[0].onLoadObservable.add(function () {
                var vertexBuffer = _this._geometry.getVertexBuffer(BABYLON.VertexBuffer.PositionKind);
                var data = vertexBuffer.getData();
                var width = _this.getEngine().getRenderWidth();
                var height = _this.getEngine().getRenderHeight();
                var ratio = width / height;
                data[0] = _this.textures[0].getBaseSize().width / width * ratio;
                data[1] = _this.textures[0].getBaseSize().height / height;
                data[3] = -_this.textures[0].getBaseSize().width / width * ratio;
                data[4] = _this.textures[0].getBaseSize().height / height;
                data[6] = -_this.textures[0].getBaseSize().width / width * ratio;
                data[7] = -_this.textures[0].getBaseSize().height / height;
                data[9] = _this.textures[0].getBaseSize().width / width * ratio;
                data[10] = -_this.textures[0].getBaseSize().height / height;
                vertexBuffer.update(data);
            });
        };
        Object.defineProperty(Sprite2D.prototype, "width", {
            get: function () {
                var texture = this.textures[this._textureIndex];
                if (texture) {
                    return texture.getSize().width * this._scaling2d.x;
                }
                return this.getEngine().getRenderWidth() * this._scaling2d.x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sprite2D.prototype, "height", {
            get: function () {
                var texture = this.textures[this._textureIndex];
                if (texture) {
                    return texture.getSize().height * this._scaling2d.y;
                }
                return this.getEngine().getRenderWidth() * this._scaling2d.y;
            },
            enumerable: true,
            configurable: true
        });
        // Prepares the internal buffers
        Sprite2D.prototype._prepareBuffers = function () {
            // VBO and indices
            var vertices = [
                1, 1, 0,
                -1, 1, 0,
                -1, -1, 0,
                1, -1, 0
            ];
            var indices = [0, 1, 2, 0, 2, 3];
            var uvs = [
                0, 0,
                1, 0,
                1, 1,
                0, 1
            ];
            // Geometry
            var vertexData = new BABYLON.VertexData();
            vertexData.indices = indices;
            vertexData.positions = vertices;
            vertexData.uvs = uvs;
            this._geometry = new BABYLON.Geometry(name, this.getScene(), vertexData, true, this);
        };
        // Creates the shader material
        Sprite2D.prototype._createShaderMaterial = function () {
            var _this = this;
            var material = this._getMaterial();
            if (material) {
                material.dispose(true, false);
            }
            var shaderPath = {
                vertex: "sprite2d",
                fragment: "sprite2d"
            };
            var options = {
                attributes: ["position", "uv"],
                uniforms: ["worldViewProjection", "invertXY"],
                samplers: ["textureSampler"]
            };
            material = new BABYLON.ShaderMaterial(this.name + "_mat", this.getScene(), shaderPath, options);
            material.onBind = function (mesh) { return _this._bindMaterial(mesh); };
            this.material = material;
        };
        Sprite2D.prototype._bindMaterial = function (mesh) {
            var material = this._getMaterial();
            var texture = this.textures[this._textureIndex];
            if (texture) {
                material.setTexture("textureSampler", this.textures[this._textureIndex]);
                material.setFloat("invertXY", texture._invertY ? -1.0 : 1.0);
            }
        };
        Sprite2D.prototype._getMaterial = function () {
            return this.material;
        };
        return Sprite2D;
    }(BABYLON.Container2D));
    BABYLON.Sprite2D = Sprite2D;
})(BABYLON || (BABYLON = {}));
