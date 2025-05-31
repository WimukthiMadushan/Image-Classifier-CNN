import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  onImageUpload: (file:File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  };

  const openFileSelector = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
          transition-all duration-300 group
          ${dragActive 
            ? 'border-blue-500 bg-blue-50/50 scale-105' 
            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/30'
          }
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFileSelector}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleChange}
          accept="image/*"
        />
        
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className={`
              p-4 rounded-full transition-all duration-300
              ${dragActive 
                ? 'bg-blue-100 scale-110' 
                : 'bg-gray-100 group-hover:bg-blue-100 group-hover:scale-110'
              }
            `}>
              {dragActive ? (
                <ImageIcon className="h-8 w-8 text-blue-600" />
              ) : (
                <Upload className="h-8 w-8 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
              )}
            </div>
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-700 mb-2">
              {dragActive ? 'Drop your image here!' : 'Drop your image here or click to browse'}
            </p>
            <p className="text-sm text-gray-500">
              Supports JPG, PNG, GIF up to 10MB
            </p>
          </div>
          
          <Button 
            type="button"
            variant="outline"
            className="mt-4 border-blue-300 text-blue-600 hover:bg-blue-50 transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              openFileSelector();
            }}
          >
            Choose File
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
