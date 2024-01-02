'use client'
import { useArtistImageStore } from '../stores/ArtistImageStore'
import Image from 'next/image'

const ImagePicker = () => {
  const { result, pickImage, hasNextPage, getNext, loading } =
    useArtistImageStore((s) => ({
      result: s.result,
      hasNextPage: s.hasNextPage,
      getNext: s.nextPage,
      pickImage: s.pickImage,
      loading: s.loading,
    }))

  if (!result && loading) {
    return (
      <div className='flex h-24 w-full items-center justify-center p-2 align-middle text-3xl'>
        loading...
      </div>
    )
  } else if (!result) {
    return <></>
  } else if (result.length === 0) {
    return (
      <div className='flex h-24 w-full items-center justify-center p-2 align-middle text-3xl'>
        {result.length === 0 && 'no results'}
      </div>
    )
  }

  return (
    <>
      <div className='flex w-full scroll-m-6 gap-x-4 overflow-x-scroll scroll-smooth border-x  border-t border-accent p-2'>
        {result.map((image, idx) => (
          <Image
            key={image.src + idx}
            className={
              'size-24 cursor-pointer bg-neutral-400 object-scale-down object-bottom ring-accent hover:ring-1'
            }
            src={image.src}
            alt={image.alt}
            width={170}
            height={0}
            onClick={() => pickImage(idx)}
          />
        ))}
        {loading && (
          <div
            onClick={getNext}
            className='flex size-24 min-w-24 cursor-pointer select-none flex-col items-center justify-center bg-neutral-400 align-middle text-6xl ring-1 ring-neutral-200 hover:bg-neutral-300'
          >
            SPINNER
          </div>
        )}
        {hasNextPage && (
          <div
            onClick={getNext}
            className='flex size-24 min-w-24 cursor-pointer select-none flex-col items-center justify-center bg-neutral-400 align-middle text-6xl ring-1 ring-accent hover:bg-neutral-300'
          >
            +
          </div>
        )}
      </div>
    </>
  )
}

export { ImagePicker }
