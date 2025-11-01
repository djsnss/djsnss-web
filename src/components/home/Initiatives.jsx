import Card from "./Card"
import { motion } from "framer-motion"
import { common } from "../../data/common"

const Initiatives = () => {
  return (
    <section id="initiative" className="py-20 bg-primary-blue">
      <motion.div
        className="w-full mx-auto text-center"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold font-geist text-tertiary-blue text-center mb-4">
          Initiatives
        </h1>
        <p className="text-lg text-black mb-4 md:mb-8 font-roboto mx-4 md:mx-0">
          We have been involved in various initiatives that have made a
          significant impact on society. Here are some of the initiatives we
          have undertaken.
        </p>
      </motion.div>

      <div className="mx-auto flex flex-wrap justify-center gap-8">
        {common
          .filter((event) => [1, 2, 3, 5, 8].includes(event.id))
          .map((event, index) => (
            <div
              key={index}
              className={`transform transition-transform ${
                index % 2 === 0 ? "xl:mt-16" : "xl:mt-0"
              }`}
            >
              <Card
                name={event.title}
                imageUrl={event.imageURL}
                link={event.link}
                shortDesc={event.description}
              />
            </div>
          ))}
      </div>
    </section>
  )
}

export default Initiatives
 