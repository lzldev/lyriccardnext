import { useEffect, useState } from "react"


type LoadingTextProps = {
  maxDots?:number,
  text?:string
  timeout?:number
}

export const LoadingText = (props:LoadingTextProps) => {
  const [dots,setDots] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => (d+1)% (props.maxDots ?? 3))
    },props.timeout ?? 250)

    return () => {
      clearInterval(interval)
    }
  },[props.maxDots,props.timeout])

  return <span>
    {props.text ?? 'loading'}{`.`.repeat(dots)}
  </span>
}
