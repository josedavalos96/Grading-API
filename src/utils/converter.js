const funcs = {
    /* -------------------------- Kelvin Conversions ------------------------- */
    kelvinToCelsius: function kelvinToCelsius(number){
        //* Formula: 0K - 273.15
        return number - 273.15;
    },

    kelvinToFahrenheit: function kelvinToFahrenheit(number){
        //* Formula: (0K − 273.15) × 9/5 + 32
        return ( number - 273.15 ) * 9/5 + 32;
    },

    kelvinToRankie: function kelvinToRankie(number){
        //* Formula: 0k x 1.8
        return number * 1.8;
    },
    /* -------------------------- Celsius Conversions ------------------------- */
    celsiusToKelvin: function celsiusToKelvin(number){
        //* Formula: 0°C + 273.15 = 273.15K
        return number + 273.15;
    },
    celsiusToFahrenheit: function celsiusToFahrenheit(number){
        //* Formula: (0°C × 9/5) + 32 = 32°F
        return ( number * 9/5 ) + 32;
    },

    celsiusToRankie: function celsiusToRankie(number){
        //* Formula: ( [°C] + 273.15 ) × 9 / 5
        return ( number + 273.15 ) * 9/5;
    },
    /* ------------------------- Fahrenheit Conversions ------------------------- */

    fahrenheitToKelvin: function fahrenheitToKelvin(number){
        //* Formula: (32°F − 32) × 5/9 + 273.15 = 273.15K
        return (number - 32) *5/9 + 273.15;
    },
    fahrenheitToCelsius: function fahrenheitToCelsius(number){
        //* Formula: (32°F − 32) × 5/9 = 0°C
        return (number - 32) * 5/9;
    },

    fahrenheitToRankie: function fahrenheitToRankie(number){
        //* Formula: Fahrenheit + 459.67
        return number + 459.67;
    },
    /* --------------------------- Rankie Conversions --------------------------- */
    rankieToKelvin: function rankieToKelvin(number){
        //* Formula: 0°R × 5/9 = 0K
        return number * 5/9; 
    },
    rankieToCelsius: function rankieToCelsius(number){
        //* Formula: (0°R − 491.67) × 5/9 = -273.1°C
        return (number - 491.67)* 5/9;
    },
    rankieToFahrenheit: function rankieToFahrenheit(number){
        //* Formula: 1°R − 459.67 = -458.7°F
        return number - 459.67;
    },
};


module.exports = funcs;