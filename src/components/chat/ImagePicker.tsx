"use client";

import { useRef } from "react";
import { X } from "lucide-react";

type ImagePickerProps = {
  images: string[];
  setImages: (imgs: string[]) => void;
};

export function ImagePicker({ images, setImages }: ImagePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handlePick() {
    inputRef.current?.click();
  }

  function handleFiles(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files) return;

    const newImages = [...images];

    for (let i = 0; i < files.length; i++) {
      const fileURL = URL.createObjectURL(files[i]);
      newImages.push(fileURL);
    }

    setImages(newImages);
  }

  function removeImage(index: number) {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFiles}
      />

      <div className="flex gap-2 flex-wrap">
        {images.map((src, index) => (
          <div
            key={index}
            className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-300"
          >
            <img src={src} alt="preview" className="w-full h-full object-cover" />


            <button
              className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full"
              onClick={() => removeImage(index)}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handlePick}
        className="px-3 py-1 bg-white text-sm rounded-lg shadow hover:bg-gray-100"
      >
        Adicionar imagens
      </button>
    </div>
  );
}
