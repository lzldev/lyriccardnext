/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'

import Image, { ImageProps } from 'next/image'
import { useRef, useState, useEffect, memo, useCallback } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'

type DraggableImageProps = ImageProps

const DraggableImage = (props: DraggableImageProps) => {
  const imgRef = useRef<HTMLImageElement>(null)
  const dragging = useRef(false)

  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!imgRef.current) return
    const el = imgRef.current

    const listener = (evt: WheelEvent) => {
      evt.stopImmediatePropagation()
      evt.stopPropagation()
      evt.preventDefault()

      const isUp = evt.deltaY < 0
      const offsetMul = isUp ? -1 : 1
      const offset = 4 * offsetMul

      const w = el.style.width
      const width = parseInt(w.substring(0, w.length - 1))

      const left = parseInt(
        el.style.left.substring(0, el.style.left.length - 2),
      )
      const top = parseInt(el.style.top.substring(0, el.style.top.length - 2))

      el.style.width = `${Math.max(width - offset, 0)}%`
      el.style.top = `${top + offset}px`
      el.style.left = `${left + offset}px`
    }

    //React does not support adding a listener as passive.
    el.addEventListener('wheel', listener, {
      passive: false,
    })
    return () => {
      el.removeEventListener('wheel', listener)
    }
  }, [imgRef])

  const dragCallback = useCallback(
    (evt: ReactMouseEvent<HTMLImageElement, MouseEvent>) => {
      if (dragging.current === false || !evt.currentTarget) {
        return
      }

      const left = parseInt(evt.currentTarget.style.left) ?? 0
      const top = parseInt(evt.currentTarget.style.top) ?? 0

      //Doing this outside react makes it faster :)
      evt.currentTarget.style.left = `${left + evt.movementX}px`
      evt.currentTarget.style.top = `${top + evt.movementY}px`
    },
    [],
  )

  return (
    <Image
      ref={imgRef}
      style={{ width: '100%', left: pos.x, top: pos.y }}
      onMouseMove={dragCallback}
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
