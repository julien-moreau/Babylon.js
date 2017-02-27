module BABYLON {
    export abstract class Container2DD extends Mesh {
        // Public members
        public x: number = 0;
        public y: number = 0;

        public scaleX: number = 1;
        public scaleY: number = 1;

        // Private members

        /**
         * @constructor
         * @param {string} name - the name and id to be given to this node
         * @param {BABYLON.Scene} - the scene this node will be added to
         */
        constructor(name: string, scene: Scene) {
            super(name, scene);
        }

        // Override render
        public render(subMesh: SubMesh, enableAlphaMode: boolean): Mesh {
            // Disable depth buffer
            this.getEngine().setDepthBuffer(false);

            // Render
            super.render(subMesh, enableAlphaMode);

            // Re-enable depth buffer
            this.getEngine().setDepthBuffer(true);

            return this;
        }

        public set scaleXY(xy: number) {
            this.scaling.x = this.scaling.y = xy;
        }

        public get rotationZ() { return this.rotation.z; }
        public set rotationZ(value: number) { this.rotation.z = value; }

        public get width(): number { return 0 }
        public get height(): number { return 0 }
    }
}
