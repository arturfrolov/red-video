export function PlayerProgressBar({ progress }: { progress: number }) {
  return (
    <div className='absolute -top-0.5 left-0 w-full bg-gray-200'>
      <div
        style={{ width: `${progress}%` }}
        className='relative h-1 bg-primary'
      ></div>
    </div>
  );
}
