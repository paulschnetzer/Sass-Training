import { v4 as uuidv4 } from "uuid";

export const rechnungseinträge = [
  {
    id: uuidv4(),
    rechnungsnummer: "11111-04-2021",
    kundennummer: 20001,
    kunde: "Müller Max",
    rechnungsdatum: new Date(2002, 12, 6),
    vonZeitraum: new Date(2002, 12, 6),
    bisZeitraum: new Date(2002, 12, 6),
    Euro: Math.floor(Math.random() * (100000 - 100) + 100) / 100,
    Stunden: Math.floor(Math.random() * (1000 - 100) + 100) / 100,
  },
  {
    id: uuidv4(),
    rechnungsnummer: "11111-04-2021",
    kundennummer: 20001,
    kunde: "Müller Max",
    rechnungsdatum: new Date(2012, 12, 6),
    vonZeitraum: new Date(2012, 12, 6),
    bisZeitraum: new Date(2012, 12, 6),
    Euro: Math.floor(Math.random() * (100000 - 100) + 100) / 100,
    Stunden: Math.floor(Math.random() * (1000 - 100) + 100) / 100,
  },
  {
    id: uuidv4(),
    rechnungsnummer: "22222-04-2021",
    kundennummer: 20001,
    kunde: "Müller Max",
    rechnungsdatum: new Date(2012, 12, 6),
    vonZeitraum: new Date(2012, 12, 6),
    bisZeitraum: new Date(2012, 12, 6),
    Euro: Math.floor(Math.random() * (100000 - 100) + 100) / 100,
    Stunden: Math.floor(Math.random() * (1000 - 100) + 100) / 100,
  },
  {
    id: uuidv4(),
    rechnungsnummer: "22222-04-2021",
    kundennummer: 20002,
    kunde: "Andritz Verena",
    rechnungsdatum: new Date(2013, 12, 6),
    vonZeitraum: new Date(2013, 12, 6),
    bisZeitraum: new Date(2013, 12, 6),
    Euro: Math.floor(Math.random() * (100000 - 100) + 100) / 100,
    Stunden: Math.floor(Math.random() * (1000 - 100) + 100) / 100,
  },
  {
    id: uuidv4(),
    rechnungsnummer: "33333-04-2021",
    kundennummer: 20002,
    kunde: "Andritz Verena",
    rechnungsdatum: new Date(2013, 12),
    vonZeitraum: new Date(2013, 12, 6),
    bisZeitraum: new Date(2013, 12, 6),
    Euro: Math.floor(Math.random() * (100000 - 100) + 100) / 100,
    Stunden: Math.floor(Math.random() * (1000 - 100) + 100) / 100,
  },
  {
    id: uuidv4(),
    rechnungsnummer: "44444-04-2021",
    kundennummer: 20002,
    kunde: "Andritz Verena",
    rechnungsdatum: new Date(2013, 12, 9),
    vonZeitraum: new Date(2013, 12, 9),
    bisZeitraum: new Date(2013, 12, 9),
    Euro: Math.floor(Math.random() * (100000 - 100) + 100) / 100,
    Stunden: Math.floor(Math.random() * (1000 - 100) + 100) / 100,
  },
  {
    id: uuidv4(),
    rechnungsnummer: "44444-04-2021",
    kundennummer: 20003,
    kunde: "Batzig Tom",
    rechnungsdatum: new Date(2002, 12, 6),
    vonZeitraum: new Date(2002, 12, 6),
    bisZeitraum: new Date(2002, 12, 6),
    Euro: Math.floor(Math.random() * (100000 - 100) + 100) / 100,
    Stunden: Math.floor(Math.random() * (1000 - 100) + 100) / 100,
  },
  {
    id: uuidv4(),
    rechnungsnummer: "55555-04-2021",
    kundennummer: 20003,
    kunde: "Batzig Tom",
    rechnungsdatum: new Date(2002, 12, 6),
    vonZeitraum: new Date(2002, 12, 6),
    bisZeitraum: new Date(2002, 12, 6),
    Euro: Math.floor(Math.random() * (100000 - 100) + 100) / 100,
    Stunden: Math.floor(Math.random() * (1000 - 100) + 100) / 100,
  },
  {
    id: uuidv4(),
    rechnungsnummer: "66666-04-2021",
    kundennummer: 20003,
    kunde: "Batzig Tom",
    rechnungsdatum: new Date(2002, 12, 6),
    vonZeitraum: new Date(2002, 12, 6),
    bisZeitraum: new Date(2002, 12, 6),
    Euro: Math.floor(Math.random() * (100000 - 100) + 100) / 100,
    Stunden: Math.floor(Math.random() * (1000 - 100) + 100) / 100,
  },
];

export const kunden = [
  { name: "Batzig Tom", key: 0 },
  { name: "Andritz Verena", key: 1 },
  { name: "Müller Max", key: 2 },
];

const months = [
  {
    number: 0,
    text: "Januar",
  },
  {
    number: 1,
    text: "Februar",
  },
  {
    number: 2,
    text: "März",
  },
  {
    number: 3,
    text: "April",
  },
  {
    number: 4,
    text: "Mai",
  },
  {
    number: 5,
    text: "Juni",
  },
  {
    number: 6,
    text: "Juli",
  },
  ,
  {
    number: 7,
    text: "August",
  },
  {
    number: 8,
    text: "September",
  },
  {
    number: 9,
    text: "Oktober",
  },
  {
    number: 10,
    text: "November",
  },
  {
    number: 11,
    text: "Dezember",
  },
];

export const currentMonth = months.find((month) => {
  return month?.number === new Date().getMonth();
});

export const lastMonth = months.find((month) => {
  let monthToSearch = new Date().getMonth() - 1;
  if (monthToSearch === -1) {
    monthToSearch = 11;
  }
  return month?.number === monthToSearch;
});

export const lastlastMonth = months.find((month) => {
  let monthToSearch = new Date().getMonth() - 2;
  if (monthToSearch === -1) {
    monthToSearch = 11;
  } else if (monthToSearch === -2) {
    monthToSearch = 10;
  }
  return month?.number === monthToSearch;
});
