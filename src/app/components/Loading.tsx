
import React from 'react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500 border-opacity-75"></div>
      <span className="ml-4 text-purple-700 font-semibold">Loading...</span>
    </div>
  );
}
