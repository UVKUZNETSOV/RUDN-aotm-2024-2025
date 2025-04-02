import { useRef, useState } from "react";

import { Slider } from "@/shared/ui/Slider/slider";
import { Button } from "@/shared/ui/Button/button";

import image from "@/shared/assets/189519-2.png";

export const ImageEffectsPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const originalImageData = useRef<ImageData | null>(null);

  const [effects, setEffects] = useState({
    sepia: 0,
    contrast: 0,
    curvature: 0,
  });

  const loadImage = () => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");

    if (!ctx) return;

    const img = new Image();

    img.src = image;

    img.onload = () => {
      ctx.drawImage(
        img,
        0,
        0,
        canvasRef.current!.width,
        canvasRef.current!.height
      );
      originalImageData.current = ctx.getImageData(
        0,
        0,
        canvasRef.current!.width,
        canvasRef.current!.height
      );
      setImageLoaded(true);
    };
  };

  const applyEffects = () => {
    if (!canvasRef.current || !originalImageData.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const canvas = canvasRef.current;
    const width = canvas.width;
    const height = canvas.height;

    // Create temporary canvas for hyperbolic effect
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;

    // Draw original image to temp canvas
    tempCtx.putImageData(originalImageData.current, 0, 0);

    // Create new ImageData for final result
    const resultImageData = ctx.createImageData(width, height);

    const curvatureStrength = effects.curvature / 50; // Adjust strength factor
    const sepiaIntensity = effects.sepia / 100;
    const contrastFactor =
      (259 * (effects.contrast + 255)) / (255 * (259 - effects.contrast));

    // Apply hyperbolic distortion
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Calculate normalized coordinates
        const nx = (x / width) * 2 - 1;
        const ny = (y / height) * 2 - 1;

        // Apply hyperbolic transformation
        const r = Math.sqrt(nx * nx + ny * ny);
        const factor = 1 / (1 + curvatureStrength * r);

        // Get source coordinates
        const sourceX = Math.floor(((nx * factor + 1) * width) / 2);
        const sourceY = Math.floor(((ny * factor + 1) * height) / 2);

        // Bounds checking
        if (
          sourceX >= 0 &&
          sourceX < width &&
          sourceY >= 0 &&
          sourceY < height
        ) {
          const targetIndex = (y * width + x) * 4;
          const sourceIndex = (sourceY * width + sourceX) * 4;

          // Get pixel data from original image
          let r = originalImageData.current.data[sourceIndex];
          let g = originalImageData.current.data[sourceIndex];
          let b = originalImageData.current.data[sourceIndex];

          // Apply contrast
          r = contrastFactor * (r - 128) + 128;
          g = contrastFactor * (g - 128) + 128;
          b = contrastFactor * (b - 128) + 128;

          // Apply sepia
          const tr = 0.393 * r + 0.769 * g + 0.189 * b;
          const tg = 0.349 * r + 0.686 * g + 0.168 * b;
          const tb = 0.272 * r + 0.534 * g + 0.131 * b;

          resultImageData.data[targetIndex] =
            r * (1 - sepiaIntensity) + tr * sepiaIntensity;
          resultImageData.data[targetIndex + 1] =
            g * (1 - sepiaIntensity) + tg * sepiaIntensity;
          resultImageData.data[targetIndex + 2] =
            b * (1 - sepiaIntensity) + tb * sepiaIntensity;
          resultImageData.data[targetIndex + 3] = 255;
        }
      }
    }

    ctx.putImageData(resultImageData, 0, 0);
  };

  const handleContrastChange = (value: number[]) => {
    setEffects((prev) => ({ ...prev, contrast: value[0] }));
    applyEffects();
  };

  const handleSepiaChange = (value: number[]) => {
    setEffects((prev) => ({ ...prev, sepia: value[0] }));
    applyEffects();
  };

  const handleCurvatureChange = (value: number[]) => {
    setEffects((prev) => ({ ...prev, curvature: value[0] }));
    applyEffects();
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <canvas
        className="border"
        width="800"
        height="600"
        ref={canvasRef}
      ></canvas>
      <div className="flex flex-col gap-7 mt-7 w-64">
        <div>
          <h1 className="font-bold">Sepia</h1>
          <Slider
            onValueChange={handleSepiaChange}
            defaultValue={[0]}
            max={100}
            step={1}
          />
        </div>
        <div>
          <h1 className="font-bold">Contrast</h1>
          <Slider
            onValueChange={handleContrastChange}
            defaultValue={[0]}
            max={100}
            step={1}
          />
        </div>
        <div>
          <h1 className="font-bold">Curvature</h1>
          <Slider
            onValueChange={handleCurvatureChange}
            defaultValue={[0]}
            max={100}
            step={1}
          />
        </div>
        {!imageLoaded && <Button onClick={loadImage}>Load Image</Button>}
      </div>
    </div>
  );
};
