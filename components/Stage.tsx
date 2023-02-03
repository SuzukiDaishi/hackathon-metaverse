import React, { useCallback, useState, useEffect } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { VRM, VRMLoaderPlugin } from '@pixiv/three-vrm'

import { Player } from '@/components/Player'
import { convertMixamoTracks } from '@/utils/vrmUtil'

/**
 * メインのステージ
 * 
 * @returns キャンバス
 */
export const Stage: React.FC = () => {

    // vrmを保持する
    const [vrm, setVrm] = useState<VRM>()

    // モーションを保持する
    const [idol, setIdol] = useState<THREE.AnimationClip>()
    const [walk, setWalk] = useState<THREE.AnimationClip>()

    // VRMの初期化
    useEffect(() => {
        const loader = new GLTFLoader()
        loader.register((parser) => (new VRMLoaderPlugin(parser)) )
        loader.load('/assets/1903884660012638236.vrm', 
                    (gltf) => {
                        setVrm(gltf.userData.vrm as VRM)
                    })
    }, [])

    // アニメーションの初期化
    useEffect(() => {
        if (!vrm) return 
        const loader = new FBXLoader()
        loader.load('/assets/Happy Idle.fbx', 
                    (fbx) => { setIdol(convertMixamoTracks('idol', fbx, vrm)) })
        loader.load('/assets/Walking.fbx',
                    (fbx) => { setWalk(convertMixamoTracks('walk', fbx, vrm)) })
    }, [vrm])

    return (<Canvas camera={{
        fov: 45,
        near: 0.1,
        far: 1000,
        position: [0, 3, 3]
    }}>
        <ambientLight />
        <pointLight position={[5, 5, 5]} />
        <Player playerModel={vrm} idolClip={idol} walkClip={walk} />
        <gridHelper />
    </Canvas>)
}