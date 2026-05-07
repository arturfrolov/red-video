import { Volume1, Volume2, VolumeX } from 'lucide-react';

interface Props {
  value: number;
  isMuted: boolean;
  changeVolume: (value: number) => void;
  toggleMute: () => void;
}

export function VolumeControl({ isMuted, toggleMute, value, changeVolume }: Props) {
  return (
    <div className='flex items-center gap-2'>
      <button
        onClick={toggleMute}
        className='cursor-pointer transition-colors hover:text-primary'
        aria-label='Mute'
      >
        {isMuted ? <VolumeX /> : value < 0.4 ? <Volume1 /> : <Volume2 />}
      </button>
      <input
        type='range'
        min={0}
        max={1}
        step={0.05}
        value={value}
        onChange={(e) => changeVolume(parseFloat(e.target.value))}
        className='volume-slider h-[0.2rem] w-14 cursor-pointer appearance-none rounded-lg bg-white
          opacity-90 transition-all hover:opacity-100'
        style={{
          background: `linear-gradient(to right, white, ${value * 100}%, rgba(255, 255, 255, 0.2) ${value * 100}%)`,
        }}
      />
    </div>
  );
}
