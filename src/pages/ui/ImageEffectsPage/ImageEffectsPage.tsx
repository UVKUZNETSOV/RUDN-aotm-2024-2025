import { ChangeEvent, useRef, useState } from 'react';

import { Slider } from '@/shared/ui/Slider';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';

import { DownloadIcon } from '@radix-ui/react-icons';

export const ImageEffectsPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const originalImageData = useRef<ImageData | null>(null);

  const [defaultValue, setDefaultValue] = useState<string>('');

  const [effects, setEffects] = useState({
    sepia: 0,
    contrast: 0,
    curvature: 0,
  });

  const loadImage = () => {
    if (!canvasRef.current) {
      return;
    }

    const ctx = canvasRef.current.getContext('2d');

    if (!ctx) {
      return;
    }

    const img = new Image();

    img.src = defaultValue;

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
    if (!canvasRef.current || !originalImageData.current) {
      return;
    }

    const ctx = canvasRef.current.getContext('2d');

    if (!ctx) {
      return;
    }

    const canvas = canvasRef.current;
    const width = canvas.width;
    const height = canvas.height;

    const tempCanvas = document.createElement('canvas');

    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext('2d');

    if (!tempCtx) {
      return;
    }

    tempCtx.putImageData(originalImageData.current, 0, 0);

    const resultImageData = ctx.createImageData(width, height);

    const curvatureStrength = effects.curvature / 50;
    const sepiaIntensity = effects.sepia / 100;
    const contrastFactor =
      (259 * (effects.contrast + 255)) / (255 * (259 - effects.contrast));

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const nx = (x / width) * 2 - 1;
        const ny = (y / height) * 2 - 1;

        const r = Math.sqrt(nx * nx + ny * ny);
        const factor = 1 / (1 + curvatureStrength * r);

        const sourceX = Math.floor(((nx * factor + 1) * width) / 2);
        const sourceY = Math.floor(((ny * factor + 1) * height) / 2);

        if (
          sourceX >= 0 &&
          sourceX < width &&
          sourceY >= 0 &&
          sourceY < height
        ) {
          const targetIndex = (y * width + x) * 4;
          const sourceIndex = (sourceY * width + sourceX) * 4;

          // eslint-disable-next-line no-shadow
          let r = originalImageData.current.data[sourceIndex];
          let g = originalImageData.current.data[sourceIndex];
          let b = originalImageData.current.data[sourceIndex];

          r = contrastFactor * (r - 128) + 128;
          g = contrastFactor * (g - 128) + 128;
          b = contrastFactor * (b - 128) + 128;

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

  const uploadPicture = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setDefaultValue(reader.result);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const downloadImage = () => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const link = document.createElement('a');

    link.href = canvas.toDataURL('image/png');
    link.download = 'modified-image.png';
    link.click();
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
    <div className="w-screen h-screen flex justify-center items-center gap-32">
      <div className="relative order-2 flex justify-center items-center">
        {imageLoaded && (
          <div className="absolute opacity-0 transition-all hover:bg-black/30 hover:opacity-100 w-full h-full p-2 flex items-center justify-center">
            <Button
              variant="outline"
              className="bg-transparent text-white hover:bg-inherit hover:text-white"
              onClick={downloadImage}
            >
              <DownloadIcon />
              Download Image
            </Button>
          </div>
        )}
        <canvas
          className="border"
          width="600"
          height="600"
          ref={canvasRef}
        ></canvas>
      </div>
      <div className="flex flex-col gap-7 mt-7 w-64">
        <div className="flex flex-col gap-3">
          <h1 className="font-bold">Sepia Effect</h1>
          <Slider
            onValueChange={handleSepiaChange}
            defaultValue={[0]}
            max={100}
            step={1}
          />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-bold">Contrast Effect</h1>
          <Slider
            onValueChange={handleContrastChange}
            defaultValue={[0]}
            max={100}
            step={1}
          />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-bold">Curvature Effect</h1>
          <Slider
            onValueChange={handleCurvatureChange}
            defaultValue={[0]}
            max={100}
            step={1}
          />
        </div>
        <div className="cursor-pointer">
          <Input onChange={uploadPicture} type="file" />
        </div>
        <Button onClick={loadImage}>Load Image</Button>
      </div>
    </div>
  );
};
