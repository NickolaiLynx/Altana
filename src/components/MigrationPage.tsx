import { PageHero } from "./common/PageHero";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle2, MessageSquare, FileText, Stethoscope, Users, Globe2, Shield } from "lucide-react";
import { useInView } from "../hooks/useInView";
import { Button } from "./ui/button";
import { QuizDialog } from "./QuizDialog";

export function MigrationPage() {
  const { ref: servicesRef, isInView: servicesInView } = useInView();
  const { ref: whenRef, isInView: whenInView } = useInView();

  const services = [
    {
      icon: MessageSquare,
      title: "Консультации по вопросам миграции",
      description: "Различные аспекты миграционного законодательства, разрешение на работу, патенты и регистрацию иностранного гражданина. Эти консультации помогают избежать ошибок и штрафов, связанных с нарушением закона."
    },
    {
      icon: FileText,
      title: "Оформление документов",
      description: "Процесс оформления документов для иностранных граждан является достаточно сложным и требует знания всех нюансов российского законодательства. Мы берём на себя всю бумажную работу, начиная от подготовки необходимых заявлений и заканчивая подачей документов в соответствующие органы власти."
    },
    {
      icon: Stethoscope,
      title: "Организация медицинского освидетельствования",
      description: "Для получения разрешения на работу иностранным гражданам необходимо пройти медицинское обследование. Мы организуем процесс прохождения медосмотра и получение соответствующих заключений."
    }
  ];

  const benefits = [
    "Легальное пребывание иностранных работников на территории РФ",
    "Минимизация рисков штрафов за нарушение миграционного законодательства",
    "Полное сопровождение процесса оформления документов",
    "Регулярный мониторинг изменений в законодательстве",
    "Своевременное информирование о новых требованиях",
    "Организация всех необходимых медицинских обследований"
  ];

  const whenToApply = [
    "При найме иностранных специалистов из стран ЕАЭС и дальнего зарубежья",
    "Для оформления разрешений на работу и патентов",
    "При необходимости постановки/снятия с миграционного учета",
    "Для организации медосмотров иностранных работников"
  ];

  return (
    <div className="min-h-screen bg-white relative" style={{ zIndex: 2 }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <PageHero
          breadcrumbs={[
            { label: "Главная", href: "#/" },
            { label: "Услуги", href: "#/services" },
            { label: "Миграционный учет" }
          ]}
          title="Миграционный учет"
          description="Предоставляем услуги в области миграционного законодательства, обеспечивающие легальное пребывание и трудоустройство иностранных граждан на территории Российской Федерации. Работа с иностранными гражданами в процессе трудоустройства несет определенные риски, связанные с возможным нарушением миграционных норм. Наше агентство помогает минимизировать эти риски путем регулярного мониторинга изменений в законодательстве и своевременного информирования клиентов о новых требованиях."
          className="py-16 md:py-24"
          ctaButton={
            <QuizDialog
              initialStep={2}
              preselectedBranch="migration"
              trigger={
                <Button 
                  size="lg"
                  className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-8"
                >
                  Получить консультацию
                </Button>
              }
            />
          }
        />
      </section>

      {/* Main Services Section */}
      <section ref={servicesRef} className="py-16 md:py-24 bg-[#F2F2F2]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#D32F2F] hover:bg-[#D32F2F]">Наши услуги</Badge>
            <h2 className="text-gray-900 mb-4 text-[24px] font-semibold">Комплексное сопровождение миграционных процессов</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Три ключевых направления для обеспечения легальной работы иностранных граждан
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={index}
                  className={`p-8 border-gray-200 hover:shadow-lg transition-all duration-700 bg-white ${
                    servicesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 bg-[#D32F2F]/10 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-[#D32F2F]" />
                  </div>
                  <h3 className="text-gray-900 mb-3 text-[18px] font-medium">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* When to Apply Section */}
      <section ref={whenRef} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-[#D32F2F] hover:bg-[#D32F2F]">Когда обратиться</Badge>
              <h2 className="text-gray-900 mb-4 text-[24px] font-semibold">В каких ситуациях нужна наша помощь</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Своевременное обращение поможет избежать проблем с миграционным законодательством
              </p>
            </div>

            <div className="space-y-4">
              {whenToApply.map((item, index) => (
                <div 
                  key={index}
                  className={`flex items-start gap-4 p-6 bg-gray-50 rounded-lg transition-all duration-700 ${
                    whenInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CheckCircle2 className="w-6 h-6 text-[#D32F2F] flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-[#F2F2F2]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-gray-900 mb-4 text-[24px] font-semibold">Что вы получите</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg">
                  <CheckCircle2 className="w-6 h-6 text-[#D32F2F] flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-gray-900 mb-6 text-[24px] font-semibold">
              Готовы получить консультацию?
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Оставьте заявку, и мы свяжемся с вами для обсуждения вашей ситуации и возможных решений
            </p>
            <QuizDialog
              initialStep={2}
              preselectedBranch="migration"
              trigger={
                <Button 
                  size="lg"
                  className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-8"
                >
                  Получить консультацию
                </Button>
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
}