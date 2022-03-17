import React, { useEffect, useState } from "react";
import { CollapsibleSubsection } from "../../components/collapsibleSubsection/CollapsibleSubsection";
import NavBar from "../../components/navBar/NavBar";
import { useWindowSize } from "../../utils/customHooks";
import {
  currentMonth,
  kunden,
  lastlastMonth,
  lastMonth,
} from "../../utils/demoData";
import styles from "./Rechnungsportal.module.css";
import moment from "moment";
import { ArrowSwitch } from "../../components/arrowSwitch/ArrowSwitch";
import { getRechnungsEintraege } from "../../utils/apiCalls";
import Loader from "../../components/loadingwheel/AlernativeStatus";
// import { getRechnungsEinträge } from "../../utils/apiCalls";

type IsearchName =
  | "rechnungsnummer"
  | "kundennummer"
  | "kunde"
  | "rechnungsdatum"
  | "vonZeitraum"
  | "bisZeitraum";

type Imode = "up" | "down";

interface Irechnungseintrag {
  id: number;
  rechnungsnummer: string;
  kundennummer: number;
  kunde: string;
  rechnungsdatum: Date;
  vonZeitraum: Date;
  bisZeitraum: Date;
  Euro: number;
  Stunden: number;
}

interface IForm {
  textfeld: string;
  kundeName: string;
  datumstatus: string;
  zeilenAnzahl: string;
  vonDate: Date;
  bisDate: Date;
}

