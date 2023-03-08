import {React, useState, useEffect, useRef} from 'react'
import { Canvas,useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from "@react-three/drei";
import { Physics, usePlane, useBox, useSphere } from "@react-three/cannon";
import "./styles.css";

const Torus = () => {
    const torusRef = useRef();
  
    useFrame(() => {
      torusRef.current.rotation.x += 0.03;
      torusRef.current.rotation.y += 0.03;
    });
  
    return (
      <mesh ref={torusRef}>
        <torusGeometry args={[1, 0.2, 12, 36]} />
        <meshStandardMaterial color={"red"} />
      </mesh>
    );
  };

function Plane(props) {
	const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
	return (
		<mesh receiveShadow ref={ref} >
			<planeGeometry args={[50, 50]} />
			<meshStandardMaterial color="#f0f0f0" />
		</mesh>
	)
}

function Cube(props) {
	const [ref] = useBox(() => ({ mass: 1, ...props }));
	return (
		<mesh castShadow ref={ref} props>
			<boxBufferGeometry attach="geometry" args={[1]} />
			<meshStandardMaterial color="orange" />
		</mesh>
	)
}

// react three fibre  create a sphere with buffer
function Sphere(props) {
    const [ref] = useSphere(() => ({ mass: 0.6, ...props }))
    return (
        <mesh castShadow ref={ref} position={[0, 12, 0]}>
            <sphereBufferGeometry attach="geometry" args={[1, 32, 32]} />
            <meshStandardMaterial color="orange" />
        </mesh>
    )
}

function Box() {
	const [ref, api] = useBox(() => ({ mass: 1, position: [0, 2, 0] }));
	return (
		<mesh
			onClick={() => {
				api.velocity.set(0, 2, 0);
			}}
			ref={ref}
			position={[0, 2, 0]}
		>
			<boxBufferGeometry attach="geometry" />
			<meshLambertMaterial attach="material" color="hotpink" />
		</mesh>
	);
}

function Plane2() {
	const [ref] = usePlane(() => ({
		rotation: [-Math.PI / 2, 0, 0],
	}));
	return (
		<mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
			<planeBufferGeometry attach="geometry" args={[100, 100]} />
			<meshLambertMaterial attach="material" color="lightblue" />
		</mesh>
	);
}

function App() {
    const [ready, set] = useState(false)
    useEffect(() => {
      const timeout = setTimeout(() => set(true), 1000)
      return () => clearTimeout(timeout)
    }, [])

  return (
    <Canvas shadows camera={{ position: [5, 5, 5], fov: 45 }}>
        <fog attach="fog" args={["white", 0, 40]} />
    <OrbitControls />
    <Stars />
    <ambientLight intensity={.3} />
    <spotLight color={"#FFFF00"} position={[10, 15, 0]} angle={0.5} castShadow distance={300} />
    <Physics>
        <Box />
        {/* <Torus /> */}
        <Cube position={[0, 5, 0]}/>
        <Cube position={[0.45, 7, -0.25]} />
        <Cube position={[3, 7, -9]} />
        <Sphere position={[3, 7, -3]} />
        {ready && <Cube position={[-0.45, 9, 0.25]} />}
        <Plane />
    </Physics>
</Canvas>
  )
}

export default App