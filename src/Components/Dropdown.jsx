
import { RiStarLine, RiStarFill } from "react-icons/ri";

const  CurrencyDropdown = ({
    currencies,
    currency,
    setCurrency,
    favorites,
    handleFavorites,
    title = ""
}) => {


    const isFavorite = (currency) => {
        // Check if the currency is in the favorites list
        return favorites.includes(currency);
    }
return (
    <div>
        <label htmlFor={title} className="block text-sm font-semibold text-gray-800 mb-2">{title}:</label>
        <div className="relative">
            <select
                className="w-full p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 bg-white appearance-none"
                name={title}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
            >
                {/* render favorites */}
                {favorites.map((favorite) => (
                    <option
                        className="bg-yellow-50 font-semibold"
                        key={favorite}
                        value={favorite}
                    >
                        ⭐ {favorite}
                    </option>
                ))}
                {/* render currencies */}
                {currencies
                    .filter((c) => !favorites.includes(c))
                    .map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
            </select>
            <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 focus:outline-none"
                onClick={() => handleFavorites(currency)}
                tabIndex={-1}
            >
                {isFavorite(currency) ? (
                    <RiStarFill
                        className="text-yellow-400 hover:text-yellow-500 transition-transform duration-300 scale-110 animate-pulse"
                        size={24}
                    />
                ) : (
                    <RiStarLine
                        className="text-gray-400 hover:text-yellow-400 transition-transform duration-300 hover:scale-125"
                        size={24}
                    />
                )}
            </button>
        </div>
    </div>
);
}

export default CurrencyDropdown