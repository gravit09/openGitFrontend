function how() {
  const steps = [
    {
      number: "01",
      title: "Discover Projects",
      description: "Explore repositories that match your skills and interests",
    },
    {
      number: "02",
      title: "Start Contributing",
      description: "Fork, code, and submit pull requests to make an impact",
    },
    {
      number: "03",
      title: "Build Your Portfolio",
      description:
        "Showcase your contributions and grow your developer profile",
    },
  ];
  return (
    <section id="how-it-works" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            How OpenGit Works
          </h2>
          <p className="text-xl text-gray-400">
            Simple steps to start contributing to open source
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto text-black">
                {step.number}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                {step.title}
              </h3>
              <p className="text-gray-400 text-lg">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default how;
