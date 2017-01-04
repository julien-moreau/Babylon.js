module BABYLON {
    export abstract class Container2DD extends Mesh {
        // Public members

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
        public render(subMesh: SubMesh, enableAlphaMode: boolean): void {
            // Disable depth buffer
            this.getEngine().setDepthBuffer(false);

            // Render
            super.render(subMesh, enableAlphaMode);

            // Re-enable depth buffer
            this.getEngine().setDepthBuffer(true);
        }

        public set x(x: number) { this.position.x = x; }
        public get x(): number { return this.position.x; }
        public set y(y: number) { this.position.y = y; }
        public get y(): number { return this.position.y }

        public set scaleX(x: number) { this.scaling.x = x }
        public get scaleX() { return this.scaling.x }
        public set scaleY(y: number) { this.scaling.y = y }
        public get scaleY() { return this.scaling.y }

        public set scaleXY(xy: number) {
            this.scaling.x = this.scaling.y = xy;
        }

        public set rotationZ(rotation: number) { this.rotation.z = rotation }
        public get rotationZ() { return this.rotation.z }

        public get width(): number { return 0 }

        public get height(): number { return 0 }
    }
}
