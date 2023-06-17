import clsx from 'clsx'
import { SpotifyArtist } from '../api/search/spotifyParser'

type ComponentProp = {
  artist: SpotifyArtist
  square?: boolean
}
const LyricCard = ({ artist, square }: ComponentProp) => {
  return (
    <div
      style={{ backgroundImage: `url(${artist.images[0].url})` }}
      className={clsx(
        'bg-pink-500 flex flex-col',
        square ? 'h-[30rem] w-[30rem]' : 'h-[20rem] w-[30rem]' //TODO: use correct aspect ratios in this
      )}
    >
      <div className='grow justify-end flex text-xl flex-col'>
        <p contentEditable className='p-4 bg-transparent'>
          Click to edit <br />
          Press enter to insert new lines
          <br />
          Or just paste some text
        </p>
      </div>
      <div className='p-4 self-end bg-black w-full border-t-2'>
        {artist.name}, <span contentEditable>{`"SONG NAME"`}</span>
      </div>
    </div>
  )
}

export { LyricCard }
