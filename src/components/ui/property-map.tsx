'use client';

import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';

interface MapProps {
  center: { lat: number; lng: number };
  zoom: number;
  address?: string;
  className?: string;
}

interface GoogleMapComponentProps extends MapProps {
  onLoad?: (map: google.maps.Map) => void;
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
  center,
  zoom,
  address,
  className,
  onLoad,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  const initMap = useCallback(() => {
    if (ref.current && !map) {
      const newMap = new window.google.maps.Map(ref.current, {
        center,
        zoom,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
        gestureHandling: 'cooperative',
        mapTypeId: 'roadmap',
      });

      // Add marker for the property location
      const marker = new window.google.maps.Marker({
        position: center,
        map: newMap,
        title: address || 'Property Location',
        animation: google.maps.Animation.DROP,
      });

      // Add info window with address
      if (address) {
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px;">
              <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">Property Location</h3>
              <p style="margin: 0; font-size: 14px;">${address}</p>
            </div>
          `,
        });

        marker.addListener('click', () => {
          infoWindow.open(newMap, marker);
        });

        // Open info window by default
        infoWindow.open(newMap, marker);
      }

      setMap(newMap);
      onLoad?.(newMap);
    }
  }, [center, zoom, address, map, onLoad]);

  useEffect(() => {
    initMap();
  }, [initMap]);

  return <div ref={ref} className={className} />;
};

const render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return (
        <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600">Loading Map...</p>
          </div>
        </div>
      );
    case Status.FAILURE:
      return (
        <div className="flex items-center justify-center h-full bg-red-50 rounded-lg border border-red-200">
          <div className="text-center p-4">
            <p className="text-red-600 font-medium">Failed to load Google Maps</p>
            <p className="text-red-500 text-sm mt-1">Please check your API key configuration</p>
          </div>
        </div>
      );
    default:
      return (
        <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
          <p className="text-gray-600">Initializing Map...</p>
        </div>
      );
  }
};

interface PropertyMapProps extends MapProps {
  apiKey?: string;
}

export const PropertyMap: React.FC<PropertyMapProps> = ({
  center,
  zoom,
  address,
  className = "w-full h-64 rounded-lg",
  apiKey,
}) => {
  const googleMapsApiKey = apiKey || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Check if API key is not configured or is demo key
  if (!googleMapsApiKey || googleMapsApiKey.includes('YOUR_API_KEY') || googleMapsApiKey.includes('Demo1234')) {
    return (
      <div className={`${className} bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700 flex items-center justify-center`}>
        <div className="text-center p-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p className="text-blue-800 dark:text-blue-200 font-medium mb-2">Interactive Map Coming Soon</p>
          <p className="text-blue-600 dark:text-blue-300 text-sm mb-3">Configure Google Maps API for full map functionality</p>
          {address && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border shadow-sm">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Property Location</p>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{address}</p>
            </div>
          )}
          <p className="text-xs text-blue-500 dark:text-blue-400 mt-3">
            Get your API key at: console.cloud.google.com
          </p>
        </div>
      </div>
    );
  }

  return (
    <Wrapper apiKey={googleMapsApiKey} render={render}>
      <GoogleMapComponent
        center={center}
        zoom={zoom}
        address={address}
        className={className}
      />
    </Wrapper>
  );
};