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
    <div className='flex overflow-x-scroll gap-x-4 p-2 w-full ring-1 ring-accent'>
      {result.map((image, idx) => (
        <img
          key={image.src + idx}
          className={`size-24 cursor-pointer hover:ring-1 ring-accent-highlight`}
          src={image.src}
          alt={image.alt}
          onClick={() => pickImage(idx)}
        />
      ))}
    </div>
  )
}

export { ImagePicker }
