import { motion } from 'framer-motion'
import CardNew from './CardNew'

const DistinguishedAlumni = () => {
  const alumni = [
    {
      name: 'Alex Carter',
      position: 'Software Engineer at TechCorp',
      image: 'https://via.placeholder.com/150'
    },
    {
      name: 'Maya Lee',
      position: 'Creative Director at DesignCo',
      image: 'https://via.placeholder.com/150'
    },
    {
      name: 'Jordan Smith',
      position: 'Data Scientist at AnalyticsHub',
      image: 'https://via.placeholder.com/150'
    },
    {
      name: 'Emma Rodriguez',
      position: 'Product Manager at BuildIt',
      image: 'https://via.placeholder.com/150'
    }
  ]

  return (
    <div className="bg-white my-7">
      {/* Decorative Line
      <div className="h-1 bg-dark-navy m-6"></div> */}

      <div className="text-center mb-8">
        <h2 className="text-dark-navy text-5xl underline font-bold tracking-wide">
          Distinguished Alumni
        </h2>
        <p className="text-light-gray mt-2 text-lg">
          Meet some of our accomplished alumni who are making a difference in their fields.
        </p>
      </div>

      {/* Alumni Grid */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-row flex-wrap justify-center items-center gap-10 p-6"
      >
        {alumni.map((alumnus, index) => (
          <CardNew img={alumnus.img} name={alumnus.name} position={alumnus.position} key={index} />
        ))}
      </motion.div>

      {/* Decorative Line
      <div className="h-1 bg-dark-navy m-6"></div> */}
    </div>
  )
}

export default DistinguishedAlumni
