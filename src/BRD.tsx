import withContext from "./withContext";
import {useStyle} from './hooks'
import React from 'react'

interface BRDProps {
    w : number, 
    h : number, 
    scale : number, 
    onClick : () => void
}
const BRD = (props : BRDProps) => {
    const {parentStyle, blockStyle} = useStyle(props.w, props.h, props.scale)
    return (
        <div style = {parentStyle()} onClick = {() => props.onClick()}>
            <div style = {blockStyle()}></div>
        </div>
    )
}

export default withContext(BRD)