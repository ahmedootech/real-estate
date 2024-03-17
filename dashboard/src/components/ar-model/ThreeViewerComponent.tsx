import React from 'react'
import {_testFinish, ThreeViewer} from 'threepipe'


function ThreeViewerComponent({src, env}: {src: string, env: string}) {
    const canvasRef = React.useRef(null)
    React.useEffect(() => {
        const viewer = new ThreeViewer({canvas: canvasRef.current})

        // Load an environment map
        const envPromise = viewer.setEnvironmentMap(env)
        const modelPromise = viewer.load(src, {
            autoCenter: true,
            autoScale: true,
        })

        Promise.all([envPromise, modelPromise]).then(([env, model])=>{
            console.log('Loaded', model, env, viewer)
        })
        return () => {
            viewer.dispose()
        }
    }, [])
    return (
        <canvas id="three-canvas" style={{width: 800, height: 600}} ref={canvasRef} />
    )
}
