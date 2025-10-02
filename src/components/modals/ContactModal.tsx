'use client'

import { useState, useEffect } from 'react'
import Modal from '../common/modal/Modal'
import { oswald, raleway } from '../../lib/fonts'
import contactQAData from '../../data/contactQA.json'
import { ContactQAData } from '../../definitions/types/contactQA'

// Q&A Section Component
function QASection() {
  const [currentQAIndex, setCurrentQAIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Import Q&A data from JSON file with type checking
  const qaData: ContactQAData = contactQAData as ContactQAData

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      
      setTimeout(() => {
        setCurrentQAIndex((prevIndex) => 
          prevIndex === qaData.length - 1 ? 0 : prevIndex + 1
        )
        setIsTransitioning(false)
      }, 300) // Half of transition duration
    }, 7000) // Change every 7 seconds

    return () => clearInterval(interval)
  }, [qaData.length])

  const currentQA = qaData[currentQAIndex]

  return (
    <div id="contact-qa-panel" className="relative flex-1 rounded-lg border border-white/10">
      {/* Glass overlay */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-zinc-800/30 to-zinc-700/20 backdrop-blur-xl"></div>
      
      {/* Content */}
      <div className="relative z-10 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className={`${oswald.className} text-xl text-white`}>Frequently Asked</h3>
          <div className="flex space-x-1">
            {qaData.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentQAIndex 
                    ? 'bg-media-mason-purple w-4' 
                    : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
        
        <div 
          className={`transition-all duration-600 ease-in-out ${
            isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
          }`}
        >
          <h4 className={`${oswald.className} text-lg text-media-mason-purple mb-3`}>
            {currentQA.question}
          </h4>
          <p className={`${raleway.className} text-white/80 leading-relaxed`}>
            {currentQA.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

type ContactView = 'calendly' | 'message' | 'success'

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
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
  
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormData({ name: '', email: '', message: '' })
        setActiveView('success')
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setError('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
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
          Prefer to send me a message instead?
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
  
  const renderSuccessView = () => (
    <div id="contact-success-view" className="flex flex-col items-center justify-center py-12">
      <div className="text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className={`${oswald.className} text-2xl text-white mb-2`}>Message Sent!</h3>
          <p className={`${raleway.className} text-white/80 mb-6`}>
            Thank you for reaching out. I'll get back to you soon!
          </p>
        </div>
        <button
          onClick={onClose}
          className={`
            ${oswald.className}
            bg-gradient-to-r from-purple-600 to-purple-800
            hover:from-purple-700 hover:to-purple-900
            text-white font-bold py-2 px-6 rounded-lg
            transition duration-300 ease-in-out
          `}
        >
          Close
        </button>
      </div>
    </div>
  )

  const renderMessageView = () => (
    <div id="contact-message-view" className="flex flex-col md:flex-row gap-6">
      <div id="contact-form-container" className="flex-1">
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}
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
              disabled={isSubmitting}
              className={`
                ${oswald.className}
                bg-gradient-to-r from-purple-600 to-purple-800
                hover:from-purple-700 hover:to-purple-900
                disabled:from-purple-600/50 disabled:to-purple-800/50
                disabled:cursor-not-allowed
                text-white font-bold py-2 px-6 rounded-lg
                transition duration-300 ease-in-out
              `}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
      
      <QASection />
    </div>
  )

  const getModalTitle = () => {
    switch (activeView) {
      case 'calendly': return 'Schedule a Meeting'
      case 'success': return 'Message Sent'
      default: return 'Contact Me'
    }
  }

  const getModalSize = () => {
    return activeView === 'calendly' ? 'lg' : 'xl'
  }

  const renderCurrentView = () => {
    switch (activeView) {
      case 'calendly': return renderCalendlyView()
      case 'success': return renderSuccessView()
      default: return renderMessageView()
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={getModalTitle()}
      size={getModalSize()}
    >
      {renderCurrentView()}
    </Modal>
  )
} 