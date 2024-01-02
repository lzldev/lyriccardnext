export const validHEX = (hex: string) => {
  if (hex.length !== 7) return false
  if (hex[0] !== '#') return false

  for (const c of hex.toLowerCase().substring(1)) {
    if (!'0123456789abcdef'.includes(c)) return false
  }
  return true
}

type HSLValue = [hue: number, saturation: number, lightness: number]

export const rgbToHsl = (rgbHex: string): HSLValue => {
  const hex = validHEX(rgbHex) ? rgbHex.toLowerCase() : '#ffffff'

  const r = parseInt(hex.substring(1, 3), 16)
  const g = parseInt(hex.substring(3, 5), 16)
  const b = parseInt(hex.substring(5, 7), 16)

  const min = Math.min(r, g, b)
  const max = Math.max(r, g, b)

  if (max === min) {
    return [0, 0, (max + min) / 2 / 255]
  }

  const chroma = max - min

  let lightness = (max + min) / 2
  const saturation = Math.abs(chroma / (1 - Math.abs(2 * lightness - 1)))
  lightness /= 255

  const hue = (() => {
    switch (max) {
      case r:
        const segment = (g - b) / chroma
        const shift = segment < 0 ? 360 / 60 : 0 / 60
        return segment + shift
      case g:
        const segment2 = (b - r) / chroma
        const shift2 = 120 / 60
        return segment2 + shift2
      case b:
        const segment3 = (r - g) / chroma
        const shift3 = 240 / 60
        return segment3 + shift3
      default:
        throw 'invalid max'
    }
  })()

  return [Math.round(hue * 60), saturation, lightness]
}

const rgbLightness = (hex: string) => {
  const h2 = validHEX(hex) ? hex.toLowerCase() : '#ffffff'

  const r = parseInt(h2.substring(1, 3), 16)
  const g = parseInt(h2.substring(3, 5), 16)
  const b = parseInt(h2.substring(5, 7), 16)

  const min = Math.min(r, g, b)
  const max = Math.max(r, g, b)

  return (max + min) / 2 / 255
}

export const isDark = (color: string) => {
  return rgbLightness(color) < 0.5
}

export const isLight = (color: string) => {
  const c = rgbToHsl(color)
  return rgbLightness(color) > 0.5
}
