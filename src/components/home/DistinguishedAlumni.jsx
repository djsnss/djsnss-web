import { motion } from 'framer-motion'

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
    <div className="bg-white">
      {/* Decorative Line */}
      <div className="h-1 bg-dark-navy m-6"></div>

      <div className="text-center mb-8">
        <h2 className="text-dark-navy text-4xl font-bold tracking-wide">
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
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-6"
      >
        {alumni.map((alumnus, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-misty-blue p-4 rounded-lg"
          >
            <img
              src={alumnus.image}
              alt={alumnus.name}
              className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-bright-bg-bright-blue"
            />
            <h3 className="text-white font-semibold text-xl">{alumnus.name}</h3>
            <p className="text-light-gray text-sm mt-2">{alumnus.position}</p>
          </div>
        ))}
      </motion.div>

      {/* Decorative Line */}
      <div className="h-1 bg-dark-navy m-6"></div>
    </div>
  )
}

export default DistinguishedAlumni
