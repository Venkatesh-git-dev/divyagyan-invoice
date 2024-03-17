import { useContext } from "react";
import ctx from "./ctx";
import Logo from "./assets/Logo";

export default function Print99() {
  return (
    <div className="hidden print:block text-rich-black">
      <div className="flex">
        <Receipt styles="border-r border-rich-black border-dashed" />
        <Receipt />
      </div>
    </div>
  );
}

function dateFormat(date) {
  const tempDate = new Date(date).toDateString().split(" ").slice(1);
  const tempDate1 = [tempDate[1], tempDate[0], tempDate[2]].join("-");
  return tempDate1;
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

function Receipt({ styles = "" }) {
  const { student, billMeta, billInfo } = useContext(ctx);

  return (
    <div className={`h-[8.26in] w-[5.82in] p-6 ${styles}`}>
      <header className="text-center capitalize w-full flex flex-col items-center gap-0">
        <div className="mt-3 mb-1">
          <Logo fill="rbg(15,15,15)" height="32" width="32" />
        </div>

        <p className="font-bold text-sm">Divyagyan jyoti</p>
        <p className="font-semibold text-xs">public e.m. school</p>
        <p className="mt-2 text-[8px]">
          BL-21, Basanti colony, Rourkela-769012
        </p>
      </header>

      <div className="text-[10px] mt-12 space-y-1">
        <p>
          Name of the Student:{" "}
          <span className="capitalize">{student.stdName}</span>
        </p>
        <p>Roll no.: {student.stdRoll}</p>
        <p>
          Class: {student.stdClass}
          {student.stdSection}
        </p>
        <p>Fees for the Month of: {billMeta.month}</p>
        <p>Date of Payment: {dateFormat(billMeta.date)}</p>
      </div>

      <div className="text-sm mt-12 space-y-3">
        <div className="flex w-full justify-between text-xs font-bold border-b-2 border-rich-black pb-2">
          <div className="w-2/12">Sl.no.</div>
          <div className="w-10/12">Particulars</div>
          <div className="w-4/12">Amount</div>
        </div>

        {billInfo.map((bill, i) => (
          <div className="flex w-full justify-between" key={bill[0]}>
            <div className="w-2/12">{i + 1}</div>
            <div className="w-10/12">{bill[1]}</div>
            <div className="w-4/12">₹{(+bill[2]).toFixed(2)}</div>
          </div>
        ))}

        <div className="flex w-full justify-between text-xs font-bold">
          <div className="w-2/12"></div>
          <div className="w-10/12 border-y-2 border-rich-black py-2 pl-2">
            Total
          </div>
          <div className="w-4/12 border-y-2 border-rich-black py-2">
            ₹{billInfo.reduce((a, x) => a + +x[2], 0).toFixed(2)}
          </div>
        </div>
      </div>

      <footer className="mt-12">
        <div className="text-sm flex gap-2">
          <p className="font-bold text-nowrap">Total in Words: </p>
          <p>{toWords.convert(billInfo.reduce((a, x) => a + +x[2], 0))}</p>
        </div>
        <div className="mt-44 text-sm w-full flex justify-end">
          <div className="text-center border-t-2 border-rich-black pt-2">
            <span className="font-bold">Signature</span>
            <div className="text-xs mt-1">(Center Head)</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
