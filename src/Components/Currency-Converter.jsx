import React from "react";
import { useState, useEffect } from "react";
import CurrencyDropdown from "./Dropdown";
import { HiArrowsRightLeft } from "react-icons/hi2";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [converting,setConverting] = useState(false)
  const [convertedAmount,setConvertedAmount] = useState(null)
  const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || ["USD", "INR"]);

  // Currencies => https://api.frankfurter.app/currencies
  const fetchCurrencies = async () => {
    try {
      const response = await fetch("https://api.frankfurter.app/currencies");
      const data = await response.json();
      setCurrencies(Object.keys(data)); //convert into obj and update state
    } catch (error) {
      console.error("Error fetching currencies:", error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  console.log(currencies);


// Conversion => https://api.frankfurter.dev/v1/latest?amount=2&base=USD&symbols=INR
  const handleAmountChange = async (e) => {
    if(!amount) return;
    setConverting(true)
    try {
      const response = await fetch(`https://api.frankfurter.dev/v1/latest?amount=${amount}&base=${fromCurrency}&symbols=${toCurrency}`);
      const data = await response.json();
      setConvertedAmount(data.rates[toCurrency]+ " " + toCurrency)
    } catch (error) {
      console.error("Error fetching currencies:", error);
      setError("check your internet connection... ");
    }finally{
        setConverting(false)
    }
  };

  const handleFavorites = (currency) => {
    // handle favorites logic here
    let updatedFavorites = [...favorites];
    if (favorites.includes(currency)) {
      updatedFavorites = updatedFavorites.filter((fav) => fav !== currency);
    } else {
      updatedFavorites.push(currency);
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); 
  };

  const swapCurrencies = () =>{
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  //   fetchCurrencies();

  return (
    <div className="max-w-xl w-full mx-auto my-6 p-4 sm:p-6 md:p-8 bg-gradient-to-br from-indigo-100 via-white to-indigo-200 shadow-2xl rounded-2xl transition-all duration-500">
      <h2 className="mb-5 sm:mb-7 text-2xl sm:text-3xl font-bold text-indigo-700 tracking-tight text-center animate-fade-in">
        Currency Converter
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 items-end">
        <CurrencyDropdown
          favorites={favorites}
          currencies={currencies}
          title="From"
          handleFavorites={handleFavorites}
          currency={fromCurrency}
          setCurrency={setFromCurrency}
        />
        {/* swap currencies button */}
        <div className="flex justify-center -mb-4 sm:mb-0">
          <button
            onClick={swapCurrencies}
            className="p-2 sm:p-3 bg-indigo-100 rounded-full shadow-lg hover:bg-indigo-200 transition-all duration-300 transform hover:scale-110 active:scale-95 animate-bounce-swap"
            aria-label="Swap currencies"
          >
            <HiArrowsRightLeft className="text-xl sm:text-2xl text-indigo-600" />
          </button>
        </div>
        <CurrencyDropdown
          favorites={favorites}
          currencies={currencies}
          title="To"
          handleFavorites={handleFavorites}
          currency={toCurrency}
          setCurrency={setToCurrency}
        />
      </div>

      <div className="mt-4 sm:mt-6">
        <label
          htmlFor="amount"
          className="block text-indigo-700 text-sm font-semibold mb-1"
        >
          Amount:
        </label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          id="amount"
          className="w-full p-2 sm:p-3 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 mt-1 text-base sm:text-lg transition-all duration-300"
          placeholder="Enter amount"
          min="0"
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-end mt-6 sm:mt-8">
        <button
          className={`w-full sm:w-auto px-5 sm:px-7 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-lg shadow-md font-semibold text-base sm:text-lg hover:from-indigo-600 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition-all duration-300
            ${converting ? "cursor-not-allowed animate-pulse" : ""}
            `}
          onClick={handleAmountChange}
          disabled={converting}
        >
          {converting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Converting...
            </span>
          ) : (
            "Convert"
          )}
        </button>
      </div>

      {convertedAmount && (
        <div className={`mt-4 sm:mt-6 text-xl sm:text-2xl font-bold text-right ${convertedAmount && !error ? 'text-green-600' :'text-red-600 '} animate-fade-in-up break-words`}>
          {convertedAmount && !error ? 'Converted Amount:' : 'Error:'} <span className={`${convertedAmount && !error ? 'bg-green-100' : 'bg-red-100'} px-2 sm:px-3 py-1 rounded-lg shadow`}>{convertedAmount && !error ? convertedAmount : error}</span>
        </div>
        )}
      

      {/* Animations */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(-10px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in {
            animation: fade-in 0.8s ease;
          }
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.7s cubic-bezier(.4,0,.2,1);
          }
          @keyframes bounce-swap {
            0%, 100% { transform: translateY(0);}
            50% { transform: translateY(-8px);}
          }
          .animate-bounce-swap {
            animation: bounce-swap 1.2s infinite;
          }
        `}
      </style>
    </div>
  );
};
 
export default CurrencyConverter;