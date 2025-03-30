"use client";

import React from 'react';

interface NavigationButtonsProps {
  backUrl?: string;
  nextUrl?: string;
  onSubmit?: () => void;
  disableNext?: boolean;
  submitLabel?: string;
}

export default function NavigationButtons({
  nextUrl,
  onSubmit,
  disableNext = false,
  submitLabel = 'Tallenna'
}: NavigationButtonsProps) {
  return (
    <div className="flex justify-between mt-8">
      <div></div>
      
      {onSubmit ? (
        <button
          onClick={onSubmit}
          disabled={disableNext}
          className={`px-4 py-2 rounded transition-colors ${
            disableNext
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {submitLabel}
        </button>
      ) : (
        <button
          onClick={() => {
            if (!disableNext && nextUrl) {
              window.location.href = nextUrl;
            }
          }}
          disabled={disableNext}
          className={`px-4 py-2 rounded transition-colors ${
            disableNext
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Seuraava
        </button>
      )}
    </div>
  );
}