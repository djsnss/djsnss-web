import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Html, useTexture } from '@react-three/drei';
import styled from 'styled-components';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import { Vector3, Raycaster } from 'three';
import './ExhibitWalkthrough.css';
import { largeEventsData } from '../../data/timelineData';

// Create navigation points from large events data
const NAVIGATION_POINTS = largeEventsData.map((event, index) => {
  // Calculate positions in a circular arrangement
  const radius = 21;
  const angle = (index / largeEventsData.length) * Math.PI * 2;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  
  const lookAtX = -x * 0.9;
  const lookAtZ = -z * 0.9;
  return {
    id: event.id,
    slug: event.slug,
    name: event.title,
    position: [x, 0, z],
    lookAt: [lookAtX, 1, lookAtZ], // Look at center
    description: event.description,
    longDescription: event.longDescription,
    location: event.location,
    date: event.date,
    scale: event.scale,
    duration: event.duration,
    imageURL: event.imageURL,
    color: event.color,
  };
});

// Virtual Joystick for Mobile
const VirtualJoystick = ({ onMove }) => {
  const joystickRef = useRef(null);
  const knobRef = useRef(null);
  const [active, setActive] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [movement, setMovement] = useState({ x: 0, y: 0 });
  
  const handleStart = (e) => {
    e.preventDefault();
    const touch = e.touches ? e.touches[0] : e;
    if (!joystickRef.current) return;
    
    const rect = joystickRef.current.getBoundingClientRect();
    setOrigin({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    });
    setActive(true);
  };
  
  const handleMove = (e) => {
    e.preventDefault();
    if (!active || !knobRef.current) return;
    
    const touch = e.touches ? e.touches[0] : e;
    const maxDistance = 40; // Maximum distance the joystick can move
    
    let dx = touch.clientX - origin.x;
    let dy = touch.clientY - origin.y;
    
    // Normalize if distance is greater than maxDistance
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > maxDistance) {
      dx = (dx / distance) * maxDistance;
      dy = (dy / distance) * maxDistance;
    }
    
    // Update joystick position
    knobRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
    
    // Calculate movement values (-1 to 1)
    const normalized = {
      x: dx / maxDistance,
      y: dy / maxDistance
    };
    setMovement(normalized);
    
    // Call the movement callback
    onMove(normalized);
  };
  
  const handleEnd = (e) => {
    e.preventDefault();
    if (!knobRef.current) return;
    
    // Reset joystick position
    knobRef.current.style.transform = 'translate(0, 0)';
    setActive(false);
    setMovement({ x: 0, y: 0 });
    onMove({ x: 0, y: 0 });
  };
  
  useEffect(() => {
    const knob = knobRef.current;
    
    if (!knob) return;
    
    knob.addEventListener('touchstart', handleStart);
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleEnd);
    
    return () => {
      knob.removeEventListener('touchstart', handleStart);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [active, origin]);
  
  return (
    <div className="virtual-joystick" ref={joystickRef}>
      <div 
        className="joystick-knob" 
        ref={knobRef}
        onTouchStart={handleStart}
      />
    </div>
  );
};

