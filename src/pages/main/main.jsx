import React, { useEffect, useState, useRef } from "react";
import { Search, Sun, Moon, ChevronDown } from "lucide-react";

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [activeTab, setActiveTab] = useState("today");
  const [city, setCity] = useState("Floridablanca");
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const API_KEY = "a473d68ccfb845cea94140210242110";
  const mainRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  useEffect(() => {
    const handleScroll = () => {
      if (mainRef.current) {
        setIsScrolled(mainRef.current.scrollTop > 100);
      }
    };

    const mainElement = mainRef.current;
    if (mainElement) {
      mainElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (mainElement) {
        mainElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const fetchWeather = (location) => {
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=10`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((response) => setWeather(response))
      .catch((error) => {
        console.error("Hubo un error:" + error.message);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      setCity(searchQuery);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery("");
    }
  };

  if (!weather) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  const renderTodayView = () => (
    <>
      <div className="flex justify-between mb-8 overflow-x-auto">
        {weather.forecast.forecastday[0].hour.slice(0, 6).map((hour, index) => (
          <div key={index} className="text-center flex-shrink-0 mx-2">
            <div className="text-sm mb-1">
              {new Date(hour.time).getHours()}:00
            </div>
            <img
              src={hour.condition.icon}
              alt={hour.condition.text}
              className="w-8 h-8 mx-auto"
            />
            <div className="font-semibold">{Math.round(hour.temp_c)}°</div>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h3 className="font-semibold mb-2">Day forecast</h3>
      </div>

      <div className="mb-8">
        <h3 className="font-semibold mb-2">Chance of rain</h3>
        {weather.forecast.forecastday[0].hour
          .slice(19, 23)
          .map((hour, index) => (
            <div key={index} className="flex items-center mb-2">
              <div className="w-16 text-sm">
                {new Date(hour.time).getHours()}:00
              </div>
              <div className="flex-1 bg-purple-200 rounded-full h-2">
                <div
                  className="bg-purple-600 rounded-full h-2"
                  style={{ width: `${hour.chance_of_rain}%` }}
                ></div>
              </div>
              <div className="w-16 text-right text-sm">
                {hour.chance_of_rain}%
              </div>
            </div>
          ))}
      </div>

      <div className="flex justify-between">
        <div className="flex items-center">
          <Sun className="w-6 h-6 mr-2 text-yellow-500" />
          <div>
            <div className="text-sm">Sunrise</div>
            <div className="font-semibold">
              {weather.forecast.forecastday[0].astro.sunrise}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <Moon className="w-6 h-6 mr-2 text-blue-500" />
          <div>
            <div className="text-sm">Sunset</div>
            <div className="font-semibold">
              {weather.forecast.forecastday[0].astro.sunset}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderTenDayView = () => (
    <div className="space-y-4">
      {weather.forecast.forecastday.map((day, index) => (
        <div
          key={index}
          className="flex items-center justify-between py-2 border-b border-purple-200"
        >
          <div>
            <div className="font-semibold">
              {index === 0
                ? "Today"
                : new Date(day.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
            </div>
            <div className="text-sm text-gray-600">
              {day.day.condition.text}
            </div>
          </div>
          <div className="flex items-center">
            <img
              src={day.day.condition.icon}
              alt={day.day.condition.text}
              className="w-8 h-8 mr-2"
            />
            <div className="text-right">
              <span className="font-semibold">
                {Math.round(day.day.maxtemp_c)}°
              </span>
              <span className="text-gray-600 ml-1">
                {Math.round(day.day.mintemp_c)}°
              </span>
            </div>
            <ChevronDown className="w-4 h-4 ml-2 text-gray-400" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <main
      ref={mainRef}
      className="bg-purple-100 min-h-screen text-gray-800 overflow-y-auto"
    >
      <div
        className={`sticky top-0 z-10 bg-purple-100 transition-all duration-300 ease-in-out ${
          isScrolled ? "py-2" : "py-6"
        }`}
      >
        <div className="max-w-md mx-auto px-6">
          <div
            className={`flex justify-between items-center transition-all duration-300 ease-in-out ${
              isScrolled ? "mb-0" : "mb-4"
            }`}
          >
            <div
              className={`transition-all duration-300 ease-in-out ${
                isScrolled ? "flex items-center" : "block"
              }`}
            >
              <h2
                className={`font-semibold transition-all duration-300 ease-in-out ${
                  isScrolled ? "text-xl mr-4" : "text-2xl mb-2"
                }`}
              >
                {weather.location.name},{weather.location.country}
              </h2>
              {isScrolled && (
                <div className="text-4xl font-bold">
                  {Math.round(weather.current.temp_c)}°
                </div>
              )}
            </div>
            <div className="relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search city..."
                    className="pl-8 pr-10 py-1 rounded-full bg-white bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                  <Search className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <button
                    type="button"
                    onClick={toggleSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>
                </form>
              ) : (
                <button onClick={toggleSearch}>
                  <Search className="w-6 h-6 text-gray-700" />
                </button>
              )}
            </div>
          </div>

          <div
            className={`text-center transition-all duration-300 ease-in-out ${
              isScrolled
                ? "opacity-0 h-0 overflow-hidden"
                : "opacity-100 h-auto"
            }`}
          >
            <div className="text-8xl font-bold mb-2">
              {Math.round(weather.current.temp_c)}°
            </div>
            <div className="text-xl mb-4">{weather.current.condition.text}</div>
            <div className="text-lg">
              Feels like {Math.round(weather.current.feelslike_c)}°
            </div>
            <div className="text-xl mb-4">
              <span className="font-semibold">
                {new Date(weather.location.localtime).toLocaleDateString(
                  "en-US",
                  { weekday: "long", month: "short", day: "numeric" }
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 pb-6">
        <div className="bg-white rounded-3xl p-6 mb-8 shadow-lg">
          <div className="flex justify-between mb-4">
            <button
              className={`font-semibold ${
                activeTab === "today" ? "text-purple-600" : ""
              }`}
              onClick={() => setActiveTab("today")}
            >
              Today
            </button>
            <button
              className={`font-semibold ${
                activeTab === "tomorrow" ? "text-purple-600" : ""
              }`}
              onClick={() => setActiveTab("tomorrow")}
            >
              Tomorrow
            </button>
            <button
              className={`font-semibold ${
                activeTab === "10days" ? "text-purple-600" : ""
              }`}
              onClick={() => setActiveTab("10days")}
            >
              10 days
            </button>
          </div>

          {activeTab === "today" && renderTodayView()}
          {activeTab === "10days" && renderTenDayView()}
        </div>
      </div>
    </main>
  );
}
