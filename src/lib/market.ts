const markets = [
  {
    url: "https://brainly.com",
    locals: {
      market: "us",
      question: "question"
    }
  },
  {
    url: "https://brainly.ro",
    locals: {
      market: "ro",
      question: "tema"
    }
  },
  {
    url: "https://znanija.com",
    locals: {
      market: "ru",
      question: "task"
    }
  },
  {
    url: "https://nosdevoirs.fr",
    locals: {
      market: "fr",
      question: "devoir"
    }
  },
  {
    url: "https://brainly.in",
    locals: {
      market: "in",
      question: "question"
    }
  },
  {
    url: "https://brainly.pl",
    locals: {
      market: "pl",
      question: "zadanie"
    }
  },
  {
    url: "https://brainly.co.id",
    locals: {
      market: "id",
      question: "tugas"
    }
  }
];
const site = markets.find(market => window.location.href.includes(market.url));
export default site;