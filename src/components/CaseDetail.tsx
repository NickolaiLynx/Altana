import { useEffect } from "react";
import { Button } from "./ui/button";
import { casesData, serviceNames } from "../data/cases";
import { CaseLayout } from "./layouts/CaseLayout";

interface CaseDetailProps {
  caseId: string;
}

export function CaseDetail({ caseId }: CaseDetailProps) {
  // Находим кейс по ID и определяем его категорию
  let caseItem;
  let category = "";

  if (casesData.recruitment.find((c) => c.id === parseInt(caseId))) {
    caseItem = casesData.recruitment.find((c) => c.id === parseInt(caseId));
    category = serviceNames.recruitment;
  } else if (casesData.audit.find((c) => c.id === parseInt(caseId))) {
    caseItem = casesData.audit.find((c) => c.id === parseInt(caseId));
    category = serviceNames.audit;
  } else if (casesData.migration.find((c) => c.id === parseInt(caseId))) {
    caseItem = casesData.migration.find((c) => c.id === parseInt(caseId));
    category = serviceNames.migration;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [caseId]);

  if (!caseItem) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4">Кейс не найден</h1>
          <a href="#/cases">
            <Button>Вернуться к кейсам</Button>
          </a>
        </div>
      </div>
    );
  }

  return <CaseLayout caseItem={{ ...caseItem, category }} />;
}
