import { useContext, useEffect, useState } from "react";
import ctx from "./ctx";

export default function Print99() {
  const receiptNo = Date.now();
  return (
    <div className=" print:block text-rich-black">
      <div className="flex">
        <Receipt
          styles="border-r border-rich-black border-dashed"
          receiptNo={receiptNo}
        />
        <Receipt receiptNo={receiptNo} />
      </div>
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

function Receipt({ styles = "", receiptNo }) {
  const { student, billMeta, billInfo } = useContext(ctx);

  const [bill, setBill] = useState([]);

  const minBillLength = 5;
  useEffect(() => {
    const bb = billInfo
      .filter((b) => b[1].trim().length || +b[2])
      .map((x, i) => [x[0], x[1], (+x[2]).toFixed(2), i + 1]);
    setBill(() => [
      ...bb,
      ...Array.from({ length: minBillLength - bb.length }, () => [
        crypto.randomUUID(),
        "",
        "",
        "",
      ]),
    ]);
  }, [billInfo]);

  return (
    <div className={`h-[8.26in] w-[5.82in] p-8 ${styles} text-base`}>
      <header className="text-center capitalize w-full flex flex-col items-center">
        <p className="uppercase underline tracking-wider font-semibold">
          Fee Receipt
        </p>
        <div>
          <img src="/school_logo-black.png" alt="school logo" width="128px" />
        </div>

        <p className="font-bold text-xl">Divyagyan jyoti</p>
        <p className="font-semibold">public e.m. school</p>
        <p className="text-sm">BL-21, Basanti colony, Rourkela-769012</p>
      </header>

      <div className="font-semibold mt-3 flex justify-between">
        <p>
          No: <span className="tracking-wide">{receiptNo}</span>
        </p>
        <p>
          Date
          <span className="ml-4 underline underline-offset-8 font-normal">
            {billMeta.date
              .split("-")
              .map((x) => (x < 10 ? x % 10 : x))
              .reverse()
              .map((x, i, arr) => (i == arr.length - 1 ? x % 100 : x))
              .join("/")}
          </span>
        </p>
      </div>

      <div className="font-semibold mt-4 space-y-4">
        <div className="w-full flex">
          <p>Name: </p>
          <div className="ml-4 capitalize font-normal border-rich-black border-b-2 flex-grow text-center">
            {student.stdName}
          </div>
        </div>

        <div className="flex flex-grow gap-5">
          <div className="flex flex-grow">
            <p>Class </p>
            <div className="ml-2 font-normal text-center flex-grow border-rich-black border-b-2">
              <p>{`${student.stdClass}${student.stdSection.length ? "-" : ""}${
                student.stdSection
              }`}</p>
            </div>
          </div>

          <div className="flex flex-grow">
            <p>Roll No.</p>
            <div className="ml-2 font-normal text-center flex-grow border-rich-black border-b-2">
              {student.stdRoll}
            </div>
          </div>
        </div>

        <div className="flex">
          <p>Fees for the Month of</p>
          <div className="flex-grow ml-2 text-center font-medium border-rich-black border-b-2">
            {billMeta.month}
          </div>
        </div>
      </div>

      <div className="font-bold mt-4">
        <div className="flex w-full justify-between">
          <div className="w-2/12 border-2 border-l-0 border-rich-black py-2">
            Sl.no
          </div>
          <div className="w-10/12 py-2 border-rich-black border-2 border-l-0 text-center">
            Particulars
          </div>
          <div className="w-4/12 py-2 pl-2 border-rich-black border-y-2 text-center">
            Amount
          </div>
        </div>

        {bill.map((b) => (
          <div
            className="flex w-full justify-between font-normal text-sm"
            key={b[0]}
          >
            <div className="w-2/12 border-r-2 border-rich-black py-2 text-center">
              {b[3]}.
            </div>
            <div className="w-10/12 py-2 border-rich-black border-r-2 truncate">
              <span className="ml-4">{b[1]}</span>
            </div>
            <div className="w-4/12 py-2 pl-2 text-center truncate">{b[2]}</div>
          </div>
        ))}

        <div className="flex w-full justify-between">
          <div className="w-2/12 border-y-2 border-rich-black py-2"></div>
          <div className="w-10/12 border-2 border-l-0 text-right border-rich-black py-2 pr-8 uppercase">
            Total
          </div>
          <div className="w-4/12 border-y-2 border-rich-black py-2 pl-4 truncate">
            ₹{billInfo.reduce((a, x) => a + +x[2], 0).toFixed(2)}
          </div>
        </div>
      </div>

      <footer className="mt-4 flex">
        <div className="flex-grow">
          <span className="font-semibold text-nowrap mr-4">(in words)</span>
          <span className="underline underline-offset-8 leading-loose decoration-2">
            {toWords.convert(billInfo.reduce((a, x) => a + +x[2], 0))}
          </span>
        </div>

        <div className="flex flex-col flex-shrink-0">
          <div className="h-16"></div>
          <p className="font-bold">Signature</p>
        </div>
      </footer>
    </div>
  );
}
