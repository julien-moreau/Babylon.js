var BABYLON;
(function (BABYLON) {
    var Matrix3 = (function () {
        /**
         * @constructor
         */
        function Matrix3() {
            this.m = new Float32Array(9);
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
        Object.defineProperty(Matrix3.prototype, "a", {
            get: function () { return this.m[0]; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Matrix3.prototype, "b", {
            get: function () { return this.m[1]; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Matrix3.prototype, "c", {
            get: function () { return this.m[3]; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Matrix3.prototype, "d", {
            get: function () { return this.m[4]; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Matrix3.prototype, "tx", {
            get: function () { return this.m[2]; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Matrix3.prototype, "ty", {
            get: function () { return this.m[5]; },
            enumerable: true,
            configurable: true
        });
        /**
         * Sets the matrix3x3 values
         */
        Matrix3.prototype.set = function (a, b, c, d, tx, ty) {
            this.m[0] = a;
            this.m[1] = b;
            this.m[3] = c;
            this.m[4] = d;
            this.m[2] = tx;
            this.m[5] = ty;
            return this;
        };
        /**
         * Translates the matrix on the x and y
         */
        Matrix3.prototype.translate = function (x, y) {
            this.m[2] += x;
            this.m[5] += y;
            return this;
        };
        /**
         * Applies a scale transformation to the matrix
         */
        Matrix3.prototype.scale = function (x, y) {
            this.m[0] *= x;
            this.m[4] *= y;
            this.m[3] *= x;
            this.m[1] *= y;
            this.m[2] *= x;
            this.m[5] *= y;
            return this;
        };
        /**
         * Applies a rotation transformation to the matrix.
         */
        Matrix3.prototype.rotate = function (angle) {
            var cos = Math.cos(angle);
            var sin = Math.sin(angle);
            var a1 = this.a;
            var c1 = this.c;
            var tx1 = this.tx;
            this.m[0] = (a1 * cos) - (this.b * sin);
            this.m[1] = (a1 * sin) + (this.b * cos);
            this.m[3] = (c1 * cos) - (this.d * sin);
            this.m[4] = (c1 * sin) + (this.d * cos);
            this.m[2] = (tx1 * cos) - (this.ty * sin);
            this.m[6] = (tx1 * sin) + (this.ty * cos);
            return this;
        };
        return Matrix3;
    }());
    BABYLON.Matrix3 = Matrix3;
})(BABYLON || (BABYLON = {}));

//# sourceMappingURL=math2d.js.map
