import { rechnungseinträge } from "./demoData";

interface IFilterData {
  textSearch: string;
  kundeName: string;
  datumstatus: string;
  zeilenAnzahl: string;
  vonDate: string;
  bisDate: string;
}

export function getRechnungsEintraege(
  token: string,
  filterData: IFilterData,
  setState: any,
  isDataAvailable: boolean
) {
  //   const response = await fetch(`https://testAPI/getRechnungsEinträge`, {
  //     method: "POST",
  //     body: JSON.stringify(filterData),
  //     headers: {
  //       Authorization: "Bearer " + token,
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const responseJson = await response.json();
  //normalerweise: setState(responseJson)
  if (isDataAvailable) {
    setState(rechnungseinträge);
  } else {
    setState([]);
  }
}

// export async function getRechnungsEintraegeWithTimeout(
//   token: string,
//   filterData: IFilterData,
//   setState: any
// ) {
//   setTimeout(() => getRechnungsEinträge(false), 1000);
// }
