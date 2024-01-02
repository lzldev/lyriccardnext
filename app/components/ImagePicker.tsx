'use client'
import { useArtistImageStore } from '../stores/ArtistImageStore'

const ImagePicker = () => {
  const { result, pickImage, page, hasNextPage, getNext } = useArtistImageStore(
    (s) => ({
      result: s.result,
      page: s.page,
      hasNextPage: s.hasNextPage,
      getNext: s.nextPage,
      pickImage: s.pickImage,
    }),
  )

  if (!result) {
    return <></>
  }

  return (
    <>
      <div className='flex w-full gap-x-4 overflow-x-scroll p-2 ring-1 ring-accent'>
        {result.map((image, idx) => (
          <img
            key={image.src + idx}
            className={`size-24 cursor-pointer ring-accent-highlight hover:ring-1`}
            src={image.src}
            alt={image.alt}
            onClick={() => pickImage(idx)}
          />
        ))}
        {hasNextPage && (
          <div
            onClick={getNext}
            className='flex size-24 min-w-24 cursor-pointer select-none flex-col items-center justify-center bg-neutral-400 align-middle text-6xl ring-1 ring-neutral-200 hover:bg-neutral-300'
          >
            +
          </div>
        )}
      </div>
      <div className='flex w-full justify-end align-middle tracking-tighter text-accent'>
        <span className='text-white'>{page}</span>
      </div>
    </>
  )
}

export { ImagePicker }
