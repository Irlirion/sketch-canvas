import React from "react";
import {ReactSketchCanvas} from "react-sketch-canvas";
import './Canvas.css'

// @ts-ignore
const Canvas = ({// @ts-ignore
                    className, // @ts-ignore
                    width,// @ts-ignore
                    height,// @ts-ignore
                    backgroundImage,// @ts-ignore
                    exportWithBackgroundImage,// @ts-ignore
                    preserveBackgroundImageAspectRatio,// @ts-ignore
                    strokeWidth,// @ts-ignore
                    strokeColor,// @ts-ignore
                    canvasColor,// @ts-ignore
                    eraserWidth,// @ts-ignore
                    allowOnlyPointerType,// @ts-ignore
                    style,// @ts-ignore
                    withTimestamp,
                }) => {
    const canvasRef = React.useRef<ReactSketchCanvas>(null);

    const [dataURI, setDataURI] = React.useState<string>('');
    const [svg, setSVG] = React.useState<string>('');
    const [paths, setPaths] = React.useState<CanvasPath[]>([]);
    const [sketchingTime, setSketchingTime] = React.useState<number>(0);

    const imageExportHandler = async () => {
        const exportImage = canvasRef.current?.exportImage;

        if (exportImage) {
            const exportedDataURI = await exportImage('png');
            setDataURI(exportedDataURI);
        }
    };

    const resetCanvasHandler = () => {
        const resetCanvas = canvasRef.current?.resetCanvas;

        if (resetCanvas) {
            resetCanvas();
        }
    };

    const createButton = (// @ts-ignore
        label,// @ts-ignore
        handler,// @ts-ignore
        themeColor
    ) => (
        <button
            key={label}
            className={`btn btn-${themeColor} btn-block`}
            type="button"
            onClick={handler}
        >
            {label}
        </button>
    );

    const buttonsWithHandlers = [
        ['Reset All', resetCanvasHandler, 'primary'],
        ['Export Image', imageExportHandler, 'success'],
    ];

    const onUpdate = (updatedPaths: CanvasPath[]): void => {
        setPaths(updatedPaths);
    };

    // @ts-ignore
    return (
        <div>
            <div className="container-md">
                <div className="row no-gutters canvas-area m-0 p-0">
                    <div className="col-9 canvas p-0">
                        <ReactSketchCanvas
                            ref={canvasRef}
                            className={className}
                            width={width}
                            height={height}
                            backgroundImage={backgroundImage}
                            exportWithBackgroundImage={exportWithBackgroundImage}
                            preserveBackgroundImageAspectRatio={
                                preserveBackgroundImageAspectRatio
                            }
                            strokeWidth={strokeWidth}
                            strokeColor={strokeColor}
                            canvasColor={canvasColor}
                            eraserWidth={eraserWidth}
                            allowOnlyPointerType={allowOnlyPointerType}
                            style={style}// @ts-ignore
                            onUpdate={onUpdate}
                            withTimestamp={withTimestamp}
                        />
                    </div>
                    <div className="col-3 panel">
                        <div className="d-grid gap-2">
                            {buttonsWithHandlers.map(([label, handler, themeColor]) =>
                                createButton(label, handler, themeColor)
                            )}
                        </div>
                    </div>
                </div>

                <div className="row image-export p-3 justify-content-center align-items-start">
                    <div className="col-6">
                        <p>Exported image</p>
                        <img
                            className="exported-image"
                            src={
                                dataURI ||
                                'https://via.placeholder.com/500x250/000000/FFFFFF/?text=Click on export image'
                            }
                            alt="exported"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Canvas;

