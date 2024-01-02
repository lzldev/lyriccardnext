'use client'
import { useArtistImageStore } from '../stores/ArtistImageStore'

const ImagePicker = () => {
  const { result, pickImage } = useArtistImageStore((s) => ({
    selected: s.selected,
    result: s.result,
    pickImage: s.pickImage,
  }))

  if (!result) {
    return <></>
  }

  return (
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
    </div>
  )
}

export { ImagePicker }
