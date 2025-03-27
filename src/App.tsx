import { AnimatePresence, motion, useMotionTemplate, useMotionValueEvent, useScroll, useSpring, useTransform } from 'motion/react'
import { cn } from './lib/utils'
import { GeistSans } from 'geist/font/sans'
import { IoMdClose, IoIosRocket } from "react-icons/io"
import { MdOutlineMessage } from "react-icons/md"
import { ReactNode, useRef, useState } from 'react'

const App = () => {
  const [open, setOpen] = useState(true)
  const bgs = ['#343434', '#00193b', '#05291c', '#171717']
  const ref = useRef<HTMLDivElement>(null)
  const [bg, setBg] = useState(bgs[0])
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  useMotionValueEvent(scrollYProgress, 'change', latest => setBg(bgs[Math.floor(latest * bgs.length)]))
  return (
    <>
      {/* 1 */}
      {/* <div
        className='h-screen w-full bg-neutral-900 flex items-center justify-center [perspective:1000px] [transform-style:preserve-3d]'
        style={{
          backgroundImage: `radial-gradient(circle at 0.5px 0.5px, rgba(6,182,212,0.2) 0.5px, transparent 0)`,
          backgroundSize: '8px 8px',
          backgroundRepeat: 'repeat'
        }}
      >
        <motion.button
          // initial={{ rotate: 0 }}
          // animate={{ rotate: [0,20,0] }}
          // exit={{}}
          // transition={{
          //   duration: 2,
          //   ease:'easeInOut',
          // }}
          whileHover={{
            rotateX: 20,
            rotateY: 20,
            boxShadow: '0px 20px 50px rgba(8,112,184,0.7)',
            y: -15
          }}
          whileTap={{ y: 0 }}
          style={{ translateZ: 100 }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut'
          }}
          className='text-neutral-500 px-12 py-4 rounded-lg bg-black shadow-[0px_1px_4px_0px_rgba(255,255,255,0.1)_inset,0px_-1px_2px_0px_rgba(255,255,255,0.1)_inset] relative group'>
          <span className='group-hover:text-cyan-500 transition-colors duration-300'>
            Button
          </span>
          <span className='absolute inset-x-0 bottom-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent h-px w-3/4 mx-auto' />
          <span className='absolute inset-x-0 bottom-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent h-[4px] w-full mx-auto blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
        </motion.button>
      </div> */}
      {/* 2 */}
      {/* <div className={cn('h-screen flex items-center justify-center bg-gray-50',)}>
        <AnimatePresence>
          {open &&
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.98,
                filter: 'blur(10px)'
              }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)'
              }}
              exit={{
                opacity: 0,
                scale: 0.98,
                filter: 'blur(10px)'
              }}
              transition={{
                duration: 0.5,
                ease: 'easeInOut'
              }}
              className="w-72 h-[28rem] rounded-xl shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.05)] p-6 flex flex-col bg-white"
            >
              <h2 className='font-bold text-[10px]'>
                UI Components
              </h2>
              <p className='text-neutral-600 mt-2 text-[10px]'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, facere?
              </p>
              <div className="flex items-center justify-center">
                <button
                  onClick={() => setOpen(false)}
                  className='flex items-center gap-1 text-[10px] mt-4 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.05)] rounded-md px-2 py-1'
                >
                  <img src="" alt="logo" className='h-4 w-4' />
                  Supradeep UI
                  <IoMdClose className='h-3 w-3 text-neutral-400' />
                </button>
              </div>
              <div className="flex-1 mt-4 rounded-lg bg-gray-100 border border-dashed border-neutral-100 relative">
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.95,
                    filter: 'blur(10px)'
                  }}
                  whileHover={{
                    opacity: 1,
                    scale: 1.05,
                    filter: 'blur(0px)'
                  }}
                  transition={{
                    duration: .3,
                    ease: 'easeInOut'
                  }}
                  className="absolute inset-0 h-full w-full rounded-lg bg-white divide-y divide-neutral-200 border border-neutral-200">
                  {Array.from({ length: 4 }).map(() => <div className="flex gap-2 p-4">
                    <div className="h-7 w-7 flex-shrink-0 bg-gradient-to-br bg-white rounded-md flex items-center justify-center shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.05)]">
                      <MdOutlineMessage className='h-4 w-4 text-neutral-600' />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[8px] font-bold text-neutral-600">
                        UI Components
                      </p>
                      <p className="text-[8px] mt-1 text-neutral-400">
                        A collection of UI Components
                      </p>
                    </div>
                  </div>
                  )}
                  <div className="flex items-center justify-center gap-2 p-4">
                    <div className="h-7 w-7 flex-shrink-0 bg-gradient-to-br bg-white rounded-md flex items-center justify-center shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.05)]">
                      <MdOutlineMessage className='h-4 w-4 text-neutral-600' />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[8px] mt-1 text-neutral-400">
                        A collection of UI Components
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>}
        </AnimatePresence>
      </div> */}
      {/* 3 */}

      {/* 4 */}
      <motion.div
        className="flex min-h-screen items-center justify-center bg-neutral-900"
        ref={ref}
        style={{ background: bg }}
        animate={{ background: bg }}
        transition={{
          duration: 1,
          ease: 'easeInOut'
        }}
      >
        <div className="flex flex-col gap-10 mx-auto max-w-4xl py-40">
          {features.map((f, i) => <Card feature={f} key={i} />)}
        </div>
      </motion.div>
    </>
  )
}

