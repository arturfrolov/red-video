interface Props {}

export function CommentActions({}: Props) {
  return (
    <div className='mt-3 flex items-center gap-3'>
      <button
        className='text-gray-400s tr cursor-pointer text-sm opacity-90 transition-opacity
          hover:opacity-100'
      >
        Edit
      </button>
      <button
        className='text-gray-400s tr cursor-pointer text-sm opacity-90 transition-opacity
          hover:opacity-100'
      >
        Delete
      </button>
    </div>
  );
}
