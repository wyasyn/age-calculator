import { useState } from "react";
import arrow from "./assets/icon-arrow.svg";

function App() {
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [errors, setErrors] = useState({ day: "", month: "", year: "" });
    const [age, setAge] = useState({ years: "--", months: "--", days: "--" });

    const validateInputs = () => {
        const newErrors = { day: "", month: "", year: "" };
        let isValid = true;

        if (day < 1 || day > 31) {
            newErrors.day = "Please enter a valid day.";
            isValid = false;
        }
        if (month < 1 || month > 12) {
            newErrors.month = "Please enter a valid month.";
            isValid = false;
        }
        if (year.length !== 4 || year > new Date().getFullYear()) {
            newErrors.year = "Please enter a valid year.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const calculateAge = () => {
        if (!validateInputs()) return;

        const birthDate = new Date(`${year}-${month}-${day}`);
        const today = new Date();

        if (birthDate > today) {
            setErrors({
                day: "",
                month: "",
                year: "Date must be in the past.",
            });
            return;
        }

        setErrors({ day: "", month: "", year: "" });

        const diffTime = Math.abs(today - birthDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const years = Math.floor(diffDays / 365.25);
        const months = Math.floor((diffDays % 365.25) / 30.44);
        const days = Math.floor((diffDays % 365.25) % 30.44);

        setAge({ years, months, days });
    };

    return (
        <div className="App">
            <div className="content">
                <div className="input-container">
                    <div className={`input ${errors.day ? "error" : ""}`}>
                        <span className={`item ${errors.day ? "error" : ""}`}>
                            Day
                        </span>
                        <input
                            type="number"
                            placeholder="DD"
                            value={day}
                            onChange={(e) => setDay(e.target.value)}
                        />
                        {errors.day && (
                            <span className="error-text">{errors.day}</span>
                        )}
                    </div>
                    <div className={`input ${errors.month ? "error" : ""}`}>
                        <span className={`item ${errors.month ? "error" : ""}`}>
                            Month
                        </span>
                        <input
                            type="number"
                            placeholder="MM"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                        />
                        {errors.month && (
                            <span className="error-text">{errors.month}</span>
                        )}
                    </div>
                    <div className={`input ${errors.year ? "error" : ""}`}>
                        <span className={`item ${errors.year ? "error" : ""}`}>
                            Year
                        </span>
                        <input
                            type="number"
                            placeholder="YYYY"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        />
                        {errors.year && (
                            <span className="error-text">{errors.year}</span>
                        )}
                    </div>
                </div>
                <div className="btn-container">
                    <button onClick={calculateAge} className="btn-submit">
                        <div>
                            <img src={arrow} alt="arrow" />
                        </div>
                    </button>
                </div>
                <div className="age-result">
                    <p className="output">
                        <span>{age.years}</span> years
                    </p>
                    <p className="output">
                        <span>{age.months}</span> months
                    </p>
                    <p className="output">
                        <span>{age.days}</span> days
                    </p>
                </div>
            </div>
        </div>
    );
}

export default App;
