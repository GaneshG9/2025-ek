
'use client';

import { useState, useEffect } from 'react';
import { Instagram } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Button } from '../ui/button';

const videoUrls = [
  'https://argoseyes.s3-accelerate.amazonaws.com/public/paywall/ee1130d5-c634-44bd-a7f2-9475ca5a2292.mp4',
  'https://argoseyes.s3-accelerate.amazonaws.com/public/paywall/1515228c-65cd-4bda-83b2-baf26f4ce7dd.mp4',
  'https://argoseyes.s3-accelerate.amazonaws.com/public/paywall/70286c09-ae00-4a0c-9d6f-bd44675390f9.mp4',
  'https://argoseyes.s3-accelerate.amazonaws.com/public/paywall/2c4ef04a-0278-4f23-be0b-90293e4a478b.mp4',
  'https://argoseyes.s3-accelerate.amazonaws.com/public/paywall/95821541-3b42-4633-9065-b5a25047146d.mp4',
  'https://argoseyes.s3-accelerate.amazonaws.com/public/paywall/153b66d9-1627-4487-8cf0-37c919789379.mp4',
  'https://argoseyes.s3-accelerate.amazonaws.com/public/paywall/545f5b62-3895-4b03-b8b0-c14c96ca789d.mp4',
  'https://argoseyes.s3-accelerate.amazonaws.com/public/paywall/756fd537-f061-4ae4-8b29-4dc318a71904.mp4',
  'https://argoseyes.s3-accelerate.amazonaws.com/public/paywall/be53d5e3-576b-43aa-8f28-2e5d69033d43.mp4',
  'https://argoseyes.s3-accelerate.amazonaws.com/public/paywall/30397e27-49b6-426d-ae2f-d603ee47a9e2.mp4',
  'https://argoseyes.s3-accelerate.amazonaws.com/public/paywall/99765381-824d-4d46-872f-30b552c8b7ea.mp4',
];

function VideoModal({
  isOpen,
  onOpenChange,
  videos,
  startIndex,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  videos: string[];
  startIndex: number;
}) {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (api && isOpen) {
      api.scrollTo(startIndex, true);
    }
  }, [api, isOpen, startIndex]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md h-[80vh] p-0 bg-black border-0 flex flex-col items-center justify-center">
        <Carousel setApi={setApi} className="w-full h-full relative">
          <CarouselContent>
            {videos.map((url, index) => (
              <CarouselItem key={index} className="flex items-center justify-center">
                <video
                  src={url}
                  controls
                  autoPlay
                  loop
                  playsInline
                  className="max-h-full w-auto"
                ></video>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 border-white/50" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 border-white/50" />
           <Button asChild variant="ghost" className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white hover:text-white">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-6 h-6" />
            </a>
          </Button>
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}


export function VideoReels() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  const openModal = (index: number) => {
    const actualIndex = index % videoUrls.length; // Handle duplicated array index
    setSelectedVideoIndex(actualIndex);
    setModalOpen(true);
  };
  
  const duplicatedVideos = [...videoUrls, ...videoUrls]; // Duplicate for seamless looping

  return (
    <section id="reels" className="py-16 sm:py-24 bg-secondary/50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">Property Reels</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Get a closer look at our properties with these short video tours.
          </p>
        </div>
      </div>
      <div className="relative w-full overflow-hidden group">
        <div className="flex animate-slideLeft group-hover:[animation-play-state:paused]">
          {duplicatedVideos.map((url, index) => (
            <div key={index} className="flex-shrink-0 mx-2 aspect-[9/16] h-[360px] rounded-lg overflow-hidden cursor-pointer" onClick={() => openModal(index)}>
              <video
                src={url}
                preload="auto"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              ></video>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/50 via-transparent to-secondary/50 pointer-events-none"></div>
      </div>
      <VideoModal
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        videos={videoUrls}
        startIndex={selectedVideoIndex}
      />
    </section>
  );
}
