import { Metadata } from 'next'
import GlobeSection from '../../components/three/globeSection'
import WireframeGlobe from '../../components/three/wireframeGlobe'
import DnaHelixSection from '../../components/three/dnaHelixSection'
import DigitalDnaHelix from '../../components/three/digitalDnaHelix'

export const metadata: Metadata = {
  title: 'Three.js Components | The Media Masons',
  description: 'Visual preview of our Three.js component library'
}

export default function ThreeJsPreviewPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gray-900">
      <div className="w-full py-12 px-4 md:px-8 text-center">
        <h1 className="text-5xl font-bold text-white mb-6">Three.js Components</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          A visual preview of our Three.js components before integration with the main site.
        </p>
      </div>
      
      {/* Wireframe Globe Component Preview */}
      <div className="w-full py-12 px-4 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">Wireframe Globe</h2>
          
          {/* Standalone Component */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">Standalone Component</h3>
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg">
              <div className="w-full h-[400px]">
                <WireframeGlobe 
                  connectionCount={12}
                  color="#9333ea"
                />
              </div>
            </div>
          </div>
          
          {/* Full Section Component */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">Full Section Component</h3>
            <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
              <GlobeSection />
            </div>
          </div>
        </div>
      </div>
      
      {/* DNA Helix Component Preview */}
      <div className="w-full py-12 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">Digital DNA Helix</h2>
          
          {/* Standalone Component */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">Standalone Component</h3>
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
              <div className="w-full h-[400px]">
                <DigitalDnaHelix 
                  primaryColor="#6d28d9"
                  secondaryColor="#f472b6"
                  nodesPerStrand={24}
                />
              </div>
            </div>
          </div>
          
          {/* Full Section Component */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">Full Section Component</h3>
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <DnaHelixSection />
            </div>
          </div>
        </div>
      </div>
      
      {/* Component Documentation */}
      <div className="w-full py-12 px-4 md:px-8 bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Component Documentation</h2>
          
          <div className="bg-gray-900 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-bold text-white mb-4">WireframeGlobe Component</h3>
            <div className="mb-4">
              <h4 className="text-lg font-medium text-purple-400 mb-2">Props</h4>
              <ul className="list-disc pl-5 text-gray-300 space-y-2">
                <li><code className="bg-gray-700 px-2 py-1 rounded">width?: number</code> - Width in pixels (defaults to container width)</li>
                <li><code className="bg-gray-700 px-2 py-1 rounded">height?: number</code> - Height in pixels (defaults to container height)</li>
                <li><code className="bg-gray-700 px-2 py-1 rounded">color?: string</code> - Globe color (default: #9333ea)</li>
                <li><code className="bg-gray-700 px-2 py-1 rounded">connectionCount?: number</code> - Number of connection points (default: 15)</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-4">DigitalDnaHelix Component</h3>
            <div className="mb-4">
              <h4 className="text-lg font-medium text-purple-400 mb-2">Props</h4>
              <ul className="list-disc pl-5 text-gray-300 space-y-2">
                <li><code className="bg-gray-700 px-2 py-1 rounded">width?: number</code> - Width in pixels (defaults to container width)</li>
                <li><code className="bg-gray-700 px-2 py-1 rounded">height?: number</code> - Height in pixels (defaults to container height)</li>
                <li><code className="bg-gray-700 px-2 py-1 rounded">primaryColor?: string</code> - Primary strand color (default: #6d28d9)</li>
                <li><code className="bg-gray-700 px-2 py-1 rounded">secondaryColor?: string</code> - Secondary strand and node color (default: #f472b6)</li>
                <li><code className="bg-gray-700 px-2 py-1 rounded">strandCount?: number</code> - Number of strands (default: 2)</li>
                <li><code className="bg-gray-700 px-2 py-1 rounded">nodesPerStrand?: number</code> - Nodes per strand (default: 20)</li>
              </ul>
            </div>
            <div className="mt-4">
              <h4 className="text-lg font-medium text-purple-400 mb-2">Animation Details</h4>
              <ul className="list-disc pl-5 text-gray-300 space-y-2">
                <li>Smooth multi-axis rotation (Y, X and subtle Z)</li>
                <li>Fade-in animation with staggered timing between outer strands and inner connections</li>
                <li>Gentle pulsing effect for all elements</li>
                <li>Phase-shifted opacity animation between strands and connections</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 