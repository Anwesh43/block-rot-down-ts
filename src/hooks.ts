import {useState, useEffect, CSSProperties} from 'react'

export const useAnimatedScale = (scGap : number = 0.01 , delay : number = 20) => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) => {
                        if (prev > 1) {
                            setAnimated(false)
                            return 0 
                        }
                        return prev += scGap 
                    })
                }, delay)
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        return () => {
            window.onresize = () => {

            }
        }
    }, [])
    return {
        w, 
        h 
    }
}

const sinify : (a : number) => number = (scale : number) : number => Math.sin(scale * Math.PI)
const maxScale : (sc : number, i : number, n : number) => number = (scale : number, i : number, n : number) : number => Math.max(0, scale - i / n)
const divideScale : (sc : number, i : number, n : number) => number = (scale : number, i : number, n : number) : number => Math.min(1 / n, maxScale(scale, i, n)) * n 


export const useStyle = (w : number, h : number, scale : number) => {
    const position = 'absolute'
    const background = 'indigo'
    const size = Math.min(w, h) / 10 
    const x = w / 2
    const y = h / 2
    const sf : number = sinify(scale)
    return {
        parentStyle() : CSSProperties {
            return {
                position, 
                left: `${x}px`,
                top: `${y + (h / 2) * divideScale(sf, 1, 2)}px`,
                transform: `rotate(${90 * divideScale(sf, 0, 2)}deg)`
            }
        },

        blockStyle() : CSSProperties {
            return {
                position,
                width: `${size}px`,
                height: `${size}px`,
                background
            }
        }
    }
}
