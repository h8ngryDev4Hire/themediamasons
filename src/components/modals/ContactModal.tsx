'use client'

import { useState, useEffect } from 'react'
import Modal from '../common/modal/Modal'
import { oswald, raleway } from '../../lib/fonts'

type ContactView = 'calendly' | 'message'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [activeView, setActiveView] = useState<ContactView>('calendly')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  
  useEffect(() => {
    // Load Calendly script when modal opens
    if (isOpen && activeView === 'calendly') {
      const script = document.createElement('script')
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      document.body.appendChild(script)

      return () => {
        // Remove script when modal closes or view changes
        if (document.body.contains(script)) {
          document.body.removeChild(script)
        }
      }
    }
  }, [isOpen, activeView])
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    console.log('Form submitted:', formData)
    alert('Message sent! We will get back to you soon.')
    onClose()
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const renderCalendlyView = () => (
    <div id="contact-calendly-view" className="flex flex-col h-full">
      <div id="calendly-widget-container" className="h-[500px] rounded-lg overflow-hidden bg-zinc-900">
        <div 
          id="calendly-widget"
          className="calendly-inline-widget"
          data-url="https://calendly.com/arodriguez-themediamasons"
          style={{ height: '100%', width: '100%' }}
        />
      </div>
      
      <div className="mt-6 flex flex-col items-center">
        <p className={`${raleway.className} text-white/80 mb-3`}>
          Prefer to send us a message instead?
        </p>
        <button 
          id="switch-to-form-button"
          onClick={() => setActiveView('message')}
          className={`
            ${oswald.className}
            bg-gradient-to-r from-purple-600/80 to-purple-800/80
            hover:from-purple-600 hover:to-purple-800
            text-white font-bold py-2 px-6 rounded-lg
            transition duration-300 ease-in-out
          `}
        >
          Switch to Contact Form
        </button>
      </div>
    </div>
  )
  
  const renderMessageView = () => (
    <div id="contact-message-view" className="flex flex-col md:flex-row gap-6">
      <div id="contact-form-container" className="flex-1">
        <form id="contact-form" onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-white mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-zinc-700/50 border border-zinc-600 rounded-lg text-white"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-white mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-zinc-700/50 border border-zinc-600 rounded-lg text-white"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-white mb-1">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={5}
              required
              className="w-full px-3 py-2 bg-zinc-700/50 border border-zinc-600 rounded-lg text-white"
            />
          </div>
          
          <div className="flex justify-between items-center mt-6">
            <button
              id="switch-to-calendly-button"
              type="button"
              onClick={() => setActiveView('calendly')}
              className={`
                ${oswald.className}
                text-white underline hover:text-purple-300
                transition duration-300
              `}
            >
              Schedule a call instead
            </button>
            
            <button
              id="send-message-button"
              type="submit"
              className={`
                ${oswald.className}
                bg-gradient-to-r from-purple-600 to-purple-800
                hover:from-purple-700 hover:to-purple-900
                text-white font-bold py-2 px-6 rounded-lg
                transition duration-300 ease-in-out
              `}
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
      
      <div id="contact-info-panel" className="relative flex-1 rounded-lg border border-white/10">
        {/* Glass overlay */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-zinc-800/30 to-zinc-700/20 backdrop-blur-xl"></div>
        
        {/* Content */}
        <div className="relative z-10 p-6">
          <h3 id="why-work-with-us-title" className={`${oswald.className} text-xl text-white mb-4`}>Why Work With Us</h3>
          <ul className="space-y-3 text-white/80">
            <li className="flex items-start">
              <span className="mr-2 text-purple-400">✓</span>
              <span>Expert web development and design services</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-purple-400">✓</span>
              <span>Personalized solutions tailored to your business</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-purple-400">✓</span>
              <span>Ongoing support and maintenance</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-purple-400">✓</span>
              <span>Competitive pricing with flexible options</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={activeView === 'calendly' ? 'Schedule a Meeting' : 'Contact Us'}
      size={activeView === 'calendly' ? 'lg' : 'xl'}
    >
      {activeView === 'calendly' ? renderCalendlyView() : renderMessageView()}
    </Modal>
  )
} 