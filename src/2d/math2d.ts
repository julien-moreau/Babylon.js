module BABYLON {
    export class Matrix3 {
        public m: Float32Array = new Float32Array(9);

        /**
         * @constructor
         */
        constructor() {
            this.m[0] = 1; // a
            this.m[1] = 0; // b
            this.m[3] = 0; // c
            this.m[4] = 1; // d

            this.m[2] = 0; // tx
            this.m[5] = 0; // ty

            this.m[6] = 0;
            this.m[7] = 0;
            this.m[8] = 1;
        }

        public get a() { return this.m[0] }
        public get b() { return this.m[1] }
        public get c() { return this.m[3] }
        public get d() { return this.m[4] }
        public get tx() { return this.m[2] }
        public get ty() { return this.m[5] }

        /**
         * Sets the matrix3x3 values
         */
        public set(a, b, c, d, tx, ty): Matrix3 {
            this.m[0] = a;
            this.m[1] = b;
            this.m[3] = c;
            this.m[4] = d;
            this.m[2] = tx;
            this.m[5] = ty;

            return this;
        }

        /**
         * Translates the matrix on the x and y
         */
        public translate(x, y): Matrix3 {
            this.m[2] += x;
            this.m[5] += y;

            return this;
        }

        /**
         * Applies a scale transformation to the matrix
         */
        public scale(x, y): Matrix3 {
            this.m[0] *= x;
            this.m[4] *= y;
            this.m[3] *= x;
            this.m[1] *= y;
            this.m[2] *= x;
            this.m[5] *= y;

            return this;
        }

        /**
         * Applies a rotation transformation to the matrix.
         */
        public rotate(angle): Matrix3 {
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);

            const a1 = this.a;
            const c1 = this.c;
            const tx1 = this.tx;

            this.m[0] = (a1 * cos)  - (this.b * sin);
            this.m[1] = (a1 * sin)  + (this.b * cos);
            this.m[3] = (c1 * cos)  - (this.d * sin);
            this.m[4] = (c1 * sin)  + (this.d * cos);
            this.m[2] = (tx1 * cos) - (this.ty * sin);
            this.m[6] = (tx1 * sin) + (this.ty * cos);

            return this;
        }
    }
}
