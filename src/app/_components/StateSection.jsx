import Container from "./common/Container";

const StatsSection = () => {
  const stats = [
    { number: "10", label: "Years Experience" },
    { number: "240+", label: "Project Completed" },
    { number: "40+", label: "Design Award" },
    { number: "100+", label: "Client Satisfaction" },
  ];

  return (
    <Container>
      <div className="grid grid-cols-2 md:flex md:flex-row justify-between items-center gap-6 sm:gap-8 py-8 sm:py-10 md:py-12">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center px-2 sm:px-4"
          >
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              {stat.number}
            </span>
            <span className="text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default StatsSection;
