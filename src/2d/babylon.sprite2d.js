var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BABYLON;
(function (BABYLON) {
    var Sprite2DD = (function (_super) {
        __extends(Sprite2DD, _super);
        // Static members
        /**
         * @constructor
         * @param {string} name - the name and id to be given to this node
         * @param {BABYLON.Scene} - the scene this node will be added to
         */
        function Sprite2DD(name, scene) {
            var _this = _super.call(this, name, scene) || this;
            // Public members
            _this.textures = [];
            _this.material = null;
            // Private members
            _this._vertices = [];
            _this._vertexBuffer = null;
            _this._indexBuffer = null;
            _this._textureIndex = 0;
            // Initialize
            _this.position.z = 1;
            _this._prepareBuffers();
            _this._createShaderMaterial();
            return _this;
        }
        /**
         * Sets the only texture of the sprite
         */
        Sprite2DD.prototype.setTexture = function (texture) {
            this.setTextures([texture]);
        };
        /**
         * Sets the textures of the sprite
         */
        Sprite2DD.prototype.setTextures = function (textures) {
            var _this = this;
            this.textures = textures;
            this._textureIndex = 0;
            // Set new positions in vertex data
            textures[0].onLoadObservable.add(function () {
                var vertexBuffer = _this._geometry.getVertexBuffer(BABYLON.VertexBuffer.PositionKind);
                var data = vertexBuffer.getData();
                var width = _this.getEngine().getRenderWidth();
                var height = _this.getEngine().getRenderHeight();
                data[0] = _this.textures[0].getBaseSize().width / width;
                data[1] = _this.textures[0].getBaseSize().height / height;
                data[3] = -_this.textures[0].getBaseSize().width / width;
                data[4] = _this.textures[0].getBaseSize().height / height;
                data[6] = -_this.textures[0].getBaseSize().width / width;
                data[7] = -_this.textures[0].getBaseSize().height / height;
                data[9] = _this.textures[0].getBaseSize().width / width;
                data[10] = -_this.textures[0].getBaseSize().height / height;
                vertexBuffer.update(data);
            });
        };
        Object.defineProperty(Sprite2DD.prototype, "width", {
            get: function () {
                var texture = this.textures[this._textureIndex];
                if (texture) {
                    return texture.getSize().width * this.scaling.x;
                }
                return this.getEngine().getRenderWidth() * this.scaling.x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sprite2DD.prototype, "height", {
            get: function () {
                var texture = this.textures[this._textureIndex];
                if (texture) {
                    return texture.getSize().height * this.scaling.y;
                }
                return this.getEngine().getRenderWidth() * this.scaling.y;
            },
            enumerable: true,
            configurable: true
        });
        // Prepares the internal buffers
        Sprite2DD.prototype._prepareBuffers = function () {
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
        Sprite2DD.prototype._createShaderMaterial = function () {
            var _this = this;
            var material = this._getMaterial();
            if (material) {
                material.dispose(true, false);
            }
            var shaderPath = {
                vertex: "sprite2dd",
                fragment: "sprite2dd"
            };
            var options = {
                attributes: ["position", "uv"],
                uniforms: ["world", "invertXY"],
                samplers: ["textureSampler"]
            };
            material = new BABYLON.ShaderMaterial(this.name + "_mat", this.getScene(), shaderPath, options);
            material.onBind = function (mesh) { return _this._onBindMaterial(mesh); };
            this.material = material;
        };
        Sprite2DD.prototype._onBindMaterial = function (mesh) {
            var material = this._getMaterial();
            // Texture
            var texture = this.textures[this._textureIndex];
            if (texture) {
                material.setTexture("textureSampler", this.textures[this._textureIndex]);
                material.setFloat("invertXY", texture._invertY ? -1.0 : 1.0);
            }
            // Set world matrix
            var width = this.getEngine().getRenderWidth();
            var height = this.getEngine().getRenderHeight();
            this.position.x = this.x / width;
            this.position.y = this.y / height;
            material.setMatrix("world", mesh.getWorldMatrix());
        };
        Sprite2DD.prototype._getMaterial = function () {
            return this.material;
        };
        return Sprite2DD;
    }(BABYLON.Container2DD));
    BABYLON.Sprite2DD = Sprite2DD;
})(BABYLON || (BABYLON = {}));

//# sourceMappingURL=babylon.sprite2d.js.map
