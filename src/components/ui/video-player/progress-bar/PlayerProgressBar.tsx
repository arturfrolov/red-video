'use client';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Tooltip from 'rc-tooltip';
import type { ReactElement } from 'react';

import { getVideoTime } from '@/ui/video-player/video-player.util';

interface IHandleProps {
  value: number;
  dragging: boolean;
  index: number;
}

const handleRender = (node: ReactElement, props: IHandleProps) => {
  const { value, index, dragging } = props;

  return (
    <Tooltip
      prefixCls='rc-slider-tooltip'
      overlay={getVideoTime(value)}
      visible={dragging}
      placement='top'
      key={index}
      classNames={{
        root: 'tooltip-simple-text z-1',
      }}
    >
      {node}
    </Tooltip>
  );
};

interface Props {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

const sliderStyles = {
  track: { backgroundColor: '#ef4444', height: 5 },
  rail: { backgroundColor: 'rgb(196 196 196 / 60%)', height: 5 },
  handle: {
    borderColor: 'transparent',
    height: 16,
    width: 16,
    backgroundColor: 'transparent',
    outline: 'none',
    boxShadow: 'none',
  },
};

export function PlayerProgressBar({ currentTime, onSeek, duration }: Props) {
  return (
    <div className='w-full'>
      <Slider
        min={0}
        max={duration}
        value={currentTime}
        onChange={(value) => {
          if (typeof value === 'number') {
            onSeek(value);
          }
        }}
        step={0.2}
        handleRender={handleRender}
        styles={sliderStyles}
      />
    </div>
  );
}