export default function Rechnungsportal() {
  const size = useWindowSize();
  const [data, setData] = useState<Irechnungseintrag[] | []>();
  const [textfeld, setTextfeld] = useState<string>("");
  const [kundeName, setKundeName] = useState<string>("Alle");
  const [datumstatus, setDatumstatus] = useState<string>("");
  const [zeilenAnzahl, setZeilenAnzahl] = useState<string>("50");

  const [vonDate, setVonDate] = useState<string>(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [bisDate, setBisDate] = useState<string>(
    moment().endOf("month").format("YYYY-MM-DD")
  );

  const [sortState, setSortState] = useState([
    { name: "rechnungsnummer", mode: "none" },
    { name: "kundennummer", mode: "none" },
    { name: "kunde", mode: "up" },
    { name: "rechnungsdatum", mode: "none" },
    { name: "vonZeitraum", mode: "none" },
    { name: "bisZeitraum", mode: "none" },
  ]);

  useEffect(() => {
    setTimeout(
      () =>
        getRechnungsEintraege(
          "demoToken",
          {
            textSearch: textfeld,
            kundeName: kundeName,
            datumstatus: datumstatus,
            zeilenAnzahl: zeilenAnzahl,
            vonDate: vonDate,
            bisDate: bisDate,
          },
          setData,
          true
        ),
      5000
    );
  }, []);

  const handleSort = (searchName: IsearchName) => {
    let mode: Imode = "up";
    const newArr = [...sortState].map((element) => {
      if (element.name === searchName && element.mode === "none") {
        return { ...element, mode: "up" };
      } else if (element.name === searchName && element.mode === "up") {
        mode = "down";
        return { ...element, mode: "down" };
      } else if (element.name === searchName && element.mode === "down") {
        return { ...element, mode: "up" };
      } else {
        return { ...element, mode: "none" };
      }
    });
    setSortState(newArr);
    sortData(searchName, mode, setData);
  };

  const sortData = (searchName: IsearchName, mode: Imode, setState: any) => {
    if (searchName === "kunde") {
      //@ts-ignore
      const sortedData = [...data].sort((a, b) => {
        let fa = a[searchName].toLowerCase();
        let fb = b[searchName].toLowerCase();

        if (fa < fb) {
          return mode === "up" ? -1 : 1;
        }
        if (fa > fb) {
          return mode === "up" ? 1 : -1;
        }
        return 0;
      });
      setState(sortedData);
    } else if (searchName === "rechnungsnummer") {
      //@ts-ignore

      const sortedData = [...data].sort((a, b) => {
        let fa = parseInt(a[searchName].slice(0, 4));
        let fb = parseInt(b[searchName].slice(0, 4));

        if (fa < fb) {
          return mode === "up" ? -1 : 1;
        }
        if (fa > fb) {
          return mode === "up" ? 1 : -1;
        }
        return 0;
      });
      setState(sortedData);
    } else if (searchName === "kundennummer") {
      //@ts-ignore

      const sortedData = [...data].sort((a, b) => {
        let fa = a[searchName];
        let fb = b[searchName];

        if (fa < fb) {
          return mode === "up" ? -1 : 1;
        }
        if (fa > fb) {
          return mode === "up" ? 1 : -1;
        }
        return 0;
      });
      setState(sortedData);
    } else if (
      searchName === "bisZeitraum" ||
      searchName === "rechnungsdatum" ||
      searchName === "vonZeitraum"
    ) {
      //@ts-ignore
      const sortedData = [...data].sort((a, b) => {
        let fa = a[searchName];
        let fb = b[searchName];
        if (mode === "up") {
          return fb.getTime() - fa.getTime();
        } else {
          return fa.getTime() - fb.getTime();
        }
      });
      setState(sortedData);
    }
  };

  const findSingleSortMode = (searchName: IsearchName) => {
    let found = [...sortState].find((element) => element.name === searchName);
    if (!found) {
      return "none";
    } else {
      return found.mode;
    }
  };
  const handleHeuteClick = () => {
    setVonDate(moment().format("YYYY-MM-DD"));
    setBisDate(moment().format("YYYY-MM-DD"));
  };
  const handleWocheClick = () => {
    setVonDate(moment().startOf("week").add(1, "days").format("YYYY-MM-DD"));
    setBisDate(moment().endOf("week").add(1, "days").format("YYYY-MM-DD"));
  };
  const handleCurrentMonthClick = () => {
    setVonDate(moment().startOf("month").format("YYYY-MM-DD"));
    setBisDate(moment().endOf("month").format("YYYY-MM-DD"));
  };
  const handleLastMonthClick = () => {
    setVonDate(
      moment().subtract(1, "months").startOf("month").format("YYYY-MM-DD")
    );
    setBisDate(
      moment().subtract(1, "months").endOf("month").format("YYYY-MM-DD")
    );
  };
  const handleLastLastMonthClick = () => {
    setVonDate(
      moment().subtract(2, "months").startOf("month").format("YYYY-MM-DD")
    );
    setBisDate(
      moment().subtract(2, "months").endOf("month").format("YYYY-MM-DD")
    );
  };
  const handleCurrentYearClick = () => {
    setVonDate(moment().startOf("year").format("YYYY-MM-DD"));
    setBisDate(moment().endOf("year").format("YYYY-MM-DD"));
  };
  const handleLastYearClick = () => {
    setVonDate(
      moment().subtract(1, "year").startOf("year").format("YYYY-MM-DD")
    );
    setBisDate(moment().subtract(1, "year").endOf("year").format("YYYY-MM-DD"));
  };

  const handleReset = () => {
    setTextfeld("");
    setKundeName("Alle");
    setKundeName("Alle");
    setDatumstatus("Rechnungsdauer");
    setZeilenAnzahl("Alle");
    handleHeuteClick();
  };

  const isRadioSelected = (value: string): boolean => datumstatus === value;

  return (
    <>
      <NavBar />
      <main className={styles.mainContent}>
        <h1>Rechnungen</h1>
        <CollapsibleSubsection
          Title="Filter"
          height={size.width && size.width > 900 ? "250px" : "420px"}
        >
          <form>
            <div className={styles.inputWrapper}>
              <div className={styles.mainLabel}>
                <label htmlFor="Suche">Suche</label>
              </div>
              <div>
                <input
                  type="text"
                  value={textfeld}
                  id="Suche"
                  onChange={(e) => {
                    setTextfeld(e.target.value);
                  }}
                />
                <div className={styles.buttonContainer}>
                  <button>Suchen/Filtern</button>
                  <button onClick={handleReset}>Zurücksetzen</button>
                  <button>Löschen</button>
                </div>
              </div>
            </div>

            <div className={styles.inputWrapper}>
              <div className={styles.mainLabel}>
                <label htmlFor="KundIn">KundIn</label>
              </div>
              <div>
                <select
                  value={kundeName}
                  id="KundIn"
                  onChange={(e) => {
                    setKundeName(e.target.value);
                  }}
                >
                  <option value="Alle">Alle</option>
                  {kunden.map((kunde, index) => {
                    return (
                      <option value={kunde.name} key={index}>
                        {kunde.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <fieldset className={styles.inputWrapper}>
              <div className={styles.mainLabel}>
                <legend>Datum</legend>
              </div>
              <div>
                <div className={styles.buttonContainer}>
                  <input
                    type="radio"
                    name="radioDate"
                    onChange={(e) => setDatumstatus(e.target.value)}
                    value="Rechnungsdauer"
                    checked={isRadioSelected("Rechnungsdauer")}
                    id="Rechnungsdauer"
                  />
                  <label
                    aria-label="Filter nach Rechnungsdatum, Option 1 von 2"
                    htmlFor="Rechnungsdauer"
                  >
                    Rechnungsdauer
                  </label>
                </div>
                <div className={styles.buttonContainer}>
                  <input
                    type="radio"
                    name="radioDate"
                    onChange={(e) => setDatumstatus(e.target.value)}
                    value="Leistungszeitraum"
                    checked={isRadioSelected("Leistungszeitraum")}
                    id="Leistungszeitraum"
                  />
                  <label
                    aria-label="Filter nach Leistungszeitraum, Option 2 von 2"
                    htmlFor="Leistungszeitraum"
                  >
                    Leistungszeitraum
                  </label>
                </div>
              </div>
            </fieldset>

            <div className={styles.inputWrapper}>
              <div className={styles.mainLabel}>
                <label htmlFor="ZeileGesamt">Zeilen gesamt</label>
              </div>
              <select
                value={zeilenAnzahl}
                id="ZeileGesamt"
                onChange={(e) => {
                  setZeilenAnzahl(e.target.value);
                }}
              >
                <option key="0" value="Alle">
                  Alle
                </option>
                <option key="1" value="25">
                  25
                </option>
                <option key="2" value="50">
                  50
                </option>
                <option key="3" value="200">
                  200
                </option>
                <option key="4" value="500">
                  500
                </option>
              </select>
            </div>

            <div className={styles.inputWrapper}>
              <div className={styles.mainLabel}>
                <label htmlFor="von">Von</label>
              </div>
              <div className={styles.dateContainer}>
                <input
                  type="date"
                  id="von"
                  value={vonDate}
                  onChange={(e) => {
                    setVonDate(e.target.value);
                  }}
                />
                <label htmlFor="bis">bis</label>
                <input
                  type="date"
                  id="bis"
                  value={bisDate}
                  onChange={(e) => {
                    setBisDate(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className={styles.inputWrapper}>
              <div className={styles.mainLabel}>
                <label>Zeitpunkt</label>
              </div>
              <div>
                <a
                  href="#"
                  onClick={handleHeuteClick}
                  role="button"
                  aria-label="Datum von heute in von und bis felder eintragen"
                >
                  Heute
                </a>
                <a
                  href="#"
                  onClick={handleWocheClick}
                  role="button"
                  aria-label="Anfangs und Endatum  dieser Woche in von und bis felder eintragen"
                >
                  Woche
                </a>
                <a
                  href="#"
                  onClick={handleCurrentMonthClick}
                  role="button"
                  aria-label={`Anfangs und Endatum  von "${currentMonth?.text}" in von und bis felder eintragen`}
                >
                  {currentMonth?.text}
                </a>
                <a
                  href="#"
                  onClick={handleLastMonthClick}
                  role="button"
                  aria-label={`Anfangs und Endatum  von "${lastMonth?.text}" in von und bis felder eintragen`}
                >
                  {lastMonth?.text}
                </a>
                <a
                  href="#"
                  onClick={handleLastLastMonthClick}
                  role="button"
                  aria-label={`Anfangs und Endatum  von "${lastlastMonth?.text}" in von und bis felder eintragen`}
                >
                  {lastlastMonth?.text}
                </a>
                <a
                  href="#"
                  onClick={handleCurrentYearClick}
                  role="button"
                  aria-label={`Anfangs und Endatum  um von "${new Date().getFullYear()}" in von und bis felder eintragen`}
                >
                  {new Date().getFullYear()}
                </a>
                <a
                  href="#"
                  onClick={handleLastYearClick}
                  role="button"
                  aria-label={`Anfangs und Endatum  von "${
                    new Date().getFullYear() - 1
                  }" in von und bis felder eintragen`}
                >
                  {new Date().getFullYear() - 1}
                </a>
              </div>
            </div>
          </form>
        </CollapsibleSubsection>
        <CollapsibleSubsection Title="Liste" height="400px">
          <div className={styles.tableControlls}>
            <button
              className={styles.buttonLarge}
              aria-label="Zur letzten Seite"
            >
              &lt;
            </button>
            <button
              className={styles.buttonLarge}
              aria-label="Zur nächsten Seite"
            >
              &gt;
            </button>
            <button
              className={styles.buttonLarge}
              aria-label="Zur ersten Seite"
            >
              &lt;&lt;
            </button>
            <button
              className={styles.buttonLarge}
              aria-label="Zur letzten Seite"
            >
              &gt;&gt;
            </button>
            <span>Einträge pro Seite</span>
            <select>
              <option key="1" value="2">
                2
              </option>
              <option key="2" value="5">
                5
              </option>
              <option key="3" value="10">
                10
              </option>
              <option key="4" value="25">
                25
              </option>
              <option key="5" value="50">
                50
              </option>
              <option key="6" value="100">
                100
              </option>
              <option key="7" value="200">
                200
              </option>
              <option key="8" value="500">
                500
              </option>
            </select>
          </div>
          {!data || data.length === 0 ? (
            <div className={styles.center}>
              <Loader data={data}></Loader>
            </div>
          ) : (
            <table className={styles.table}>
              <caption>Rechnungen</caption>
              <tbody>
                <tr>
                  <th>Nr. </th>
                  <th>Rechnung </th>
                  <th>
                    <a
                      href="#"
                      onClick={() => handleSort("rechnungsnummer")}
                      aria-label="Sortierung nach rechnungsnummer"
                    >
                      Rechnungsnummer
                      <ArrowSwitch
                        mode={findSingleSortMode("rechnungsnummer")}
                      />
                    </a>
                  </th>
                  <th>
                    <a
                      href="#"
                      onClick={() => handleSort("kundennummer")}
                      aria-label="Sortierung nach kundennummer"
                    >
                      Kundennummer
                      <ArrowSwitch mode={findSingleSortMode("kundennummer")} />
                    </a>
                  </th>
                  <th>
                    <a
                      href="#"
                      onClick={() => handleSort("kunde")}
                      aria-label="Sortierung nach kunde"
                    >
                      Kunde
                      <ArrowSwitch mode={findSingleSortMode("kunde")} />
                    </a>
                  </th>
                  <th>
                    <a
                      href="#"
                      onClick={() => handleSort("rechnungsdatum")}
                      aria-label="Sortierung nach rechnungsdatum"
                    >
                      Rechnungsdatum
                      <ArrowSwitch
                        mode={findSingleSortMode("rechnungsdatum")}
                      />
                    </a>
                  </th>
                  <th>
                    <a
                      href="#"
                      onClick={() => handleSort("bisZeitraum")}
                      aria-label="Sortierung nach Zeitraum von"
                    >
                      Zeitraum von
                      <ArrowSwitch mode={findSingleSortMode("bisZeitraum")} />
                    </a>
                  </th>
                  <th>
                    <a
                      href="#"
                      onClick={() => handleSort("vonZeitraum")}
                      aria-label="Sortierung nach Zeitraum von"
                    >
                      Zeitraum bis
                      <ArrowSwitch mode={findSingleSortMode("vonZeitraum")} />
                    </a>
                  </th>
                  <th>Summe Euro</th>
                  <th>Summe Stunden</th>
                  <th>Löschen</th>
                </tr>
                {data.map((rechnung, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td>{index}.</td>
                        <td>
                          <button
                            role="link"
                            aria-label={`Zur Rechung ${
                              rechnung.rechnungsnummer
                            } vom ${moment(rechnung.rechnungsdatum).format(
                              "DD.MM.YYYY"
                            )} gehen`}
                          >
                            Rechnung
                          </button>
                        </td>
                        <td>{rechnung.rechnungsnummer}</td>
                        <td>{rechnung.kundennummer}</td>
                        <td>{rechnung.kunde}</td>
                        <td>
                          {moment(rechnung.rechnungsdatum).format("DD.MM.YYYY")}
                        </td>
                        <td>
                          {moment(rechnung.vonZeitraum).format("DD.MM.YYYY")}
                        </td>
                        <td>
                          {moment(rechnung.bisZeitraum).format("DD.MM.YYYY")}
                        </td>
                        <td>{rechnung.Euro}</td>
                        <td>{rechnung.Stunden}</td>
                        <td>
                          <input type="checkbox"></input>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          )}
        </CollapsibleSubsection>
      </main>
    </>
  );
}
