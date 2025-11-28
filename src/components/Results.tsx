import { useInView } from "../hooks/useInView";
import TabletIllustration from "../imports/TabletIllustration";
import { casesData, serviceNames } from "../data/cases";
import { CaseCard } from "./common/CaseCard";
import { RedButton } from "./common/RedButton";

export function Results() {
  const { ref, isInView } = useInView();
  
  // Берем по 1 кейсу из каждой категории услуг
  const featuredCases = [
    {
      ...casesData.recruitment[0],
      category: serviceNames.recruitment,
    },
    {
      ...casesData.audit[0],
      category: serviceNames.audit,
    },
    {
      ...casesData.migration[0],
      category: serviceNames.migration,
    },
  ];

  return (
    <section ref={ref} className="relative py-16 md:py-24 bg-[#F2F2F2]" style={{ zIndex: 2 }}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-700 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-gray-900 mb-4 text-[24px] font-semibold">Конкретные результаты</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Кейсы из нашей практики — реальные истории работы с клиентами
          </p>
        </div>

        {/* Layout: 33% image + 67% cases */}
        <div className="grid lg:grid-cols-[33%_67%] gap-8 items-start">
          {/* Fixed logo */}
          <div className="sticky top-24 hidden lg:block">
            <div className="w-full aspect-square">
              <TabletIllustration />
            </div>
          </div>

          {/* Cases column */}
          <div className="space-y-6">
            {featuredCases.map((caseItem, index) => (
              <CaseCard
                key={caseItem.id}
                id={caseItem.id}
                title={caseItem.title}
                task={caseItem.task}
                shortMetric={caseItem.shortMetric}
                shortMetricLabel={caseItem.shortMetricLabel}
                services={[caseItem.category]}
                variant="list"
                className={isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                style={{ transitionDelay: `${index * 150}ms` }}
              />
            ))}

            {/* Button */}
            <div className={`pt-4 transition-all duration-700 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`} style={{ transitionDelay: '450ms' }}>
              <RedButton 
                variant="outline" 
                href="#/cases"
                className="w-full sm:w-auto"
              >
                Смотреть все результаты
              </RedButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}