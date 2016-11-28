module BABYLON {
    export enum DockState {
        LEFT = 1,
        RIGHT = 2,
        TOP = 4,
        BOTTOM = 8,
        CENTER_HORIZONTAL = 16,
        CENTER_VERTICAL = 32,
        CENTER_ALL = DockState.CENTER_HORIZONTAL | DockState.CENTER_VERTICAL
    }

    export class Container2D extends Mesh {
        // Public members
        public dockState: DockState = DockState.CENTER_ALL;

        // Private members
        protected _position2d: Vector2 = Vector2.Zero();
        protected _scaling2d: Vector2 = new Vector2(1, 1);
        protected _rotation2d: number = 0;

        /**
         * @constructor
         * @param {string} name - the name and id to be given to this node
         * @param {BABYLON.Scene} the scene this node will be added to
         */
        constructor(name: string, scene: Scene) {
            super(name, scene);
        }

        // Override render
        public render(subMesh: SubMesh, enableAlphaMode: boolean): void {
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
                    this.position.x = -width / 2 + this.width + (this._position2d.x * 2.0) / width;
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
            super.render(subMesh, enableAlphaMode);

            // Re-enable depth buffer
            this.getEngine().setDepthBuffer(true);
        }

        public set x(x: number) { this._position2d.x = x; }
        public get x(): number { return this._position2d.x; }
        public set y(y: number) { this._position2d.y = y; }
        public get y(): number { return this._position2d.y }

        public set scaleX(x: number) { this._scaling2d.x = x }
        public get scaleX() { return this._scaling2d.x }
        public set scaleY(y: number) { this._scaling2d.y = y }
        public get scaleY() { return this._scaling2d.y }

        public set scaleXY(xy: number) {
            this._scaling2d.x = this._scaling2d.y = xy;
        }

        public set rotationZ(rotation: number) { this._rotation2d = rotation }
        public get rotationZ() { return this._rotation2d }

        public get width(): number { return 0 }

        public get height(): number { return 0 }
    }
}
