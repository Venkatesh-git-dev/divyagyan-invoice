import { useContext, useEffect, useState } from "react";
import Logo from "./assets/Logo";
import ctx from "./ctx";

export default function Screen99() {
  return (
    <>
      <div className="relative block print:hidden w-screen min-h-screen bg-slate-900 text-white p-16">
        <div className="container mx-auto max-w-6xl min-h-full bg-slate-800 rounded-2xl p-10 overflow-x-hidden">
          <Header />
          <Form />
          <Table />
          <Footer />
          <div className="absolute bottom-2 right-4 font-light text-xs">
            Thanks to freepik for placeholder logo check them out @{" "}
            <a
              className="text-blue-500 underline hover:no-underline"
              href="https://www.freepik.com"
            >
              Freepik.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function Header() {
  return (
    <header className="mb-20">
      <div className="flex justify-center">
        <div className="flex flex-col gap-4 items-center text-center">
          <Logo fill="white" height="32" width="32" />
          <div>
            <p className="uppercase font-semibold text-lg">divyagyan jyoti</p>
            <p className="uppercase font-extralight text-xs">
              public e.m. school
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Form() {
  const ctxDetails = useContext(ctx);

  function studentHandler(key, value) {
    ctxDetails.setStudent((prev) => {
      return { ...prev, [key]: value };
    });
  }

  function billMetaHandler(key, value) {
    ctxDetails.setBillMeta((prev) => {
      return { ...prev, [key]: value };
    });
  }

  return (
    <section className="mb-20">
      <div>
        <h2 className="mb-4 text-xl font-bold text-white uppercase">details</h2>
        <form>
          <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
            <div className="w-full">
              <label>
                <span className="block mb-2 text-sm font-medium text-white">
                  Student Name
                </span>
                <input
                  type="text"
                  value={ctxDetails.student.stdName}
                  onChange={(e) => {
                    studentHandler("stdName", e.target.value);
                  }}
                  className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Type student name"
                  required
                />
              </label>
            </div>

            <div className="w-full">
              <label>
                <span className="block mb-2 text-sm font-medium text-white">
                  Roll no.
                </span>
                <input
                  type="text"
                  value={ctxDetails.student.stdRoll}
                  onChange={(e) => {
                    studentHandler("stdRoll", e.target.value);
                  }}
                  className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                  required
                  placeholder="Type Roll number"
                />
              </label>
            </div>

            <div className="w-full">
              <label>
                <span className="block mb-2 text-sm font-medium text-white">
                  Class
                </span>
                <input
                  type="text"
                  value={ctxDetails.student.stdClass}
                  onChange={(e) => {
                    studentHandler("stdClass", e.target.value);
                  }}
                  className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                  maxLength={3}
                  required
                  placeholder="Type Class"
                />
              </label>
            </div>

            <div className="w-full">
              <label>
                <span className="block mb-2 text-sm font-medium text-white">
                  Section
                </span>
                <input
                  type="text"
                  value={ctxDetails.student.stdSection}
                  onChange={(e) => {
                    studentHandler("stdSection", e.target.value.toUpperCase());
                  }}
                  className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Type Section"
                  maxLength={1}
                />
              </label>
            </div>

            <div className="w-full">
              <label>
                <span className="block mb-2 text-sm font-medium text-white">
                  Fees for the month of
                </span>

                <select
                  className="border text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                  value={ctxDetails.billMeta.month}
                  onChange={(e) => billMetaHandler("month", e.target.value)}
                >
                  {months.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="w-full">
              <label>
                <span className="block mb-2 text-sm font-medium text-white">
                  Date
                </span>
                <input
                  type="date"
                  className="border text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                  required
                  value={ctxDetails.billMeta.date}
                  onChange={(e) => {
                    try {
                      billMetaHandler(
                        "date",
                        new Date(e.target.value).toISOString().slice(0, 10)
                      );
                    } catch (err) {
                      billMetaHandler(
                        "date",
                        new Date(Date.now()).toISOString().slice(0, 10)
                      );
                    }
                  }}
                />
              </label>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

function Table() {
  const { billInfo, setBillInfo } = useContext(ctx);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-20">
      <table className="w-full text-sm text-left  text-gray-400">
        <thead className="text-xs uppercase  bg-gray-700 text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 w-3/5">
              particulars
            </th>

            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3 w-1/8">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {billInfo.map((bill) => (
            <tr key={bill[0]}>
              <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap text-white"
              >
                <input
                  type="text"
                  className="block w-full p-2 border rounded-lg text-xs bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                  value={billInfo.find((x) => x[0] === bill[0])[1]}
                  onChange={(e) =>
                    setBillInfo((prev) =>
                      prev.map((x) => {
                        x[0] === bill[0] ? (x[1] = e.target.value) : null;
                        return x;
                      })
                    )
                  }
                ></input>
              </th>
              <td className="px-6 py-4">
                <input
                  type="number"
                  className="block w-full p-2 border rounded-lg text-xs bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                  value={billInfo.find((x) => x[0] === bill[0])[2]}
                  onChange={(e) =>
                    setBillInfo((prev) =>
                      prev.map((x) => {
                        x[0] === bill[0] ? (x[2] = e.target.value) : null;
                        return x;
                      })
                    )
                  }
                ></input>
              </td>
              <td className="px-6 py-4">
                <button
                  className="font-medium text-red-500 hover:underline"
                  onClick={() =>
                    setBillInfo((prev) => prev.filter((x) => x[0] !== bill[0]))
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex justify-center mt-4">
        <button
          type="button"
          className="  border  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-10 py-2.5 text-center inline-flex items-center focus:ring-gray-600 bg-gray-800 border-gray-700 text-white hover:bg-gray-700 me-2 mb-2"
          onClick={() =>
            setBillInfo((prev) => [...prev, [crypto.randomUUID(), "", 0]])
          }
        >
          + Add Item
        </button>
      </div>
      <table className="w-full text-left">
        <thead className="uppercase border-t border-t-slate-600 text-white">
          <tr>
            <th scope="col" className="px-6 uppercase text-right py-3 w-3/5">
              Total
            </th>

            <th scope="col" className="px-6 py-3">
              ₹{billInfo.reduce((a, x) => a + +x[2], 0).toFixed(2)}
            </th>
            <th scope="col" className="px-6 py-3 w-1/8"></th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

import { ToWords } from "to-words";

const toWords = new ToWords({
  localeCode: "en-IN",
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: {
      // can be used to override defaults for the selected locale
      name: "Rupee",
      plural: "Rupees",
      symbol: "₹",
      fractionalUnit: {
        name: "Paisa",
        plural: "Paise",
        symbol: "",
      },
    },
  },
});

function Footer() {
  const { student, billMeta, billInfo } = useContext(ctx);
  const [val, setVal] = useState(0);

  useEffect(() => {
    setVal(() => billInfo.reduce((a, x) => a + +x[2], 0));
  }, [billInfo]);

  return (
    <footer>
      <div className="mb-24">
        <span className="font-bold text-xl">Total in words</span>:{" "}
        {val ? toWords.convert(val) : ""}
      </div>
      <div className="w-full flex justify-end">
        <div>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
              let errMsg = "";
              let errCount = 0;

              if (student.stdName.trim().length == 0) {
                errCount++;
                errMsg += errCount + "." + " student name is empty\n";
              }

              if (student.stdRoll.trim().length == 0) {
                errCount++;
                errMsg += errCount + "." + " roll no. is empty\n";
              }

              if (student.stdClass.trim().length == 0) {
                errCount++;
                errMsg += errCount + "." + " class is empty\n";
              }

              if (billMeta.month.trim().length == 0) {
                errCount++;
                errMsg += errCount + "." + " month is empty\n";
              }

              if (billMeta.date.trim().length == 0) {
                errCount++;
                errMsg += errCount + "." + " Date is empty\n";
              }

              if (billInfo.length == 0) {
                errCount++;
                errMsg += errCount + "." + " add some particulars\n";
              }

              if (errCount) {
                alert("cannot print becuase of:\n" + errMsg);
              } else {
                window.print();
              }
            }}
          >
            Print
          </button>
        </div>
      </div>
    </footer>
  );
}
