'use client';
import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Camera, Sparkles, Dog, Cat, RotateCcw } from 'lucide-react';
import ImageUpload from '@/components/ui/ImageUpload';
import PredictionResult from '@/components/ui/PredictionResult';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showUpload, setShowUpload] = useState(true);
  const [prediction, setPrediction] = useState<{
    class: 'cat' | 'dog';
    confidence: number;
  } | null>(null);

  const handleImageUpload = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowUpload(false);
    setPrediction(null);
  };

  const handleUploadNext = () => {
    setShowUpload(true);
    setSelectedImage(null);
    setPrediction(null);
  };

  const classifyImage = async () => {

  };
  
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-purple-600 animate-pulse" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Pet Vision AI
            </h1>
            <Sparkles className="h-8 w-8 text-blue-600 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload an image and let our advanced deep learning model identify whether it's a cat or dog with incredible accuracy!
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Upload Section */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-xl bg-white/80 backdrop-blur-sm h-full">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="text-center mb-6">
                  <Camera className="h-12 w-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload Your Image</h2>
                  <p className="text-gray-600">Choose a clear photo of a cat or dog</p>
                </div>
                
                <div className="flex-1 flex flex-col">
                  {showUpload ? (
                    <ImageUpload onImageUpload={handleImageUpload} />
                  ) : (
                    <div className="space-y-4">
                      <div className="relative group">
                        <img 
                          src={selectedImage!} 
                          alt="Selected" 
                          className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      
                      <Button 
                        onClick={classifyImage}
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-3"
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Analyzing...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5" />
                            Classify Image
                          </div>
                        )}
                      </Button>

                      <Button 
                        onClick={handleUploadNext}
                        variant="outline"
                        className="w-full border-blue-300 text-blue-600 hover:bg-blue-50 transition-all duration-300"
                      >
                        <div className="flex items-center gap-2">
                          <RotateCcw className="h-4 w-4" />
                          Upload Next Image
                        </div>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-xl bg-white/80 backdrop-blur-sm h-full">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Dog className="h-6 w-6 text-amber-600" />
                    <Cat className="h-6 w-6 text-pink-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Prediction Results</h2>
                  <p className="text-gray-600">AI-powered classification results</p>
                </div>

                <div className="flex-1 flex items-center justify-center">
                  <PredictionResult 
                    prediction={prediction}
                    isLoading={isLoading}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Features Section */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Sparkles,
                title: "High Accuracy",
                description: "Our model achieves 99%+ accuracy on pet classification"
              },
              {
                icon: Upload,
                title: "Easy Upload",
                description: "Simple drag-and-drop interface for quick image analysis"
              },
              {
                icon: Camera,
                title: "Instant Results",
                description: "Get predictions in seconds with confidence scores"
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/60 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <feature.icon className="h-10 w-10 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
