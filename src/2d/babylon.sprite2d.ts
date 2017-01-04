module BABYLON {
    export class Sprite2DD extends Container2DD {
        // Public members
        public textures: Texture[] = [];

        public material: Material = null;

        // Private members
        private _vertices: number[] = [];
        private _vertexBuffer: VertexBuffer = null;
        private _indexBuffer: VertexBuffer = null;

        private _textureIndex: number = 0;

        // Static members

        /**
         * @constructor
         * @param {string} name - the name and id to be given to this node
         * @param {BABYLON.Scene} - the scene this node will be added to
         */
        constructor(name: string, scene: Scene) {
            super(name, scene);

            // Initialize
            this.position.z = 1;
            this._prepareBuffers();
            this._createShaderMaterial();
        }

        /**
         * Sets the only texture of the sprite
         */
        public setTexture(texture: Texture): void {
            this.setTextures([texture]);
        }

        /**
         * Sets the textures of the sprite
         */
        public setTextures(textures: Texture[]): void {
            this.textures = textures;
            this._textureIndex = 0;

            // Set new positions in vertex data
            textures[0].onLoadObservable.add(() => {
                var vertexBuffer = this._geometry.getVertexBuffer(VertexBuffer.PositionKind);
                var data = vertexBuffer.getData();

                var width = this.getEngine().getRenderWidth();
                var height = this.getEngine().getRenderHeight();

                data[0] = this.textures[0].getBaseSize().width / width;
                data[1] = this.textures[0].getBaseSize().height / height;

                data[3] = -this.textures[0].getBaseSize().width / width;
                data[4] = this.textures[0].getBaseSize().height / height;

                data[6] = -this.textures[0].getBaseSize().width / width;
                data[7] = -this.textures[0].getBaseSize().height / height;

                data[9] = this.textures[0].getBaseSize().width / width;
                data[10] = -this.textures[0].getBaseSize().height / height;

                vertexBuffer.update(data);
            });
        }

        public get width(): number {
            var texture = this.textures[this._textureIndex];
            if (texture) {
                return texture.getSize().width * this.scaling.x;
            }

            return this.getEngine().getRenderWidth() * this.scaling.x;
        }

        public get height(): number {
            var texture = this.textures[this._textureIndex];
            if (texture) {
                return texture.getSize().height * this.scaling.y;
            }

            return this.getEngine().getRenderWidth() * this.scaling.y;
        }

        // Prepares the internal buffers
        private _prepareBuffers(): void {
            // VBO and indices
            var vertices = [
                 1,  1,  0,
                -1,  1,  0,
                -1, -1,  0,
                 1, -1,  0
            ];
            var indices = [0, 1, 2, 0, 2, 3];
            var uvs = [
                0, 0,
                1, 0,
                1, 1,
                0, 1
            ];

            // Geometry
            var vertexData = new VertexData();
            vertexData.indices = indices;
            vertexData.positions = vertices;
            vertexData.uvs = uvs;

            this._geometry = new Geometry(name, this.getScene(), vertexData, true, this);
        }

        // Creates the shader material
        private _createShaderMaterial(): void {
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
                uniforms: ["worldViewProjection", "invertXY"],
                samplers: ["textureSampler"]
            };

            material = new ShaderMaterial(this.name + "_mat", this.getScene(), shaderPath, options);
            material.onBind = (mesh: Mesh) => this._onBindMaterial(mesh);

            this.material = material;
        }

        private _onBindMaterial(mesh: Mesh): void {
            var material = this._getMaterial();
            var texture = this.textures[this._textureIndex];

            if (texture) {
                material.setTexture("textureSampler", this.textures[this._textureIndex]);
                material.setFloat("invertXY", texture._invertY ? -1.0 : 1.0);
            }

            material.setMatrix("worldViewProjection", mesh.getWorldMatrix());
        }

        private _getMaterial(): ShaderMaterial {
            return <ShaderMaterial> this.material
        }
    }
}
