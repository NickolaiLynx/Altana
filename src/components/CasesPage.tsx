import { PageHero } from "./common/PageHero";
import { CaseCard } from "./common/CaseCard";
import { casesData, serviceNames } from "../data/cases";

export function CasesPage() {
  // Собираем все кейсы в один массив
  const allCases = [
    ...casesData.recruitment.map(c => ({ ...c, category: 'recruitment' })),
    ...casesData.audit.map(c => ({ ...c, category: 'audit' })),
    ...casesData.migration.map(c => ({ ...c, category: 'migration' })),
  ];

  return (
    <div className="min-h-screen bg-gray-50 relative" style={{ zIndex: 2 }}>
      {/* Hero Section */}
      <PageHero
        breadcrumbs={[
          { label: "Главная", href: "#/" },
          { label: "Кейсы" }
        ]}
        title="Кейсы"
        description="Реальные истории работы с клиентами — от постановки задачи до конкретных результатов"
      />

      {/* Cases Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {allCases.map((caseItem) => (
              <CaseCard
                key={caseItem.id}
                id={caseItem.id}
                title={caseItem.title}
                task={caseItem.task}
                shortMetric={caseItem.shortMetric}
                shortMetricLabel={caseItem.shortMetricLabel}
                services={caseItem.services}
                variant="grid"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}