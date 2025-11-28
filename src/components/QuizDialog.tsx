import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { Slider } from "./ui/slider";
import { Progress } from "./ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCloseOnRouteChange } from "../hooks/useCloseOnRouteChange";

type Branch =
  | "recruitment"
  | "audit"
  | "migration"
  | "exploring"
  | null;

interface QuizAnswers {
  branch: Branch;
  // Recruitment
  positions?: string;
  regions?: string[];
  workFormat?: string[];
  startDate?: string;
  positionsCount?: number;
  // Audit
  auditReasons?: string[];
  staffSize?: number;
  hasBranches?: string;
  auditDeadline?: string;
  needImplementation?: string;
  // Migration
  citizenType?: string;
  migrationNeeds?: string[];
  peopleCount?: number;
  migrationDeadline?: string;
  // Exploring
  interests?: string[];
  contactMethod?: string;
  materials?: string[];
  consultationTime?: string[];
  // Form data
  name?: string;
  company?: string;
  phone?: string;
  email?: string;
  comment?: string;
}

interface QuizDialogProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  initialStep?: number;
  preselectedBranch?: Branch;
}

export function QuizDialog({
  trigger,
  open: controlledOpen,
  onOpenChange,
  initialStep = 1,
  preselectedBranch,
}: QuizDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open =
    controlledOpen !== undefined
      ? controlledOpen
      : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [answers, setAnswers] = useState<QuizAnswers>({
    branch: preselectedBranch || null,
  });
  const [showThankYou, setShowThankYou] = useState(false);

  // Отслеживаем открытие квиза и сохраняем в sessionStorage
  useEffect(() => {
    if (open) {
      sessionStorage.setItem("quizWasOpened", "true");
    }
  }, [open]);

  // Закрываем диалог при изменении маршрута
  useCloseOnRouteChange(() => setOpen(false));

  const getTotalSteps = () => 5;
  const progress = (currentStep / getTotalSteps()) * 100;

  const resetQuiz = () => {
    setCurrentStep(initialStep);
    setAnswers({ branch: preselectedBranch || null });
    setShowThankYou(false);
  };

  const handleNext = () => {
    if (currentStep < getTotalSteps()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > initialStep) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In production: send data to backend
    console.log("Quiz submitted:", answers);
    
    setShowThankYou(true);
  };

  const handleDialogChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setTimeout(resetQuiz, 300);
    }
  };

  const getBonusText = () => {
    switch (answers.branch) {
      case "recruitment":
        return "Отправим прогноз сроков закрытия и условия подбора за 24–48 часов + чек-лист «Как ускорить закрытие вакансии в горнодобыче»";
      case "audit":
        return "Выделим 15 критичных пунктов «на сегодня» и пришлем экспресс-отчет 0 ₽ + шаблон плана исправлений";
      case "migration":
        return "Пришлем персональный календарь сроков и список документов + 30-мин консультация без оплаты";
      case "exploring":
        return "Отправим выбранные материалы и подберем время мини-консультации";
      default:
        return "";
    }
  };

  const getButtonText = () => {
    switch (answers.branch) {
      case "recruitment":
        return "Получить план и чек-лист";
      case "audit":
        return "Получить экспресс-аудит 0 ₽";
      case "migration":
        return "Получить календарь и консультацию";
      case "exploring":
        return "Получить материалы";
      default:
        return "Отправить";
    }
  };

  const renderStepContent = () => {
    if (showThankYou) {
      return (
        <>
          <DialogDescription asChild>
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-[#D32F2F]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-[#D32F2F]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-gray-900 mb-4 text-[18px] font-medium">
                Спасибо!
              </h3>
              <p className="text-gray-600 mb-6">
                Мы обработаем ответы и пришлем план в течение
                24–48 часов.
                <br />
                Если срочно — позвоните:{" "}
                <a
                  href="tel:+79143997401"
                  className="text-[#D32F2F] hover:underline"
                >
                  +7 (914) 399 7401
                </a>
              </p>
              <Button
                onClick={() => handleDialogChange(false)}
                className="bg-[#D32F2F] hover:bg-[#B71C1C]"
              >
                Закрыть
              </Button>
            </div>
          </DialogDescription>
        </>
      );
    }

    // Step 1: Branch selection
    if (currentStep === 1) {
      return (
        <div className="space-y-4">
          <h3 className="text-gray-900 mb-6 text-[18px] font-medium">
            Что актуально для вас сейчас?
          </h3>
          <RadioGroup
            value={answers.branch || ""}
            onValueChange={(value) =>
              setAnswers({
                ...answers,
                branch: value as Branch,
              })
            }
          >
            <div className="space-y-3">
              <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-[#D32F2F] transition-colors">
                <RadioGroupItem
                  value="recruitment"
                  id="recruitment"
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="text-gray-900 mb-1">
                    Подбор сотрудников для горнодобычи
                  </div>
                  <div className="text-gray-500 text-sm flex items-start gap-2">
                    <span className="bg-[#D32F2F] text-white px-2 py-0.5 rounded text-xs whitespace-nowrap">
                      Бонус
                    </span>
                    <span>
                      Экспресс-диагностика вакансии за 48 часов:
                      прогноз сроков закрытия, карта источников
                      поиска, чек-лист «Как ускорить выход за 14
                      дней»
                    </span>
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-[#D32F2F] transition-colors">
                <RadioGroupItem
                  value="audit"
                  id="audit"
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="text-gray-900 mb-1">
                    Кадровый аудит и наведение порядка в
                    документах
                  </div>
                  <div className="text-gray-500 text-sm flex items-start gap-2">
                    <span className="bg-[#D32F2F] text-white px-2 py-0.5 rounded text-xs whitespace-nowrap">
                      Бонус
                    </span>
                    <span>
                      Экспресс-аудит 15 критичных пунктов 0 ₽ +
                      краткий отчет по рискам с приоритетами
                    </span>
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-[#D32F2F] transition-colors">
                <RadioGroupItem
                  value="migration"
                  id="migration"
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="text-gray-900 mb-1">
                    Миграционный учет и оформление иностранных
                    сотрудников
                  </div>
                  <div className="text-gray-500 text-sm flex items-start gap-2">
                    <span className="bg-[#D32F2F] text-white px-2 py-0.5 rounded text-xs whitespace-nowrap">
                      Бонус
                    </span>
                    <span>
                      Набор шаблонов и инструкций: уведомления о
                      приеме/увольнении/прибытии
                      <br />+ 30-мин консультация по маршруту
                      легализации
                    </span>
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-[#D32F2F] transition-colors">
                <RadioGroupItem
                  value="exploring"
                  id="exploring"
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="text-gray-900 mb-1">
                    Пока изучаю — хочу консультацию и полезные
                    материалы
                  </div>
                </div>
              </label>
            </div>
          </RadioGroup>
        </div>
      );
    }

    // Branch-specific steps
    if (answers.branch === "recruitment") {
      return renderRecruitmentSteps();
    } else if (answers.branch === "audit") {
      return renderAuditSteps();
    } else if (answers.branch === "migration") {
      return renderMigrationSteps();
    } else if (answers.branch === "exploring") {
      return renderExploringSteps();
    }

    return null;
  };

  const renderRecruitmentSteps = () => {
    if (currentStep === 2) {
      return (
        <div className="space-y-4">
          <h3 className="text-gray-900 mb-6 text-[18px] font-medium">
            Какие позиции нужно закрыть в первую очередь?
          </h3>
          <RadioGroup
            value={answers.positions || ""}
            onValueChange={(value) =>
              setAnswers({ ...answers, positions: value })
            }
          >
            <div className="space-y-3">
              {[
                {
                  value: "workers",
                  label: "Линейный персонал (рабочие)",
                },
                {
                  value: "engineers",
                  label:
                    "Инженерно-технические специалисты (ИТР)",
                },
                {
                  value: "managers",
                  label: "Руководители/топ-менеджмент",
                },
                {
                  value: "multiple",
                  label: "Несколько разных позиций",
                },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-[#D32F2F] transition-colors"
                >
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                  />
                  <div className="text-gray-900">
                    {option.label}
                  </div>
                </label>
              ))}
            </div>
          </RadioGroup>
        </div>
      );
    }

    if (currentStep === 3) {
      const regions = [
        "Амурская область",
        "Якутия",
        "Магаданская область",
        "Хабаровский край",
        "Сахалин",
        "Другая РФ",
      ];
      const formats = ["Временная занятость", "Постоянная занятость"];

      return (
        <div className="space-y-6">
          <div>
            <h3 className="text-gray-900 mb-4 text-[18px] font-medium">
              Где и в каком формате работа?
            </h3>

            <div className="mb-6">
              <Label className="mb-3 block">Регион</Label>
              <div className="space-y-2">
                {regions.map((region) => (
                  <label
                    key={region}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-[#D32F2F] transition-colors"
                  >
                    <Checkbox
                      checked={
                        !!answers.regions?.includes(region)
                      }
                      onCheckedChange={(checked) => {
                        const current = answers.regions || [];
                        setAnswers({
                          ...answers,
                          regions: checked
                            ? [...current, region]
                            : current.filter(
                                (r) => r !== region,
                              ),
                        });
                      }}
                    />
                    <span className="text-gray-900">
                      {region}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Label className="mb-3 block">
                Формат работы
              </Label>
              <div className="space-y-2">
                {formats.map((format) => (
                  <label
                    key={format}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-[#D32F2F] transition-colors"
                  >
                    <Checkbox
                      checked={
                        !!answers.workFormat?.includes(format)
                      }
                      onCheckedChange={(checked) => {
                        const current =
                          answers.workFormat || [];
                        setAnswers({
                          ...answers,
                          workFormat: checked
                            ? [...current, format]
                            : current.filter(
                                (f) => f !== format,
                              ),
                        });
                      }}
                    />
                    <span className="text-gray-900">
                      {format}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (currentStep === 4) {
      return (
        <div className="space-y-6">
          <h3 className="text-gray-900 mb-6 text-[18px] font-medium">
            Сроки и масштаб
          </h3>

          <div>
            <Label className="mb-3 block">
              Когда нужен выход кандидата?
            </Label>
            <RadioGroup
              value={answers.startDate}
              onValueChange={(value) =>
                setAnswers({ ...answers, startDate: value })
              }
            >
              <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="urgent" id="urgent" />
                <Label
                  htmlFor="urgent"
                  className="flex-1 cursor-pointer"
                >
                  Срочно (в течение 2 недель)
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="month" id="month" />
                <Label
                  htmlFor="month"
                  className="flex-1 cursor-pointer"
                >
                  В течение месяца
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <RadioGroupItem
                  value="planning"
                  id="planning"
                />
                <Label
                  htmlFor="planning"
                  className="flex-1 cursor-pointer"
                >
                  Планирую заранее (1-3 месяца)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="mb-3 block">
              Какое количество позиций требуется закрыть?{" "}
              {answers.positionsCount || 1}
            </Label>
            <Slider
              value={[answers.positionsCount || 1]}
              onValueChange={(value) =>
                setAnswers({
                  ...answers,
                  positionsCount: value[0],
                })
              }
              min={1}
              max={20}
              step={1}
              className="my-6"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1</span>
              <span>20+</span>
            </div>
          </div>
        </div>
      );
    }

    if (currentStep === 5) {
      return renderFinalForm();
    }

    return null;
  };

  const renderAuditSteps = () => {
    if (currentStep === 2) {
      const reasons = [
        "Готовимся к проверке ГИТ/прокуратуры",
        "Быстрый рост, нужен порядок",
        "Обнаружили риски/штрафы, хотим проверить все",
        "Регулярная профилактика",
      ];

      return (
        <div className="space-y-4">
          <h3 className="text-gray-900 mb-6 text-[18px] font-medium">
            Что побудило задуматься об аудите?
          </h3>
          <div className="space-y-2">
            {reasons.map((reason) => (
              <label
                key={reason}
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-[#D32F2F] transition-colors"
              >
                <Checkbox
                  checked={
                    !!answers.auditReasons?.includes(reason)
                  }
                  onCheckedChange={(checked) => {
                    const current = answers.auditReasons || [];
                    setAnswers({
                      ...answers,
                      auditReasons: checked
                        ? [...current, reason]
                        : current.filter((r) => r !== reason),
                    });
                  }}
                />
                <span className="text-gray-900">{reason}</span>
              </label>
            ))}
          </div>
        </div>
      );
    }

    if (currentStep === 3) {
      return (
        <div className="space-y-6">
          <h3 className="text-gray-900 mb-6 text-[18px] font-medium">
            Масштаб и структура
          </h3>

          <div>
            <Label className="mb-3 block">
              Численность штата: {answers.staffSize || 50}
            </Label>
            <Slider
              value={[answers.staffSize || 50]}
              onValueChange={(value) =>
                setAnswers({ ...answers, staffSize: value[0] })
              }
              min={10}
              max={1000}
              step={10}
              className="my-6"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>До 50</span>
              <span>500+</span>
            </div>
          </div>

          <div>
            <Label className="mb-3 block">Есть филиалы?</Label>
            <RadioGroup
              value={answers.hasBranches || ""}
              onValueChange={(value) =>
                setAnswers({ ...answers, hasBranches: value })
              }
            >
              <div className="space-y-2">
                {[
                  { value: "yes", label: "Да" },
                  { value: "no", label: "Нет" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-[#D32F2F] transition-colors"
                  >
                    <RadioGroupItem value={option.value} />
                    <span className="text-gray-900">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </RadioGroup>
          </div>
        </div>
      );
    }

    if (currentStep === 4) {
      return (
        <div className="space-y-6">
          <h3 className="text-gray-900 mb-6 text-[18px] font-medium">
            Сроки и формат
          </h3>

          <div>
            <Label className="mb-3 block">
              Когда нужен отчет по рискам?
            </Label>
            <RadioGroup
              value={answers.auditDeadline || ""}
              onValueChange={(value) =>
                setAnswers({ ...answers, auditDeadline: value })
              }
            >
              <div className="space-y-2">
                {[
                  { value: "week", label: "На этой неделе" },
                  { value: "2-3weeks", label: "2–3 недели" },
                  { value: "month", label: "В течение месяца" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-[#D32F2F] transition-colors"
                  >
                    <RadioGroupItem value={option.value} />
                    <span className="text-gray-900">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="mb-3 block">
              Нужна помощь с внедрением правок?
            </Label>
            <RadioGroup
              value={answers.needImplementation || ""}
              onValueChange={(value) =>
                setAnswers({
                  ...answers,
                  needImplementation: value,
                })
              }
            >
              <div className="space-y-2">
                {[
                  { value: "yes", label: "Да" },
                  { value: "no", label: "Нет" },
                  { value: "not_sure", label: "Пока не знаю" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-[#D32F2F] transition-colors"
                  >
                    <RadioGroupItem value={option.value} />
                    <span className="text-gray-900">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </RadioGroup>
          </div>
        </div>
      );
    }

    if (currentStep === 5) {
      return renderFinalForm();
    }

    return null;
  };

  const renderMigrationSteps = () => {
    if (currentStep === 2) {
      return (
        <div className="space-y-4">
          <h3 className="text-gray-900 mb-6 text-[18px] font-medium">
            Кого оформляете?
          </h3>
          <RadioGroup
            value={answers.citizenType || ""}
            onValueChange={(value) =>
              setAnswers({ ...answers, citizenType: value })
            }
          >
            <div className="space-y-3">
              {[
                {
                  value: "eaeu",
                  label:
                    "Граждане ЕАЭС (Казахстан, Киргизия, Армения, Беларусь)",
                },
                {
                  value: "other",
                  label: "Граждане других стран",
                },
                {
                  value: "mixed",
                  label: "Смешано/пока не уверены",
                },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-[#D32F2F] transition-colors"
                >
                  <RadioGroupItem value={option.value} />
                  <div className="text-gray-900">
                    {option.label}
                  </div>
                </label>
              ))}
            </div>
          </RadioGroup>
        </div>
      );
    }

    if (currentStep === 3) {
      const needs = [
        "Постановка/снятие с учета, уведомления",
        "Патенты/разрешения, продление документов",
        "Полный аутсорс миграционного сопровожденя",
      ];

      return (
        <div className="space-y-4">
          <h3 className="text-gray-900 mb-6 text-[18px] font-medium">
            Что требуется сейчас?
          </h3>
          <div className="space-y-2">
            {needs.map((need) => (
              <label
                key={need}
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-[#D32F2F] transition-colors"
              >
                <Checkbox
                  checked={
                    !!answers.migrationNeeds?.includes(need)
                  }
                  onCheckedChange={(checked) => {
                    const current =
                      answers.migrationNeeds || [];
                    setAnswers({
                      ...answers,
                      migrationNeeds: checked
                        ? [...current, need]
                        : current.filter((n) => n !== need),
                    });
                  }}
                />
                <span className="text-gray-900">{need}</span>
              </label>
            ))}
          </div>
        </div>
      );
    }

    if (currentStep === 4) {
      return (
        <div className="space-y-6">
          <h3 className="text-gray-900 mb-6 text-[18px] font-medium">
            Сроки и масштаб
          </h3>

          <div>
            <Label className="mb-3 block">
              Сколько человек в лижайший месяц?{" "}
              {answers.peopleCount || 1}
            </Label>
            <Slider
              value={[answers.peopleCount || 1]}
              onValueChange={(value) =>
                setAnswers({
                  ...answers,
                  peopleCount: value[0],
                })
              }
              min={1}
              max={20}
              step={1}
              className="my-6"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1</span>
              <span>20+</span>
            </div>
          </div>

          <div>
            <Label className="mb-3 block">Сроки</Label>
            <RadioGroup
              value={answers.migrationDeadline}
              onValueChange={(value) =>
                setAnswers({
                  ...answers,
                  migrationDeadline: value,
                })
              }
            >
              <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="week" id="week" />
                <Label
                  htmlFor="week"
                  className="flex-1 cursor-pointer"
                >
                  На этой неделе
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <RadioGroupItem
                  value="2-3weeks"
                  id="2-3weeks"
                />
                <Label
                  htmlFor="2-3weeks"
                  className="flex-1 cursor-pointer"
                >
                  2–3 недели
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="month" id="month" />
                <Label
                  htmlFor="month"
                  className="flex-1 cursor-pointer"
                >
                  В течение месяца
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      );
    }

    if (currentStep === 5) {
      return renderFinalForm();
    }

    return null;
  };

  const renderExploringSteps = () => {
    if (currentStep === 2) {
      const interests = [
        "Рынок кандидатов и сроки закрытия",
        "Риски в кадровом учете",
        "Миграционные требования для работодателя",
      ];

      return (
        <div className="space-y-4">
          <h3 className="text-gray-900 mb-6 text-[18px] font-medium">
            Что интересует в первую очередь?
          </h3>
          <div className="space-y-2">
            {interests.map((interest) => (
              <label
                key={interest}
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-[#D32F2F] transition-colors"
              >
                <Checkbox
                  checked={
                    !!answers.interests?.includes(interest)
                  }
                  onCheckedChange={(checked) => {
                    const current = answers.interests || [];
                    setAnswers({
                      ...answers,
                      interests: checked
                        ? [...current, interest]
                        : current.filter((i) => i !== interest),
                    });
                  }}
                />
                <span className="text-gray-900">
                  {interest}
                </span>
              </label>
            ))}
          </div>
        </div>
      );
    }

    if (currentStep === 3) {
      const materials = [
        "Чек-лист по аудиту",
        "Памятка по ЕАЭС",
        "Гайд по ускорению подбора",
      ];

      return (
        <div className="space-y-6">
          <h3 className="text-gray-900 mb-6 text-[18px] font-medium">
            Как связаться и что прислать?
          </h3>

          <div>
            <Label className="mb-3 block">Удобнее</Label>
            <RadioGroup
              value={answers.contactMethod || ""}
              onValueChange={(value) =>
                setAnswers({ ...answers, contactMethod: value })
              }
            >
              <div className="space-y-2">
                {[
                  { value: "whatsapp", label: "WhatsApp" },
                  { value: "telegram", label: "Telegram" },
                  { value: "call", label: "Звонок" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-[#D32F2F] transition-colors"
                  >
                    <RadioGroupItem value={option.value} />
                    <span className="text-gray-900">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="mb-3 block">Что прислать</Label>
            <div className="space-y-2">
              {materials.map((material) => (
                <label
                  key={material}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-[#D32F2F] transition-colors"
                >
                  <Checkbox
                    checked={
                      !!answers.materials?.includes(material)
                    }
                    onCheckedChange={(checked) => {
                      const current = answers.materials || [];
                      setAnswers({
                        ...answers,
                        materials: checked
                          ? [...current, material]
                          : current.filter(
                              (m) => m !== material,
                            ),
                      });
                    }}
                  />
                  <span className="text-gray-900">
                    {material}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (currentStep === 4) {
      const times = [
        "Сегодня",
        "Завтра",
        "На этой неделе",
        "Напишите, уточним",
      ];

      return (
        <div className="space-y-4">
          <h3 className="text-gray-900 mb-6 text-[18px] font-medium">
            Когда удобно обсудить 15-минутно?
          </h3>
          <div className="space-y-2">
            {times.map((time) => (
              <label
                key={time}
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-[#D32F2F] transition-colors"
              >
                <Checkbox
                  checked={
                    !!answers.consultationTime?.includes(time)
                  }
                  onCheckedChange={(checked) => {
                    const current =
                      answers.consultationTime || [];
                    setAnswers({
                      ...answers,
                      consultationTime: checked
                        ? [...current, time]
                        : current.filter((t) => t !== time),
                    });
                  }}
                />
                <span className="text-gray-900">{time}</span>
              </label>
            ))}
          </div>
        </div>
      );
    }

    if (currentStep === 5) {
      return renderFinalForm();
    }

    return null;
  };

  const renderFinalForm = () => {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-gray-900 mb-2 text-[18px] font-medium">
            Получить бонус и план
          </h3>
          <p className="text-gray-600 text-sm">
            {getBonusText()}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="quiz-name">Ваше имя *</Label>
            <Input
              id="quiz-name"
              required
              value={answers.name || ""}
              onChange={(e) =>
                setAnswers({ ...answers, name: e.target.value })
              }
              placeholder="Иван Иванов"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quiz-company">Компания *</Label>
            <Input
              id="quiz-company"
              required
              value={answers.company || ""}
              onChange={(e) =>
                setAnswers({
                  ...answers,
                  company: e.target.value,
                })
              }
              placeholder="ООО «Компания»"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quiz-phone">
              Телефон/WhatsApp *
            </Label>
            <Input
              id="quiz-phone"
              type="tel"
              required
              value={answers.phone || ""}
              onChange={(e) =>
                setAnswers({
                  ...answers,
                  phone: e.target.value,
                })
              }
              placeholder="+7 (999) 123-45-67"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quiz-email">
              E-mail{" "}
              {answers.branch !== "exploring" &&
                "(необязательно)"}
            </Label>
            <Input
              id="quiz-email"
              type="email"
              required={answers.branch === "exploring"}
              value={answers.email || ""}
              onChange={(e) =>
                setAnswers({
                  ...answers,
                  email: e.target.value,
                })
              }
              placeholder="email@company.ru"
            />
          </div>

          {answers.branch !== "exploring" && (
            <div className="space-y-2">
              <Label htmlFor="quiz-comment">
                Комментарий (необязательно)
              </Label>
              <Input
                id="quiz-comment"
                value={answers.comment || ""}
                onChange={(e) =>
                  setAnswers({
                    ...answers,
                    comment: e.target.value,
                  })
                }
                placeholder="Дополнительная информация"
              />
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-[#D32F2F] hover:bg-[#B71C1C]"
          >
            {getButtonText()}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Нажимая кнопку, вы соглашаетесь с{" "}
            <a href="#/privacy" className="text-[#D32F2F] hover:underline">
              политикой обработки персональных данных
            </a>
          </p>
        </form>
      </div>
    );
  };

  const canProceed = () => {
    if (showThankYou) return false;
    if (currentStep === 1 && !preselectedBranch) return !!answers.branch;
    if (currentStep === 5) return false; // Final form has its own submit
    
    // Recruitment validation
    if (answers.branch === "recruitment") {
      if (currentStep === 2) return !!answers.positions;
      if (currentStep === 3) return (answers.regions?.length ?? 0) > 0 && (answers.workFormat?.length ?? 0) > 0;
      if (currentStep === 4) return !!answers.startDate;
    }
    
    // Audit validation
    if (answers.branch === "audit") {
      if (currentStep === 2) return (answers.auditReasons?.length ?? 0) > 0;
      if (currentStep === 3) return !!answers.hasBranches;
      if (currentStep === 4) return !!answers.auditDeadline && !!answers.needImplementation;
    }
    
    // Migration validation
    if (answers.branch === "migration") {
      if (currentStep === 2) return !!answers.citizenType;
      if (currentStep === 3) return (answers.migrationNeeds?.length ?? 0) > 0;
      if (currentStep === 4) return !!answers.migrationDeadline;
    }
    
    // Exploring validation
    if (answers.branch === "exploring") {
      if (currentStep === 2) return (answers.interests?.length ?? 0) > 0;
      if (currentStep === 3) return !!answers.contactMethod && (answers.materials?.length ?? 0) > 0;
      if (currentStep === 4) return (answers.consultationTime?.length ?? 0) > 0;
    }
    
    return true;
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild data-quiz-trigger>
        {trigger || (
          <Button className="bg-[#D32F2F] text-white hover:bg-[#B71C1C] rounded-lg px-6 h-10">
            Получить расчет
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[950px] max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {!showThankYou && (
          <div className="-mx-6 -mt-6 bg-gray-900">
            <div className="px-6 pt-6 pb-4">
              <DialogHeader className="p-[0px]">
                <DialogTitle className="text-[18px] font-medium text-white">
                  Ответьте на 4 вопроса —<br />
                  получите персональный план и бонус по вашей
                  задаче
                </DialogTitle>
                <DialogDescription className="text-sm text-white/90">
                  Займет 30–40 секунд. Без сложных расчетов.
                </DialogDescription>
              </DialogHeader>
            </div>
            <Progress
              value={progress}
              className="h-2 rounded-none"
            />
          </div>
        )}

        <div className="py-6 min-h-[300px]">
          {renderStepContent()}
        </div>

        {!showThankYou && currentStep !== 5 && (
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === initialStep}
              className={currentStep === initialStep ? "invisible" : ""}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Назад
            </Button>

            <span className="text-sm text-gray-500">
              Шаг {currentStep} из {getTotalSteps()}
            </span>

            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-[#D32F2F] hover:bg-[#B71C1C]"
            >
              Далее
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {!showThankYou && (
          <div className="text-xs text-gray-500 text-center pt-2">
            <p>
              🔒 Конфиденциально: данные не передаем третьим
              лицам
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}