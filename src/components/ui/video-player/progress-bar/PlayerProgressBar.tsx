export function PlayerProgressBar({ progress }: { progress: number }) {
  return (
    <div className='w-full bg-gray-200/80'>
      <div
        style={{ width: `${progress}%` }}
        className='h-1 bg-primary'
      ></div>
    </div>
  );
}
