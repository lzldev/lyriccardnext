/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'

import { useRef, type HTMLAttributes, useState, useEffect } from 'react'
import { flushSync } from 'react-dom'

type DraggableImageProps = React.ImgHTMLAttributes<any>

export const DraggableImage = (props: DraggableImageProps) => {
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

      if (e.deltaY < 0) {
        flushSync(() => {
          el.width += 10
          el.width += 10
          setPos((old) => ({ x: old.x - 10, y: old.y - 10 }))
        })
      } else if (e.deltaY > 0) {
        flushSync(() => {
          el.width -= 10
          el.width -= 10
          setPos((old) => ({ x: old.x + 10, y: old.y + 10 }))
        })
      }
    }

    el.addEventListener('wheel', listener, {
      passive: false,
    })
    return () => {
      el.removeEventListener('wheel', listener)
    }
  }, [imgRef])

  return (
    <img
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
        const parent = el.parentElement!

        const { offsetLeft, offsetTop } = parent
        const { width, height } = evt.currentTarget

        const offsetX = offsetLeft + width / 2
        const offsetY = offsetTop + height / 2

        setPos({ x: evt.pageX - offsetX, y: evt.pageY - offsetY })
      }}
      style={{ left: pos.x, top: pos.y }}
      {...props}
    />
  )
}
