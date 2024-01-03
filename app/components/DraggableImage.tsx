/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'

import Image, { ImageProps } from 'next/image'
import { useRef, useState, useEffect, memo } from 'react'
import { flushSync } from 'react-dom'

type DraggableImageProps = ImageProps

const DraggableImage = (props: DraggableImageProps) => {
  const imgRef = useRef<HTMLImageElement>(null)
  const dragging = useRef(false)

  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!imgRef.current) return
    const el = imgRef.current

    const listener = (e: WheelEvent) => {
      e.stopImmediatePropagation()
      e.stopPropagation()
      e.preventDefault()

      const w = el.style.width
      const nw = parseInt(w.substring(0, w.length - 1))
      const isUp = e.deltaY < 0

      flushSync(() => {
        el.style.width = `${isUp ? nw + 2 : Math.max(nw - 2, 0)}%`
      })
    }

    el.addEventListener('wheel', listener, {
      passive: false,
    })
    return () => {
      el.removeEventListener('wheel', listener)
    }
  }, [imgRef])

  return (
    <Image
      ref={imgRef}
      draggable={false}
      onMouseDown={() => {
        dragging.current = true
      }}
      onMouseUp={() => {
        dragging.current = false
      }}
      onMouseLeave={() => {
        dragging.current = false
      }}
      onMouseMove={(evt) => {
        if (dragging.current === false) {
          return
        }

        const el = imgRef.current!
        //The absolute relative container is 2 DIVs up
        //TODO: Add Ref prop for that
        const parent = el.parentElement!.parentElement!

        const { offsetLeft, offsetTop } = parent
        const { width, height } = evt.currentTarget

        const offsetX = offsetLeft + width / 2
        const offsetY = offsetTop + height / 2

        setPos({ x: evt.pageX - offsetX, y: evt.pageY - offsetY })
      }}
      style={{ width: '100%', left: pos.x, top: pos.y }}
      {...props}
    />
  )
}

const DraggableImageMemoized = memo(DraggableImage, (prev, next) => {
  if (prev.className !== next.className) {
    return false
  } else if (prev.src !== next.src || prev.alt !== next.alt) {
    return false
  }

  return true
})

export { DraggableImageMemoized as DraggableImage }
