// Cube positions
export const CUBE_POS_X = 5;
export const CUBE_POS_Y = 10;
export const CUBE_POS_Z = 0;

// Camera positions
export const CAMERA_POS_X = 8;
export const CAMERA_POS_Y = 0;
export const CAMERA_POS_Z = 5;

// Conveyor belt
export const BELT_LENGTH = 20;

// Box dimensions and position
export const BOX_POS_X = BELT_LENGTH / 2 + 2;
export const BOX_POS_Y = -2.5;
export const BOX_POS_Z = 0;
export const BOX_WIDTH = 2;
export const BOX_HEIGHT = 2;
export const BOX_DEPTH = 2;

// Box animation
export const BOX_BOUNCE_DURATION = 0.5; // Duration of the bounce in seconds
export const BOX_BOUNCE_AMPLITUDE = 1; // Maximum displacement of the box

// Flap dimensions
export const FLAP_THICKNESS = 0.05;
export const SIDE_FLAP_WIDTH = BOX_WIDTH / 2 - 0.05;
export const FRONT_FLAP_DEPTH = BOX_DEPTH / 2 - 0.05;
export const FLAP_ANGLE = Math.PI / 6;  // 30 degrees

// Camera settings
export const CAMERA_ORBIT_SPEED = 0.1;
export const CAMERA_DISTANCE = Math.sqrt(
    Math.pow(CAMERA_POS_X - BOX_POS_X, 2) + 
    Math.pow(CAMERA_POS_Y + 2 - BOX_POS_Y, 2) + 
    Math.pow(CAMERA_POS_Z - BOX_POS_Z, 2)
);

// Physics
export const GRAVITY = -29.8;
export const CONVEYOR_SPEED = 0.07;

// Glow effect
export const GLOW_SPEED = 4;
export const GLOW_INTENSITY_MIN = 0.2;
export const GLOW_INTENSITY_MAX = 1;

// Cube configurations
interface CubeConfig {
    color: string;
    svg: string;
    glow: string;
}

export const cubeConfigurations: CubeConfig[] = [
    {
        color: "rgb(20, 20, 150)",
        svg: "/contentFactory/potion.svg",
        glow: "rgb(50, 50, 250)"
    },
    {
        color: "rgb(89, 0, 0)",
        svg: "/contentFactory/audio.svg",
        glow: "rgb(189, 0, 0)"
    },
    {
        color: "rgb(115, 40, 115)",
        svg: "/contentFactory/fx.svg",
        glow: "rgb(215, 70, 215)"
    },
    {
        color: "rgb(20, 100, 20)",
        svg: "/contentFactory/video.svg",
        glow: "rgb(50, 200, 50)"
    },
];
