import { AnimatePresence, motion, useMotionTemplate, useMotionValueEvent, useScroll, useSpring, useTransform } from 'motion/react'
import { cn } from './lib/utils'
import { GeistSans } from 'geist/font/sans'
import { IoMdClose, IoIosRocket } from "react-icons/io"
import { MdOutlineMessage } from "react-icons/md"
import { ReactNode, RefObject, useEffect, useRef, useState } from 'react'

type UseOutsideClickProps = {
  ref: RefObject<HTMLElement | null>;
  handler: (event: MouseEvent | TouchEvent) => void;
  enabled?: boolean;
};

function useOutsideClick({ ref, handler, enabled = true }: UseOutsideClickProps) {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, enabled]);
}

const navItems = [
  {
    title: 'Home',
    href: '/'
  },
  {
    title: 'About',
    href: '/about'
  },
  {
    title: 'Contact',
    href: '/contact'
  },
  {
    title: 'Login',
    href: '/login'
  },
]

const App = () => {
  const [open, setOpen] = useState(true)
  const bgs = ['#343434', '#00193b', '#05291c', '#171717']
  const [current, setCurrent] = useState<Card | null>(null)
  const ref = useRef<HTMLDivElement | null>(null);

  useOutsideClick({
    ref,
    handler: () => setCurrent(null),
    enabled: !!current, // ✅ activates only when current is set
  });
  const [bg, setBg] = useState(bgs[0])
  const [hovered, setHovered] = useState<null | number>(null)
  const { scrollYProgress } = useScroll({
    // target: ref,
    offset: ['start end', 'end start']
  })
  // useMotionValueEvent(scrollYProgress, 'change', latest => setBg(bgs[Math.floor(latest * bgs.length)]))
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
      {/* <motion.div
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
      </motion.div> */}

      {/* 5.1 */}
      {/* <div className="py-10 bg-gray-100 min-h-screen relative">
        {current && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed z-10 w-full h-full inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div
              layoutId={`card-${current.title}`}
              ref={ref}
              className='h-[500px] w-72 rounded-2xl border border-neutral-200 p-4 fixed inset-0 z-20 m-auto bg-white overflow-hidden'>
              <motion.img layoutId={`img-${current.title}`} src={current.src} alt={current.title} className='w-full aspect-square rounded-xl' />
              <div className="flex justify-between items-start flex-col">
                <div className="flex justify-between w-full items-start gap-2 py-4">
                  <div className="flex flex-col items-start gap-2">
                    <motion.h2 layoutId={`title-${current.title}`} className="font-bold text-xs tracking-tight text-black">
                      {current.title}
                    </motion.h2>
                    <motion.p layoutId={`desc-${current.title}`} className="text-xs text-neutral-500">
                      {current.description}
                    </motion.p>
                  </div>
                  <motion.div className="" layoutId={`cta-${current.title}`}>
                    <a href={current.ctaLink} className="px-2 py-1 bg-green-500 rounded-full text-white text-xs">
                      {current.ctaText}
                    </a>
                  </motion.div>
                </div>
                <motion.div
                  initial={{
                    filter: 'blur(10px)',
                    opacity: 0
                  }}
                  animate={{
                    filter: 'blur(0px)',
                    opacity: 1
                  }}
                  transition={{ delay: .3 }}
                  className="h-50 overflow-auto pb-20 [mask-image:linear-gradient(to_top,transparent_20%,black_50%)]"
                >
                  {current.content()}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
        <div className="max-w-lg flex flex-col mx-auto gap-10">
          {cards.map((c, i) => (
            <motion.button
              layoutId={`card-${c.title}`}
              onClick={() => setCurrent(c)}
              key={i}
              className="p-4 rounded-lg flex justify-between items-center bg-white border border-neutral-200 cursor-pointer">
              <div className="flex gap-4 items-center">
                <motion.img layoutId={`img-${c.title}`} src={c.src} alt={c.title} className='h-20 aspect-square rounded-xl' />
                <div className="flex flex-col items-start gap-2">
                  <motion.h2 layoutId={`title-${c.title}`} className="font-bold text-xs tracking-tight text-black">
                    {c.title}
                  </motion.h2>
                  <motion.p layoutId={`desc-${c.title}`} className="text-xs text-neutral-500">
                    {c.description}
                  </motion.p>
                </div>
              </div>
              <motion.div layoutId={`cta-${c.title}`} className="px-2 py-1 bg-green-500 rounded-full text-white text-xs">
                {c.ctaText}
              </motion.div>
            </motion.button>
          ))}
        </div>
      </div> */}

      {/* 5.2 */}
      <div className="py-40">
        <nav className="max-w-xl mx-auto bg-gray-100 rounded-full px-2 py-1 flex">
          {navItems.map((i, n) => (
            <a
              onMouseEnter={() => setHovered(n)}
              onMouseLeave={() => setHovered(null)}
              href={i.href}
              key={i.href}
              className='w-full relative text-center text-xs py-3 hover:text-white'>
              {hovered === n && <motion.div layoutId='hover' className='absolute inset-0 rounded-full w-full h-full bg-black' />}
              <motion.span
                animate={{ color: hovered === n ? 'white' : 'black' }}
                className="relative z-20">
                {i.title}
              </motion.span>
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}

const cards: Card[] = [
  {
    description: 'Lana Del Rey',
    title: 'Summertime Sadness',
    src: 'https://assets.aceternity.com/demos/lana-del-rey.jpeg',
    ctaText: 'Play',
    ctaLink: 'https://ui.aceternity.com/templates',
    content: () => (
      <p className="text-[10px] text-neutral-500">
        “Summertime Sadness” is an atmospheric ballad blending haunting vocals with cinematic
        instrumentals. It captures the bittersweet feeling of fleeting romance and the melancholic
        beauty of summer's end. Lana’s nostalgic lyricism turns heartbreak into poetry, wrapped in
        dreamy melancholy.
      </p>
    )
  },
  {
    description: 'The Weeknd',
    title: 'Blinding Lights',
    src: 'https://assets.aceternity.com/demos/the-weeknd.jpeg',
    ctaText: 'Play',
    ctaLink: 'https://ui.aceternity.com/templates',
    content: () => (
      <p className="text-[10px] text-neutral-500">
        A synthwave masterpiece that instantly throws you into a retro night drive through neon-lit
        streets. With pulsating beats and urgent vocals, “Blinding Lights” is both a modern pop
        triumph and a heartfelt cry for connection, showcasing The Weeknd’s artistic versatility.
      </p>
    )
  },
  {
    description: 'Billie Eilish',
    title: 'Ocean Eyes',
    src: 'https://assets.aceternity.com/demos/billie-eilish.jpeg',
    ctaText: 'Play',
    ctaLink: 'https://ui.aceternity.com/templates',
    content: () => (
      <p className="text-[10px] text-neutral-500">
        Delicate and ethereal, “Ocean Eyes” introduced the world to Billie Eilish’s haunting voice
        and emotional depth. With mesmerizing melodies and poetic vulnerability, it paints a vivid
        portrait of young love, heartbreak, and longing — soft, slow, and soul-stirring.
      </p>
    )
  },
  {
    description: 'Frank Ocean',
    title: 'Pink + White',
    src: 'https://assets.aceternity.com/demos/frank-ocean.jpeg',
    ctaText: 'Play',
    ctaLink: 'https://ui.aceternity.com/templates',
    content: () => (
      <p className="text-[10px] text-neutral-500">
        “Pink + White” is a lush, spiritual meditation on love, loss, and impermanence. With
        production by Pharrell and background vocals by Beyoncé, Frank Ocean delivers a delicate,
        flowing performance that feels like watching clouds drift through a soft, golden sky.
      </p>
    )
  },
  {
    description: 'Taylor Swift',
    title: 'All Too Well (10 Minute Version)',
    src: 'https://assets.aceternity.com/demos/taylor-swift.jpeg',
    ctaText: 'Play',
    ctaLink: 'https://ui.aceternity.com/templates',
    content: () => (
      <p className="text-[10px] text-neutral-500">
        A lyrical epic drenched in raw emotion, “All Too Well (10 Minute Version)” tells the
        intricate story of a relationship's rise and fall. With vivid storytelling, powerful
        imagery, and a soaring finale, Taylor captures the ache of memory and the scars of
        love lost — in a way only she can.
      </p>
    )
  }
]

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

type Card = {
  description: string
  title: string
  src: string
  ctaText: string
  ctaLink: string
  content: () => ReactNode
}

export default App
