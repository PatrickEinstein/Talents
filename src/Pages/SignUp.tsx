import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SignUpInputs = [
  { label: "First Name", name: "firstName", placeholder: "John" },
  { label: "Last Name", name: "lastName", placeholder: "Doe" },
  { label: "Date of Birth", name: "dOB", placeholder: "1/1/2017" },
  {
    label: "Nationality",
    name: "nationality",
    placeholder: "Select your country",
  },
  {
    label: "State Of Residence",
    name: "stateOfResidence",
    placeholder: "Select your state",
  },
  { label: "City", name: "City", placeholder: "2 Louis St, Ikeja" },
];

const SignupPage = () => {
  const [countries, setCountries] = useState<{ name: string }[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    dOB: "",
    nationality: "",
    stateOfResidence: "",
    City: "",
  });

  const onHandleChange = (e: any) => {
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
  };

  const getAllCountries = async () => {
    try {
      const res = await fetch(
        "https://countriesnow.space/api/v0.1/countries/positions"
      );
      const data = await res.json();
      setCountries(data.data || []);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const getAllStateofCountry = async (country: string) => {
    try {
      setSelectedCountry(country);
      const res = await fetch(
        "https://countriesnow.space/api/v0.1/countries/states",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country }),
        }
      );
      const data = await res.json();
      setStates(data.data.states.map((state: { name: string }) => state.name));
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const getAllCitiesofState = async (country: string, state: string) => {
    try {
      const res = await fetch(
        "https://countriesnow.space/api/v0.1/countries/state/cities",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country, state }),
        }
      );
      const data = await res.json();
      console.log(`cities==>`, data);
      setCities(data.data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  useEffect(() => {
    getAllCountries();
    console.log(formData);
  }, [formData]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form className="flex flex-col gap-4">
        {SignUpInputs.map(({ label, name, placeholder }) => {
          if (label === "Nationality") {
            return (
              <select
                key={name}
                name={name}
                value={formData.nationality}
                className="p-2 border rounded"
                onChange={(e) => {
                  getAllStateofCountry(e.target.value);
                  onHandleChange(e);
                }}
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            );
          }

          if (label === "State Of Residence") {
            return (
              <select
                key={name}
                name={name}
                value={formData.stateOfResidence}
                onChange={(e) => {
                  getAllCitiesofState(selectedCountry, e.target.value);
                  onHandleChange(e);
                }}
                className="p-2 border rounded"
              >
                <option value="">Select a state</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            );
          }

          if (label === "City") {
            return (
              <select
                name={name}
                value={formData.City}
                onChange={onHandleChange}
                key={name}
                className="p-2 border rounded"
              >
                <option value="">Select a city</option>
                {cities.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            );
          }

          if (label === "Date of Birth") {
            return (
              <input
                key={label}
                type="date"
                name={name}
                placeholder={placeholder}
                required
                className="p-2 border rounded"
                onChange={onHandleChange}
              />
            );
          }

          return (
            <input
              key={label}
              type="text"
              name={name}
              placeholder={placeholder}
              required
              className="p-2 border rounded"
              onChange={onHandleChange}
            />
          );
        })}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignupPage;
