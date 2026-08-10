import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ProblemSection from '@/components/ProblemSection'
import CoreInsight from '@/components/CoreInsight'
import RobotShowcase from '@/components/RobotShowcase'
import HowItWorks from '@/components/HowItWorks'
import StoryArchive from '@/components/StoryArchive'
import Languages from '@/components/Languages'
import Technology from '@/components/Technology'
import Impact from '@/components/Impact'
import BusinessModel from '@/components/BusinessModel'
import FutureVision from '@/components/FutureVision'
import Team from '@/components/Team'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProblemSection />
      <CoreInsight />
      <RobotShowcase />
      <HowItWorks />
      <StoryArchive />
      <Languages />
      <Technology />
      <Impact />
      <BusinessModel />
      <FutureVision />
      <Team />
      <Footer />
    </main>
  )
}
