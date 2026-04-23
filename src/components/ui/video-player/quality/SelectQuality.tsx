'use client';

import cn from 'clsx';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';

import { VIDEO_QUALITIES } from '@/ui/video-player/quality/quality.data';
import type { EnumVideoPlayerQuality } from '@/ui/video-player/video-player.types';

import { useOutside } from '@/hooks/useOutside';

interface Props {
  currentValue: EnumVideoPlayerQuality;
  onChange: (quality: EnumVideoPlayerQuality) => void;
  maxResolution: EnumVideoPlayerQuality;
}

export function SelectQuality({ currentValue, onChange, maxResolution }: Props) {
  const { ref, setIsShow, isShow } = useOutside(false);

  const availableQualities = VIDEO_QUALITIES.slice(VIDEO_QUALITIES.indexOf(maxResolution));

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
            className='absolute right-0 bottom-[145%] z-10 rounded bg-gray-800 px-4 py-2 shadow'
          >
            {availableQualities.map((quality) => (
              <li
                key={quality}
                className='mb-1'
              >
                <button
                  onClick={() => {
                    onChange(quality);
                    setIsShow(false);
                  }}
                  className={cn('border-b border-b-transparent transition-colors', {
                    'cursor-pointer hover:text-primary': quality !== currentValue,
                    'cursor-auto border-b-white': quality === currentValue,
                  })}
                  disabled={quality === currentValue}
                >
                  {quality}
                </button>
              </li>
            ))}
          </m.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
