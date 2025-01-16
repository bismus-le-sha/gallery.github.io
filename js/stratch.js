class ImageManager {
  constructor(hiddenImageId, canvasClassName) {
    this.hiddenImage = document.getElementById(hiddenImageId);
    this.canvas = document.querySelector(`.${canvasClassName}`);
    this.ctx = this.canvas.getContext("2d");
  }

  initialize(onLoadCallback) {
    this.hiddenImage.onload = () => {
      this.resizeCanvas();
      onLoadCallback();
    };
  }

  resizeCanvas() {
    const container = document.getElementById("canvas-container");
    container.style.width = `${this.hiddenImage.width}px`;
    container.style.height = `${this.hiddenImage.height}px`;
    this.canvas.width = this.hiddenImage.width;
    this.canvas.height = this.hiddenImage.height;
  }

  drawTopLayer(imageSrc) {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
    };
  }
}

class DrawingManager {
  constructor(canvasClassName) {
    this.canvas = document.querySelector(`.${canvasClassName}`);
    this.ctx = this.canvas.getContext("2d");
    this.isDrawing = false;
  }

  initialize() {
    this.attachEventListeners();
  }

  startDrawing(event) {
    this.isDrawing = true;
    this.draw(event);
  }

  stopDrawing() {
    this.isDrawing = false;
    this.ctx.beginPath();
  }

  draw(event) {
    if (!this.isDrawing) return;

    const rect = this.canvas.getBoundingClientRect();
    const x = (event.clientX || event.touches[0]?.clientX) - rect.left;
    const y = (event.clientY || event.touches[0]?.clientY) - rect.top;

    this.ctx.globalCompositeOperation = "destination-out";
    this.ctx.beginPath();
    this.ctx.arc(x, y, 20, 0, Math.PI * 2, false);
    this.ctx.fill();
  }

  attachEventListeners() {
    this.canvas.addEventListener("mousedown", (e) => this.startDrawing(e));
    this.canvas.addEventListener("mousemove", (e) => this.draw(e));
    this.canvas.addEventListener("mouseup", () => this.stopDrawing());
    this.canvas.addEventListener("mouseout", () => this.stopDrawing());

    this.canvas.addEventListener("touchstart", (e) => this.startDrawing(e));
    this.canvas.addEventListener("touchmove", (e) => this.draw(e));
    this.canvas.addEventListener("touchend", () => this.stopDrawing());
  }
}

class ScratchImage {
  constructor(hiddenImageId, canvasId) {
    this.imageManager = new ImageManager(hiddenImageId, canvasId);
    this.drawingManager = new DrawingManager(canvasId);
  }

  start() {
    this.imageManager.initialize(() => {
      this.imageManager.drawTopLayer("images/top.jpg");
      this.drawingManager.initialize();
    });
  }
}

const stratch_image = new ScratchImage("hiddenImage", "scratch-canvas");
stratch_image.start();
