/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2014 Olivier Biot, Jason Oster, Aaron McLeod
 * http://www.melonjs.org
 *
 */
(function () {

    /**
     * The WebGL renderer object
     * There is no constructor function for me.CanvasRenderer
     * @namespace me.WebGLRenderer
     * @memberOf me
     * @ignore
     */
    me.WebGLRenderer = (function () {
        var api = {},
        canvas = null,
        gl = null,
        color = null,
        textures = {};

        api.init = function (width, height, c) {
            canvas = c;
            this.context = new kami.WebGLContext(width, height, canvas);
            gl = this.context.gl;
            color = new me.Color();
            this.globalAlpha = 1.0;

            return this;
        };

        api.blitSurface = function () {
            // empty function for now
        };

        /**
         * Clears the gl context. Accepts a gl context or defaults to stored gl renderer.
         * @name clearSurface
         * @memberOf me.WebGLRenderer
         * @function
         * @param {WebGLContext} gl - the gl context.
         * @param {String} color - css color string.
         */
        api.clearSurface = function (gl, col) {
            if (col.match(/^\#/)) {
                color.parseHex(col);
            }
            else if (col.match(/^rgb/)) {
                color.parseRGB(col);
            }
            else {
                color.parseCSS(col);
            }

            gl.clearColor(color.r / 255.0, color.g / 255.0, color.b / 255.0, 1.0);
        };

        /**
         * Draw an image to the gl context
         * @name drawImage
         * @memberOf me.WebGLRenderer
         * @function
         * @param {image} image html image element
         * @param {Number} sx value, from the source image.
         * @param {Number} sy value, from the source image.
         * @param {Number} sw the width of the image to be drawn
         * @param {Number} sh the height of the image to be drawn
         * @param {Number} dx the x position to draw the image at on the screen
         * @param {Number} dy the y position to draw the image at on the screen
         * @param {Number} dw the width value to draw the image at on the screen
         * @param {Number} dh the height value to draw the image at on the screen
         */
        api.drawImage = function (image, sx, sy, sw, sh, dx, dy, dw, dh) {
            if (typeof textures[image.src] === "undefined") {
                var texture = new kami.Texture(this.context);
                texture.setFilter(kami.Texture.Filter.LINEAR);
                texutre.create();
                texture.uploadImage(image);
            }
            this.context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
        };

        /**
         * return a reference to the screen canvas
         * @name getScreenCanvas
         * @memberOf me.WebGLRenderer
         * @function
         * @return {Canvas}
         */
        api.getScreenCanvas = function () {
            return canvas;
        };

        /**
         * return a reference to the screen canvas corresponding WebGL Context<br>
         * @name getScreenContext
         * @memberOf me.WebGLRenderer
         * @function
         * @return {WebGLContext}
         */
        api.getScreenContext = function () {
            return gl;
        };

        api.getHeight = function () {
            return this.context.height;
        };

        /**
         * return a reference to the system canvas
         * @name getSystemCanvas
         * @memberOf me.WebGLRenderer
         * @function
         * @return {Canvas}
         */
        api.getSystemCanvas = function () {
            return canvas;
        };

        /**
         * Returns the WebGLContext instance for the renderer
         * @name getSystemContext
         * @memberOf me.WebGLRenderer
         * @function
         * @return {Context2d}
         */
        api.getSystemContext = function () {
            return gl;
        };

        api.getWidth = function () {
            return this.context.width;
        };

        /**
         * return the current global alpha
         * @name globalAlpha
         * @memberOf me.WebGLRenderer
         * @function
         * @return {Number}
         */
        api.globalAlpha = function () {
            return this.globalAlpha;
        };

        api.resize = function (scaleX, scaleY) {
            canvas = this.context.view;
            var gameWidthZoom = canvas.width * scaleX;
            var gameHeightZoom = canvas.height * scaleY;
            this.context.resize(gameWidthZoom, gameHeightZoom);
            // adjust CSS style for High-DPI devices
            if (me.device.getPixelRatio() > 1) {
                canvas.style.width = (canvas.width / me.device.getPixelRatio()) + "px";
                canvas.style.height = (canvas.height / me.device.getPixelRatio()) + "px";
            }
        };

        return api;
    })();

})();