import site from "@lib/market";

const langs = {
  en: {
    points: "pts",
    answering: "Answering Dashboard",
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
  pl: {
    points: "pkt",
    answering: "Panel odpowiedzi",
    modals: {
      preview: {
        title: "Podgląd treści",
        answer: "Odpowiedź"
      },
      report: {
        title: "Zgłoś treść",
        commit: "Raport"
      },
      theme: {
        title: "Zmień motyw",
        commit: "Stosować"
      }
    },
    dashboard: {
      quota: "Kontyngent",
      month: "Miesiąc",
      quarter: "Kwartał",
      rate: "Odpowiedzi/dzień"
    }
  },
  ru: {
    points: "б",
    answering: "Панель ответов",
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
    answering: "Tableau de bord de réponse",
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
    answering: "Tabloul de bord cu răspunsuri",
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