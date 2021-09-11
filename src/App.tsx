import React, {useState} from 'react'
import './Canvas.css'
import Canvas from "./Canvas";

function App() {
    return (
        <div className="App">
            <Canvas className={'react-sketch-canvas'} canvasColor={'#FFFFFF'} allowOnlyPointerType={'all'}
                    backgroundImage={''}
                    eraserWidth={5} exportWithBackgroundImage={false} height={'500px'}
                    preserveBackgroundImageAspectRatio={'none'} strokeColor={'#000000'} strokeWidth={4} width={'100%'}
                    style={{
                        "borderRight": "1px solid #CCC"
                    }} withTimestamp={false}

            />
        </div>
    )
}

export default App
