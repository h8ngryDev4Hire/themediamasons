'use client'

import React from 'react'
import { Code, Globe, Paintbrush, Wrench } from 'lucide-react'

const TestServiceBlock = ({ name, description, Icon }: { name: string, description: string, Icon: any }) => {
  return (
    <div className="bg-black/40 border border-purple-500/20 rounded-xl p-6 flex items-center mb-4">
      <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center mr-6">
        <Icon className="w-14 h-14 text-purple-500" />
      </div>
      <div className="flex-grow">
        <h3 className="text-2xl font-bold mb-2 text-white">{name}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  )
}

export default function TestServicesPage() {
  const services = [
    {
      name: "Website Development",
      description: "Custom, responsive websites built with modern technologies.",
      Icon: Code
    },
    {
      name: "Web Application Development",
      description: "Powerful, scalable web applications with robust functionality.",
      Icon: Globe
    },
    {
      name: "Web Design",
      description: "Beautiful, intuitive designs that captivate your audience.",
      Icon: Paintbrush
    },
    {
      name: "Tech Support",
      description: "Professional technical support for your devices.",
      Icon: Wrench
    }
  ]

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-5xl font-bold mb-10 text-center text-white">Testing Services</h1>
      
      {services.map((service, index) => (
        <TestServiceBlock 
          key={index}
          name={service.name}
          description={service.description}
          Icon={service.Icon}
        />
      ))}
    </div>
  )
} 