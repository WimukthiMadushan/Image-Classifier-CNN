import React from 'react';
import { Dog, Cat, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface PredictionResultProps {
  prediction: {
    class: 'cat' | 'dog';
    confidence: number;
  } | null;
  isLoading: boolean;
}

const PredictionResult: React.FC<PredictionResultProps> = ({ prediction, isLoading }) => {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="relative">
          <div className="w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Analyzing Image...</h3>
          <p className="text-gray-500">Our AI is processing your image</p>
          
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!prediction) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <Sparkles className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Ready to Analyze</h3>
        <p className="text-gray-500">Upload an image to get started with AI classification</p>
      </div>
    );
  }

  const confidencePercentage = Math.round(prediction.confidence);
  const isDog = prediction.class === 'dog';

  return (
    <div className="text-center">
      <div className="mb-8">
        <div className={`
          w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center
          transition-all duration-500 transform scale-110
          ${isDog ? 'bg-gradient-to-br from-amber-100 to-orange-100' : 'bg-gradient-to-br from-pink-100 to-purple-100'}
        `}>
          {isDog ? (
            <Dog className="h-10 w-10 text-amber-600 animate-pulse" />
          ) : (
            <Cat className="h-10 w-10 text-pink-600 animate-pulse" />
          )}
        </div>
        
        <h3 className="text-3xl font-bold mb-2">
          <span className={`
            ${isDog ? 'text-amber-600' : 'text-pink-600'}
          `}>
            {isDog ? '🐕 Dog' : '🐱 Cat'}
          </span>
        </h3>
        
        <p className="text-lg text-gray-600">
          Detected with {confidencePercentage}% confidence
        </p>
      </div>

      <div className="space-y-4">
        <div className="text-left">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Confidence Score</span>
            <span className="text-sm font-bold text-gray-900">{confidencePercentage}%</span>
          </div>
          <Progress 
            value={confidencePercentage} 
            className="h-3"
          />
        </div>

        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">
              <strong>Classification:</strong> This image shows a {prediction.class} with 
              <strong className={isDog ? 'text-amber-600' : 'text-pink-600'}>
                {' '}{confidencePercentage}% certainty
              </strong>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 text-xs text-gray-500">
        Powered by advanced deep learning neural networks
      </div>
    </div>
  );
};

export default PredictionResult;