// Collision detection and movement logic
function MovementControls({ controlsRef, scene, speed = 0.1 }) {
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });
  
  const [joystickMovement, setJoystickMovement] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const raycaster = useRef(new Raycaster());
  
  // Check if on mobile device
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);
  
  // Keyboard controls for desktop
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch(e.key.toLowerCase()) {
        case 'w':
          setMovement(prev => ({ ...prev, forward: true }));
          break;
        case 's':
          setMovement(prev => ({ ...prev, backward: true }));
          break;
        case 'a':
          setMovement(prev => ({ ...prev, left: true }));
          break;
        case 'd':
          setMovement(prev => ({ ...prev, right: true }));
          break;
        default:
          break;
      }
    };
    
    const handleKeyUp = (e) => {
      switch(e.key.toLowerCase()) {
        case 'w':
          setMovement(prev => ({ ...prev, forward: false }));
          break;
        case 's':
          setMovement(prev => ({ ...prev, backward: false }));
          break;
        case 'a':
          setMovement(prev => ({ ...prev, left: false }));
          break;
        case 'd':
          setMovement(prev => ({ ...prev, right: false }));
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
  
  // Handle joystick movement for mobile
  const handleJoystickMove = (data) => {
    setJoystickMovement(data);
  };
  
  // Check for collisions in a given direction
  const checkCollision = (position, direction) => {
    if (!scene) return false;
    
    const collisionDistance = 0.8;
    raycaster.current.set(position, direction);
    const intersects = raycaster.current.intersectObjects(scene.children, true);
    return intersects.length > 0 && intersects[0].distance < collisionDistance;
  };
  
  useFrame(() => {
    if (!controlsRef.current) return;
    
    const controls = controlsRef.current;
    const camera = controls.object;
    const minHeight = 1.0;
    
    let moveForward = movement.forward;
    let moveBackward = movement.backward;
    let moveLeft = movement.left;
    let moveRight = movement.right;
    
    // If on mobile, use joystick values
    if (isMobile) {
      moveForward = joystickMovement.y < -0.1;
      moveBackward = joystickMovement.y > 0.1;
      moveLeft = joystickMovement.x < -0.1;
      moveRight = joystickMovement.x > 0.1;
    }
    
    // Move forward/backward
    if (moveForward || moveBackward) {
      const direction = new Vector3();
      camera.getWorldDirection(direction);
      direction.y = 0;
      direction.normalize();
      
      const forwardSpeed = isMobile ? Math.abs(joystickMovement.y) * speed : speed;
      
      if (moveForward) {
        if (!checkCollision(camera.position, direction)) {
          const newPosition = camera.position.clone().addScaledVector(direction, forwardSpeed);
          if (newPosition.y >= minHeight) {
            camera.position.copy(newPosition);
          } else {
            camera.position.x = newPosition.x;
            camera.position.z = newPosition.z;
            camera.position.y = minHeight;
          }
        }
      } else if (moveBackward) {
        if (!checkCollision(camera.position, direction.clone().negate())) {
          const newPosition = camera.position.clone().addScaledVector(direction, -forwardSpeed);
          if (newPosition.y >= minHeight) {
            camera.position.copy(newPosition);
          } else {
            camera.position.x = newPosition.x;
            camera.position.z = newPosition.z;
            camera.position.y = minHeight;
          }
        }
      }
    }
    
    // Move left/right (strafing)
    if (moveLeft || moveRight) {
      const direction = new Vector3();
      camera.getWorldDirection(direction);
      
      const rightDirection = new Vector3(
        -direction.z,
        0,
        direction.x
      ).normalize();
      
      const strafeSpeed = isMobile ? Math.abs(joystickMovement.x) * speed : speed;
      
      if (moveRight) {
        if (!checkCollision(camera.position, rightDirection)) {
          const newPosition = camera.position.clone().addScaledVector(rightDirection, strafeSpeed);
          if (newPosition.y >= minHeight) {
            camera.position.copy(newPosition);
          } else {
            camera.position.x = newPosition.x;
            camera.position.z = newPosition.z;
            camera.position.y = minHeight;
          }
        }
      } else if (moveLeft) {
        if (!checkCollision(camera.position, rightDirection.clone().negate())) {
          const newPosition = camera.position.clone().addScaledVector(rightDirection, -strafeSpeed);
          if (newPosition.y >= minHeight) {
            camera.position.copy(newPosition);
          } else {
            camera.position.x = newPosition.x;
            camera.position.z = newPosition.z;
            camera.position.y = minHeight;
          }
        }
      }
    }
    
    // Update orbit controls target
    if (moveForward || moveBackward || moveLeft || moveRight) {
      const lookDirection = new Vector3();
      camera.getWorldDirection(lookDirection);
      const targetPosition = new Vector3().copy(camera.position).add(lookDirection);
      controls.target.set(targetPosition.x, targetPosition.y, targetPosition.z);
      controls.update();
    }
  });
  
  // Return null instead of JSX - the joystick will be rendered outside Canvas
  return null;
}

// Styled Navigation Containers
const NavigationContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
  z-index: 20;
`;

const ArrowButton = styled.button`
  background-color: rgba(255, 255, 255, 0.7);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(200, 200, 200, 0.8);
    transform: scale(1.1);
  }

  svg {
    width: 30px;
    height: 30px;
    fill: #333;
  }
`;

// Info Panel for exhibit details
const InfoPanel = styled.div`
  position: absolute;
  top: 80px;
  right: 20px;
  width: 300px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 20;
  transition: transform 0.3s ease;
  max-height: 60vh;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    width: 80%;
    top: auto;
    bottom: 80px;
    right: 50%;
    transform: translateX(50%);
  }
  
  img {
    width: 100%;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  
  h3 {
    color: #333;
    margin-top: 0;
    border-bottom: 2px solid ${props => props.color || '#4C9D8F'};
    padding-bottom: 8px;
  }
  
  .event-details {
    margin-top: 10px;
    font-size: 14px;
    
    p {
      margin: 5px 0;
    }
    
    span {
      font-weight: bold;
    }
  }
`;

// Controls hint panel
const ControlsHint = styled.div`
  position: absolute;
  bottom: 100px;
  left: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 8px;
  padding: 10px 15px;
  font-size: 14px;
  z-index: 20;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    bottom: 180px;
  }