const Card = ({ feature }: { feature: Feature }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  useMotionValueEvent(scrollYProgress, 'change', latest => console.log('Changed values', latest))
  // const translateContent = useTransform(scrollYProgress, [0, 1], [200, -300])
  const translateContent = useSpring(
    useTransform(scrollYProgress, [0, 1], [200, -300]),
    {
      stiffness: 100,
      damping: 30,
      mass: 1
    }
  )
  const opacity = useTransform(scrollYProgress, [0, .5, 1], [0, 1, 0])
  const blur = useTransform(scrollYProgress, [0.5, 1], [0, 10])
  const scale = useTransform(scrollYProgress, [0.5, 1], [1, .8])
  return (
    <div className="grid grid-cols-2 gap-20 items-center py-40" ref={ref}>
      <motion.div
        className="flex flex-col gap-5"
        style={{
          filter: useMotionTemplate`blur(${blur}px)`,
          scale
        }}>
        {feature.icon}
        <h2 className='text-4xl font-bold text-white'>
          {feature.title}
        </h2>
        <p className='text-neutral-400 text-lg'>
          {feature.description}
        </p>
      </motion.div>
      <motion.div
        className=""
        style={{
          y: translateContent,
          opacity
        }}>
        {feature.content}
      </motion.div>
    </div>
  )
}

const features: Feature[] = [
  {
    icon: <IoIosRocket className='h-8 w-8 text-neutral-200' />,
    title: 'Speedy Delivery',
    description: 'Get your products delivered faster than ever.',
    content: (
      <div>
        <img src="https://assets.aceternity.com/pro/car-1.jpg" alt="car" className='rounded-lg' />
      </div>
    ),
  },
  {
    icon: <IoIosRocket className='h-8 w-8 text-neutral-200' />,
    title: 'Eco-friendly',
    description: 'Our products are built with sustainability in mind.',
    content: (
      <div>
        <img src="https://assets.aceternity.com/pro/car-2.jpg" alt="car" className='rounded-lg' />
      </div>
    ),
  },
  {
    icon: <IoIosRocket className='h-8 w-8 text-neutral-200' />,
    title: 'Reliable Performance',
    description: 'Count on us for consistent quality and performance.',
    content: (
      <div>
        <img src="https://assets.aceternity.com/pro/car-3.jpg" alt="car" className='rounded-lg' />
      </div>
    ),
  },
  {
    icon: <IoIosRocket className='h-8 w-8 text-neutral-200' />,
    title: 'Innovative Design',
    description: 'Designed with cutting-edge technology and style.',
    content: (
      <div>
        <img src="https://assets.aceternity.com/pro/car-4.jpg" alt="car" className='rounded-lg' />
      </div>
    ),
  },
]

type Feature = {
  icon: ReactNode
  title: string
  description: string
  content: ReactNode
}

export default App
