export interface NavLink {
  label: string;
  href: string;
}

export interface TabItem {
  id: string;
  title: string;
  description: string;
  // Visual states associated with each active tab
  colors: {
    primary: string;      // Tailwind gradient start (e.g., '#8A2BE2')
    secondary: string;    // Tailwind gradient end (e.g., '#4B0082')
    accent: string;       // Accent core glow color
  };
  ringDetails: {
    rotationX: number;
    rotationY: number;
    scale: number;
  };
  orbs: Array<{
    id: number;
    size: number;
    x: number;            // offset x relative to center
    y: number;            // offset y relative to center
    delay: number;
    duration: number;
  }>;
}

export interface SocialLink {
  platform: 'facebook' | 'twitter' | 'linkedin';
  href: string;
}