`;

// Event Display component for 3D environment
function EventDisplay({ event, position, rotation, onClick }) {
  const texture = useTexture(event.imageURL);
  
  return (
    <group position={position} rotation={rotation} onClick={onClick}>
      {/* Main image display - increased size */}
      <mesh position={[0, 1, 0]}>
        <planeGeometry args={[event.id === 0 ? 6 : 8, 4]} />
        <meshBasicMaterial map={texture} transparent={false} />
      </mesh>
      
      {event.id === 0 ? (
        <Html 
            position={[0, -1, 0.01]} 
            center
            transform
            distanceFactor={10}
            zIndexRange={[0, 0]}
            occlude
            >
            <div className="event-marker">
            <h3>{event.name}</h3>
            </div>
        </Html>
      ):(
        <Html 
            position={[0, -1, 0.06]} 
            center
            transform
            distanceFactor={10}
            zIndexRange={[0, 0]}
            occlude
        >
            <div className="event-marker">
            <h3>{event.id}. {event.name}</h3>
            </div>
        </Html>
      )}
    </group>
  );
}

// Museum Model component that uses the local GLTF file
function MuseumModel({ setSceneRef, navigateTo }) {
  const { scene } = useGLTF('/models/scene.gltf'); // Use relative path to local models folder
  
  useEffect(() => {
    if (scene) {
      // Apply any transformations or material adjustments here if needed
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      
      // Set the scene reference for collision detection
      setSceneRef(scene);
    }
  }, [scene, setSceneRef]);
  
  return (
    <>
      <primitive object={scene} scale={1} position={[0, 0, 0]} />
      
      {/* Add event displays */}
      {NAVIGATION_POINTS.map((point, index) => {
        const angle = (index / NAVIGATION_POINTS.length) * Math.PI * 2;
        
        return (
          <EventDisplay 
            key={point.id}
            event={point}
            position={point.position}
            rotation={[0, Math.PI + angle, 0]} // Face toward center    
            onClick={() => navigateTo(point)}
          />
        );
      })}
    </>
  );
}

const ExhibitWalkthrough = () => {
  const navigate = useNavigate();
  const [currentPointIndex, setCurrentPointIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [sceneRef, setSceneRef] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [joystickMovement, setJoystickMovement] = useState({ x: 0, y: 0 });
  const controlsRef = useRef(null);
  
  // Check if on mobile device
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);
  
  // Handle joystick movement for mobile
  const handleJoystickMove = (data) => {
    setJoystickMovement(data);
  };
  
  // Handle loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Hide controls hint after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 8000);
    
    return () => clearTimeout(timer);
  }, []);

  // Modify the navigateTo function to accept direct point object
  const navigateTo = (point) => {
    if (!controlsRef.current) return;

    const controls = controlsRef.current;
    const camera = controls.object;

    setCurrentPointIndex(NAVIGATION_POINTS.findIndex(p => p.id === point.id));
    const angle = Math.atan2(point.position[0], point.position[2]);
    const viewDistance = 6; // Distance from the image to view from
    
    const viewX = point.position[0] - Math.sin(angle) * viewDistance;
    const viewZ = point.position[2] - Math.cos(angle) * viewDistance;

    gsap.to(camera.position, {
        x: viewX,
        y: 1.6, // Eye level
        z: viewZ,
        duration: 1.5,
        ease: 'power2.inOut',
        onUpdate: () => {
        // Look at the image
        controls.target.set(
            point.position[0], 
            1, // Image center height
            point.position[2]
        );
        controls.update();
        }
    });
};

  const navigatePrevious = () => {
    const prevIndex = (currentPointIndex - 1 + NAVIGATION_POINTS.length) % NAVIGATION_POINTS.length;
    setCurrentPointIndex(prevIndex);
    navigateTo(NAVIGATION_POINTS[prevIndex]);
  };

  const navigateNext = () => {
    const nextIndex = (currentPointIndex + 1) % NAVIGATION_POINTS.length;
    setCurrentPointIndex(nextIndex);
    navigateTo(NAVIGATION_POINTS[nextIndex]);
  };
  
  const handleBackClick = () => {
    navigate("/");
  };

  // Add useEffect to navigate to first point on initial load
  useEffect(() => {
    // Wait for loading to complete and controls to be initialized
    if (!isLoading && controlsRef.current && NAVIGATION_POINTS.length > 0) {
      // Navigate to the first navigation point
      setTimeout(() => {
        navigateTo(NAVIGATION_POINTS[0]);
      }, 500); // Small delay to ensure everything is loaded
    }
  }, [isLoading, controlsRef.current]); // Only run when loading completes and controls are available
  
  return (
    <div className="exhibit-container">
      {isLoading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      )}
      
      {/* Back Button */}
      <button className="back-button" onClick={handleBackClick}>
        <svg viewBox="0 0 24 24">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
      </button>
      
      {/* Controls Hint */}
      {showControls && (
        <ControlsHint>
          <strong>Movement Controls:</strong><br />
          {isMobile ? (
            <>Use the joystick in the bottom left corner<br />to move around the museum</>
          ) : (
            <>
              W - Move forward<br />
              S - Move backward<br />
              A - Strafe left<br />
              D - Strafe right<br />
              Mouse - Look around
            </>
          )}
        </ControlsHint>
      )}
      
      {/* Virtual Joystick - Render outside Canvas */}
      {isMobile && <VirtualJoystick onMove={handleJoystickMove} />}
      
      {/* Arrow Navigation */}
      <NavigationContainer>
        <ArrowButton onClick={navigatePrevious}>
          <svg viewBox="0 0 24 24">
            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z"/>
          </svg>
        </ArrowButton>
        <ArrowButton onClick={navigateNext}>
          <svg viewBox="0 0 24 24">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
          </svg>
        </ArrowButton>
      </NavigationContainer>

      {/* Updated Info Panel */}
      <InfoPanel color={NAVIGATION_POINTS[currentPointIndex].color}>
        {NAVIGATION_POINTS[currentPointIndex].id ===0?(
            <>
                <img 
                src={NAVIGATION_POINTS[currentPointIndex].imageURL} 
                alt={NAVIGATION_POINTS[currentPointIndex].name} 
                className='h-40 w-full object-contain rounded-lg mb-4'
                />
                <h3>{NAVIGATION_POINTS[currentPointIndex].name}</h3>
            </>
        ):(
            <>
                <img 
                src={NAVIGATION_POINTS[currentPointIndex].imageURL} 
                alt={NAVIGATION_POINTS[currentPointIndex].name} 
                className='h-40 w-full object-cover rounded-lg mb-4'
                />
                <h3>{NAVIGATION_POINTS[currentPointIndex].id}. {NAVIGATION_POINTS[currentPointIndex].name}</h3>
            </>
        )}
        <p>{NAVIGATION_POINTS[currentPointIndex].description}</p>
        
        <div className="event-details">
            {NAVIGATION_POINTS[currentPointIndex].location && (
              <p><span>Location:</span> {NAVIGATION_POINTS[currentPointIndex].location}</p>
            )}
            {NAVIGATION_POINTS[currentPointIndex].date && (
              <p><span>Date:</span> {NAVIGATION_POINTS[currentPointIndex].date}</p>
            )}
            {NAVIGATION_POINTS[currentPointIndex].scale && (
              <p><span>Scale:</span> {NAVIGATION_POINTS[currentPointIndex].scale}</p>
            )}
            {NAVIGATION_POINTS[currentPointIndex].duration && (
              <p><span>Duration:</span> {NAVIGATION_POINTS[currentPointIndex].duration}</p>
            )}
        </div>
        
        {NAVIGATION_POINTS[currentPointIndex].id ===0 ? (
            <p className="long-description">
            {NAVIGATION_POINTS[currentPointIndex].longDescription}
            </p>
        ):(
            <p className="long-description">
            {NAVIGATION_POINTS[currentPointIndex].longDescription.substring(0, 150)}...
            </p>
        )}
        
        {NAVIGATION_POINTS[currentPointIndex].id !=0 && (
            <button 
            className="view-more-button"
            onClick={() => navigate(`/eventdetails/${NAVIGATION_POINTS[currentPointIndex].slug}`)}
            >
            View Full Details
            </button>
        )}
      </InfoPanel>

      <Canvas 
        shadows
        style={{ width: '100%', height: '100%' }}
        camera={{ position: [0, 1, 12], fov: 60, rotation: [0, Math.PI, 0]}}
      >
        <Suspense fallback={null}>
          <MuseumModel setSceneRef={setSceneRef} navigateTo={navigateTo} />
          <ambientLight intensity={0.5} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={0.8} 
            castShadow 
            shadow-mapSize-width={2048} 
            shadow-mapSize-height={2048}
          />
          <Environment preset="sunset" />
          <MovementControls 
            controlsRef={controlsRef} 
            scene={sceneRef} 
            joystickMovement={joystickMovement}
            isMobile={isMobile}
          />
        </Suspense>
        
        <OrbitControls 
          ref={controlsRef}
          maxDistance={10}
          minDistance={1}
          enableZoom={true}
          enablePan={true}
          enableDamping
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

// Preload the model using the relative path
useGLTF.preload('/models/scene.gltf');

export default ExhibitWalkthrough;