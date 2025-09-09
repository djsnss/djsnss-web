import Card from "./Card";
import { motion } from "framer-motion";
import { common } from "../../data/common";

const Initiatives = () => {
  return (
    <section id="initiative" className="py-20 bg-blue-50">
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 text-center mb-4">
          Initiatives
        </h1>
        <p className="text-lg text-gray-800 mb-4 md:mb-8">
          We have been involved in various initiatives that have made a
          significant impact on society. Here are some of the initiatives we
          have undertaken.
        </p>
      </motion.div>
      <div className="mx-auto flex flex-wrap justify-center gap-8">
        {common
          .filter((event) => [1, 2, 3, 5, 8].includes(event.id))
          .map((event, index) => {
            return (
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
            );
          })}
      </div>
    </section>
  );
};

export default Initiatives;
