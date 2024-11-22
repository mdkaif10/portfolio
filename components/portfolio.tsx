'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronRight, Github, Linkedin, Mail, CircleDot, FileCode2, Folder, FolderOpen, File, X, Maximize2, Minus, Star, Terminal, Moon, Sun, Coffee, Search, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import confetti from 'canvas-confetti'

const VSCodeIcons = {
  ts: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 8v8h16V0H0v8zm12.95-5.8l.301.299-3.72 3.72-3.23-3.23L6 3.29l3.3 3.29 3.65-3.64.3.301-3.95 3.93L6 3.87l-.3.3 3.6 3.59-3.6 3.59.3.3 3.3-3.3 3.95 3.93-.3.301-3.65-3.64L6 12.29l-.3-.301 3.23-3.23 3.72 3.72-.301.299-3.42-3.42L6 12.71l-.6-.599 3.53-3.52L5.4 5.039l.6-.599 3.42 3.42 3.53-3.52z" fill="#3178C6"/>
    </svg>
  ),
  json: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 5h12v6H2V5z" fill="#F1E05A"/>
    </svg>
  ),
  folder: () => <Folder className="w-4 h-4 text-[#DCB67A]" />,
  folderOpen: () => <FolderOpen className="w-4 h-4 text-[#DCB67A]" />,
  file: () => <File className="w-4 h-4 text-[#519ABA]" />
}

