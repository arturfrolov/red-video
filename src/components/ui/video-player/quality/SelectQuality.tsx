'use client';

import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';

import { VIDEO_QUALITIES } from '@/ui/video-player/quality/quality.data';
import type { EnumVideoPlayerQuality } from '@/ui/video-player/video-player.types';

import { useOutside } from '@/hooks/useOutside';

interface Props {
  currentValue: EnumVideoPlayerQuality;
  onChange: (quality: EnumVideoPlayerQuality) => void;
}

export function SelectQuality({ currentValue, onChange }: Props) {
  const { ref, setIsShow, isShow } = useOutside(false);

  return (
    <div
      className='relative'
      ref={ref}
    >
      <button
        className='cursor-pointer transition-colors hover:text-primary'
        onClick={() => setIsShow(!isShow)}
      >
        {currentValue}
      </button>

      <AnimatePresence>
        {isShow && (
          <m.ul
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className='absolute right-0 bottom-full z-10 rounded bg-white/10 px-4 py-2 shadow'
          >
            {VIDEO_QUALITIES.map((quality) =>
              quality === currentValue ? null : (
                <li
                  key={quality}
                  className='mb-1'
                >
                  <button
                    onClick={() => {
                      onChange(quality);
                      setIsShow(false);
                    }}
                    className='cursor-pointer transition-colors hover:text-primary'
                  >
                    {quality}
                  </button>
                </li>
              )
            )}
          </m.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
