import site from "@lib/market";

const langs = {
  en: {
    points: "pts",
    modals: {
      preview: {
        title: "Preview Content",
        answer: "Answer"
      },
      report: {
        title: "Report Content",
        commit: "Report"
      },
      theme: {
        title: "Change Theme",
        commit: "Apply"
      }
    },
    dashboard: {
      quota: "Quota",
      month: "Month",
      quarter: "Quarter",
      rate: "Answers/Day"
    }
  },
  ru: {
    points: "б",
    modals: {
      preview: {
        title: "Предварительный просмотр вопроса",
        answer: "Отвечать"
      },
      report: {
        title: "Содержание отчета",
        commit: "Отчет"
      },
      theme: {
        title: "Менять тему",
        commit: "Применять"
      }
    },
    dashboard: {
      quota: "Квота",
      month: "Месяц",
      quarter: "Четверть",
      rate: "Ответы/День"
    }
  },
  fr: {
    points: "pts",
    modals: {
      preview: {
        title: "Aperçu du contenu",
        answer: "Répondre"
      },
      report: {
        title: "Contenu du rapport",
        commit: "Rapport"
      },
      theme: {
        title: "Change le thème",
        commit: "Appliquer"
      }
    },
    dashboard: {
      quota: "Quota",
      month: "Mois",
      quarter: "Quart",
      rate: "Réponses/jour"
    }
  },
  ro: {
    points: "pcte",
    modals: {
      preview: {
        title: "Previzualizare conținut",
        answer: "Răspuns"
      },
      report: {
        title: "Raportați conținut",
        commit: "Raport"
      },
      theme: {
        title: "Schimbă tema",
        commit: "aplica"
      }
    },
    dashboard: {
      quota: "Cotă",
      month: "Lună",
      quarter: "Sfert",
      rate: "Răspunsuri/zi"
    }
  }
};

let region = site.locals.market;

if (["in", "id", "us"].includes(region)) region = "en";

export default langs[region];