export function PortfolioComponent() {
  const [expandedFolders, setExpandedFolders] = useState(['portfolio', 'src'])
  const [activeFile, setActiveFile] = useState('about_me.ts')
  const [isMaximized, setIsMaximized] = useState(false)
  const [theme, setTheme] = useState('dark')
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [terminalContent, setTerminalContent] = useState(['Welcome to MD KAIF\'s portfolio! Type "help" for a list of commands.'])
  const [coffeeCount, setCoffeeCount] = useState(0)
  const terminalInputRef = useRef(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
    }
    const savedCoffeeCount = localStorage.getItem('coffeeCount')
    if (savedCoffeeCount) {
      setCoffeeCount(parseInt(savedCoffeeCount))
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const toggleFolder = (folder: string) => {
    setExpandedFolders(prev => 
      prev.includes(folder) 
        ? prev.filter(f => f !== folder)
        : [...prev, folder]
    )
  }

  const handleTerminalCommand = (command: string) => {
    setTerminalContent(prev => [...prev, `> ${command}`])
    switch(command.toLowerCase()) {
      case 'help':
        setTerminalContent(prev => [...prev, 'Available commands: about, skills, projects, contact, clear, theme, coffee'])
        break
      case 'about':
        setTerminalContent(prev => [...prev, 'MD KAIF - Aspiring Full Stack Developer', 'Specializing in Cloud Technology and Information Security'])
        break
      case 'skills':
        setTerminalContent(prev => [...prev, 'Skills: JavaScript, Python, React, Node.js, MongoDB, Docker'])
        break
      case 'projects':
        setTerminalContent(prev => [...prev, 'Projects:', '1. Student Management System', '2. Real-time Chat Application'])
        break
      case 'contact':
        setTerminalContent(prev => [...prev, 'Email: Md.71.kaif@gmail.com', 'LinkedIn: https://www.linkedin.com/in/md-kaif101/'])
        break
      case 'clear':
        setTerminalContent([])
        break
      case 'theme':
        toggleTheme()
        setTerminalContent(prev => [...prev, `Theme switched to ${theme === 'dark' ? 'light' : 'dark'}`])
        break
      case 'coffee':
        const newCoffeeCount = coffeeCount + 1
        setCoffeeCount(newCoffeeCount)
        localStorage.setItem('coffeeCount', newCoffeeCount.toString())
        setTerminalContent(prev => [...prev, `Thanks for the coffee! ☕ (Total: ${newCoffeeCount})`])
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
        break
      default:
        setTerminalContent(prev => [...prev, 'Command not recognized. Type "help" for available commands.'])
    }
  }

  const openHelpTerminal = () => {
    setTerminalOpen(true)
    setTerminalContent(prev => [
      ...prev,
      '--- Help ---',
      'Welcome to MD KAIF\'s portfolio!',
      'Use the file explorer to navigate through different sections.',
      'Available terminal commands: help, about, skills, projects, contact, clear, theme, coffee',
      'Enjoy exploring!'
    ])
  }

  const FileExplorer = () => {
    const allFiles = [
      { name: 'about_me.ts', folder: 'src' },
      { name: 'experience.ts', folder: 'src' },
      { name: 'projects.ts', folder: 'src' },
      { name: 'contact.ts', folder: 'src' },
      { name: '.eslintrc.json', folder: 'src' },
      { name: '.gitignore', folder: 'src' },
      { name: 'next.config.js', folder: 'src' },
      { name: 'package.json', folder: 'src' },
      { name: 'tsconfig.json', folder: 'src' },
    ]

    const filteredFiles = allFiles.filter(file => 
      file.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
      <div className="p-2">
        <div className="text-[#8F8F8F] uppercase text-xs font-medium mb-2">Explorer</div>
        
        <div className="space-y-1">
          <div className="text-[#8F8F8F] uppercase text-xs px-2 py-1">Open Editors</div>
          <div className="flex items-center px-2 py-1 bg-[#1F2233] group">
            <Star className="w-4 h-4 text-[#C4A000] mr-2" />
            <span className="text-[#8F8F8F]">{activeFile}</span>
            <X className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 text-[#8F8F8F]" />
          </div>
          
          <div className="text-[#8F8F8F] uppercase text-xs px-2 py-1">Portfolio</div>
          
          {['src', 'public', '.next', 'node_modules'].map((folder) => (
            <div key={folder}>
              <button
                className="flex items-center w-full hover:bg-[#2A2D2E] px-2 py-0.5 rounded-sm group"
                onClick={() => toggleFolder(folder)}
              >
                <ChevronRight 
                  className={`w-4 h-4 transform transition-transform ${
                    expandedFolders.includes(folder) ? 'rotate-90' : ''
                  }`} 
                />
                {expandedFolders.includes(folder) ? <VSCodeIcons.folderOpen /> : <VSCodeIcons.folder />}
                <span className="ml-1 text-[#CCCCCC]">{folder}</span>
              </button>

              {expandedFolders.includes(folder) && (
                <div className="ml-4">
                  {filteredFiles
                    .filter(file => file.folder === folder)
                    .map((file) => (
                      <button
                        key={file.name}
                        className={`flex items-center w-full hover:bg-[#2A2D2E] px-2 py-0.5 rounded-sm ${
                          activeFile === file.name ? 'bg-[#1F2233]' : ''
                        }`}
                        onClick={() => setActiveFile(file.name)}
                      >
                        {file.name.endsWith('.json') ? <VSCodeIcons.json /> : <VSCodeIcons.ts />}
                        <span className="ml-1 text-[#CCCCCC]">{file.name}</span>
                      </button>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const SkillBar = ({ skill, level }: { skill: string, level: number }) => (
    <div className="mb-2">
      <div className="flex justify-between mb-1">
        <span>{skill}</span>
        <span>{level}%</span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full">
        <motion.div
          className="h-full bg-[#007ACC] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1 }}
        />
      </div>
    </div>
  )

  const getContent = () => {
    switch(activeFile) {
      case 'about_me.ts':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Image 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eb455bc8-daa8-4329-bee6-e10e7eeeb0ef.jpg-zstCwpxboMf501rhZBmpGCZsd6ZTfs.jpeg" 
                alt="MD KAIF"
                width={128}
                height={128}
                className="rounded-full object-cover border-4 border-[#007ACC]"
              />
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  MD KAIF <span className="animate-wave inline-block">👋</span>
                </h1>
                <TypeAnimation
                  sequence={[
                    'Full Stack Developer',
                    2000,
                    'Cloud Technology Enthusiast',
                    2000,
                    'Information Security Specialist',
                    2000
                  ]}
                  wrapper="div"
                  cursor={true}
                  repeat={Infinity}
                  className="text-[#007ACC]"
                />
              </div>
            </div>
            
            <p className="text-[#8F8F8F] text-lg leading-relaxed">
              B.Tech CSE student specializing in Cloud Technology and Information Security, 
              with expertise in Python, JavaScript, React, Node.js, MongoDB, Django, and Docker.
            </p>

            <div className="flex items-center space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a 
                      href="https://www.linkedin.com/in/md-kaif101/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-[#2A2D2E] rounded-md transition-colors"
                    >
                      <Linkedin className="w-5 h-5 text-[#8F8F8F]" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Connect on LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a 
                      href="https://github.com/mdkaif10"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-[#2A2D2E] rounded-md transition-colors"
                    >
                      <Github className="w-5 h-5 text-[#8F8F8F]" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Check out my GitHub</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      className="bg-[#007ACC] hover:bg-[#1F8AD2] text-white"
                      onClick={() => window.location.href = 'mailto:Md.71.kaif@gmail.com'}
                    >
                      Contact Me
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Send me an email</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        )
      case 'experience.ts':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Experience</h2>
            <div className="space-y-4">
              {[
                {
                  title: 'SDE Intern',
                  company: 'ICM Guwahati',
                  period: '2024',
                  description: 'Worked on a Office Management System Project.'
                },
                {
                  title: 'Blockchain Head',
                  company: 'GDSC ADTU',
                  period: '2023 - 2024',
                  description: 'Led blockchain initiatives and organized technical events.'
                },
                {
                  title: 'Manager and Exam Controller Intern',
                  company: 'Nxtera Services',
                  period: '2023',
                  description: 'Developed internal software solutions and managed systems.'
                },
                {
                  title: 'Site Supervisor, IT Manager',
                  company: 'Aptech',
                  period: '2022-2023',
                  description: 'Supervised site operations and managed IT resources for exam administration. '
                }
              ].map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg bg-[#1F2233] hover:bg-[#2A2D2E] transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-white">{exp.title}</h3>
                    <span className="text-[#8F8F8F]">{exp.period}</span>
                  </div>
                  <p className="text-[#007ACC] mt-1">{exp.company}</p>
                  <p className="text-[#8F8F8F] mt-2">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )
      case 'projects.ts':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Student Management System',
                  tech: ['Python', 'Tkinter', 'SQLite'],
                  description: 'Comprehensive student record management system.'
                },
                {
                  title: 'Chat Application',
                  tech: ['React', 'Node.js', 'MongoDB'],
                  description: 'Real-time chat application with authentication.'
                }
              ].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg bg-[#1F2233] hover:bg-[#2A2D2E] transition-colors"
                >
                  <h3 className="font-medium text-white">{project.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-[#4D4D4D] text-white text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="text-[#8F8F8F] mt-2">{project.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )
      case 'contact.ts':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Contact</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-[#007ACC]" />
                <a href="mailto:Md.71.kaif@gmail.com" className="text-[#8F8F8F] hover:text-white">
                  Md.71.kaif@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Linkedin className="w-5 h-5 text-[#007ACC]" />
                <a 
                  href="https://www.linkedin.com/in/md-kaif101/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8F8F8F] hover:text-white"
                >
                  linkedin.com/in/md-kaif101
                </a>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-white mb-4">Skills</h3>
              <SkillBar skill="JavaScript" level={90} />
              <SkillBar skill="Python" level={85} />
              <SkillBar skill="React" level={80} />
              <SkillBar skill="Node.js" level={75} />
              <SkillBar skill="MongoDB" level={70} />
            </div>
          </div>
        )
      default:
        return (
          <div className="text-[#8F8F8F]">
            <p>Select a file to view its contents.</p>
          </div>
        )
    }
  }

  return (
    <div className={`flex flex-col h-screen ${theme === 'dark' ? 'bg-[#1E1E2E] text-[#CCCCCC]' : 'bg-[#F3F3F3] text-[#333333]'} text-sm`}>
      {/* Title bar */}
      <div className={`flex items-center justify-between px-4 py-2 ${theme === 'dark' ? 'bg-[#1F2233]' : 'bg-[#DDDDDD]'} ${theme === 'dark' ? 'text-[#8F8F8F]' : 'text-[#333333]'}`}>
        <div className="flex items-center">
          <FileCode2 className="w-4 h-4 mr-2" />
          <span>MD KAIF - Portfolio</span>
        </div>
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-2 hover:bg-[#2A2D2E] rounded" onClick={toggleTheme}>
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle theme</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-2 hover:bg-[#2A2D2E] rounded" onClick={() => setTerminalOpen(!terminalOpen)}>
                  <Terminal className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle terminal</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <button className="p-2 hover:bg-[#2A2D2E] rounded">
            <Minus className="w-4 h-4" />
          </button>
          <button 
            className="p-2 hover:bg-[#2A2D2E] rounded"
            onClick={() => setIsMaximized(!isMaximized)}
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-[#E81123] hover:text-white rounded">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Menu bar */}
      <div className={`flex items-center px-4 py-1 ${theme === 'dark' ? 'bg-[#1F2233] text-[#8F8F8F]' : 'bg-[#F3F3F3] text-[#616161]'} text-xs`}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span className="mr-4 cursor-pointer hover:text-white">File</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => window.print()}>
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </DropdownMenuItem>
            <DropdownMenuItem onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
              Toggle Theme
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <span className="mr-4">Edit</span>
        <span className="mr-4">Selection</span>
        <span className="mr-4">View</span>
        <span className="mr-4">Go</span>
        <span className="mr-4">Run</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span className="mr-4 cursor-pointer hover:text-white">Terminal</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setTerminalOpen(!terminalOpen)}>
              <Terminal className="w-4 h-4 mr-2" />
              {terminalOpen ? 'Close Terminal' : 'Open Terminal'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <span className="cursor-pointer hover:text-white" onClick={openHelpTerminal}>Help</span>
      </div>

      {/* Search bar */}
      <div className={`flex items-center px-4 py-2 ${theme === 'dark' ? 'bg-[#1F2233] border-[#2A2D2E]' : 'bg-[#F3F3F3] border-[#E7E7E7]'} border-b`}>
        <Search className="w-4 h-4 text-[#8F8F8F] mr-2" />
        <input
          type="text"
          placeholder="Search files..."
          className={`w-full bg-transparent border-none focus:outline-none ${theme === 'dark' ? 'text-[#CCCCCC] placeholder-[#8F8F8F]' : 'text-[#333333] placeholder-[#616161]'}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`w-64 ${theme === 'dark' ? 'bg-[#1E1E2E] border-[#2A2D2E]' : 'bg-[#F3F3F3] border-[#E7E7E7]'} border-r`}>
          <FileExplorer />
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-auto">
          <div className={`flex items-center px-4 py-2 ${theme === 'dark' ? 'bg-[#1F2233] text-[#8F8F8F] border-[#2A2D2E]' : 'bg-[#ECECEC] text-[#616161] border-[#E7E7E7]'} text-xs border-b`}>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-[#C4A000] mr-2" />
              <span>{activeFile}</span>
            </div>
          </div>
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFile}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {getContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Terminal */}
      <AnimatePresence>
        {terminalOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 200 }}
            exit={{ height: 0 }}
            className={`${theme === 'dark' ? 'bg-[#1E1E2E] text-[#A6ADC8]' : 'bg-[#FFFFFF] text-[#333333]'} p-4 overflow-auto`}
          >
            {terminalContent.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
            <div className="flex items-center mt-2">
              <span className="mr-2">{'>'}</span>
              <input
                ref={terminalInputRef}
                type="text"
                className={`flex-1 bg-transparent outline-none ${theme === 'dark' ? 'text-[#A6ADC8]' : 'text-[#333333]'}`}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleTerminalCommand(e.currentTarget.value)
                    e.currentTarget.value = ''
                  }
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status bar */}
      <div className={`flex items-center justify-between px-4 py-1 ${theme === 'dark' ? 'bg-[#007ACC] text-white' : 'bg-[#007ACC] text-white'} text-xs`}>
        <div className="flex items-center">
          <CircleDot className="w-3 h-3 mr-2" />
          <span>main</span>
        </div>
        <div className="flex items-center space-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={() => handleTerminalCommand('coffee')} className="hover:text-yellow-300 transition-colors">
                  <Coffee className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{`Buy me a coffee (${coffeeCount})`}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span>Ln 1, Col 1</span>
          <span>Spaces: 2</span>
          <span>UTF-8</span>
          <span>TypeScript</span>
        </div>
      </div>

      <style jsx global>{`
        @keyframes wave {
          0% { transform: rotate(0deg); }
          20% { transform: rotate(-14deg); }
          40% { transform: rotate(14deg); }
          60% { transform: rotate(-4deg); }
          80% { transform: rotate(4deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-wave {
          animation: wave 1.5s infinite;
        }
      `}</style>
    </div>
  )
}