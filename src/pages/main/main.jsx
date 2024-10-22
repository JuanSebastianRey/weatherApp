import React, { useEffect, useState } from "react"
import { Search, Sun, Moon } from "lucide-react"

export default function WeatherApp() {
  const [weather, setWeather] = useState(null)
  const API_KEY = "a473d68ccfb845cea94140210242110"

  useEffect(() => {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=Floridablanca&days=7`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => setWeather(response))
      .catch((error) => {
        console.error("Hubo un error:" + error.message)
      })
  }, [])

  if (!weather) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <main className="bg-purple-100 min-h-screen text-gray-800 p-6">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">
            {weather.location.name}, {weather.location.country}
          </h2>
          <Search className="w-6 h-6" />
        </div>

        <div className="text-center mb-8">
          <div className="text-8xl font-bold mb-2">{Math.round(weather.current.temp_c)}°</div>
          <div className="text-xl mb-4">{weather.current.condition.text}</div>
          <div className="text-lg">
            Feels like {Math.round(weather.current.feelslike_c)}°
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 mb-8">
          <div className="flex justify-between mb-4">
            <button className="font-semibold text-purple-600">Today</button>
            <button className="font-semibold">Tomorrow</button>
            <button className="font-semibold">10 days</button>
          </div>

          <div className="flex justify-between mb-8">
            {weather.forecast.forecastday[0].hour.slice(0, 6).map((hour, index) => (
              <div key={index} className="text-center">
                <div className="text-sm mb-1">{new Date(hour.time).getHours()}:00</div>
                <img src={hour.condition.icon} alt={hour.condition.text} className="w-8 h-8 mx-auto" />
                <div className="font-semibold">{Math.round(hour.temp_c)}°</div>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <h3 className="font-semibold mb-2">Day forecast</h3>
            <div className="relative h-40">
              <div className="absolute inset-0 flex items-end">
                {weather.forecast.forecastday.map((day, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="h-full flex items-end justify-center">
                      <div 
                        className="w-1 bg-purple-600" 
                        style={{height: `${(day.day.avgtemp_c + 10) * 2}%`}}
                      ></div>
                    </div>
                    <div className="text-xs mt-1">{daysOfWeek[new Date(day.date).getDay()]}</div>
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                <div className="border-b border-gray-300 relative">
                  <span className="absolute -top-4 left-0 text-xs">10°</span>
                </div>
                <div className="border-b border-gray-300 relative">
                  <span className="absolute -top-4 left-0 text-xs">0°</span>
                </div>
                <div className="border-b border-gray-300 relative">
                  <span className="absolute -top-4 left-0 text-xs">-10°</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-semibold mb-2">Chance of rain</h3>
            {weather.forecast.forecastday[0].hour.slice(19, 23).map((hour, index) => (
              <div key={index} className="flex items-center mb-2">
                <div className="w-16 text-sm">{new Date(hour.time).getHours()}:00</div>
                <div className="flex-1 bg-purple-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 rounded-full h-2" 
                    style={{width: `${hour.chance_of_rain}%`}}
                  ></div>
                </div>
                <div className="w-16 text-right text-sm">{hour.chance_of_rain}%</div>
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            <div className="flex items-center">
              <Sun className="w-6 h-6 mr-2 text-yellow-500" />
              <div>
                <div className="text-sm">Sunrise</div>
                <div className="font-semibold">{weather.forecast.forecastday[0].astro.sunrise}</div>
              </div>
            </div>
            <div className="flex items-center">
              <Moon className="w-6 h-6 mr-2 text-blue-500" />
              <div>
                <div className="text-sm">Sunset</div>
                <div className="font-semibold">{weather.forecast.forecastday[0].astro.sunset}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}