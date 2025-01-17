import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GigsPool } from "../constatnts";
import { IGigToEdit } from "../types";
import { BiTrash } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";

const Applynow = () => {
  const [searchParams] = useSearchParams();
  const [currentJob, setCurrentJob] = useState<IGigToEdit>({
    amount: "",
    by: "",
    date: new Date(),
    description: "",
    eligibility: "",
    image: "",
    index: "",
    location: "",
    mode: "Remote",
    pay: "Commission",
    title: "",
  });
  const id = searchParams.get("apply");
  useEffect(() => {
    const applytingJob = GigsPool.find(
      (gigs: IGigToEdit) => gigs.index === id
    ) as IGigToEdit;
    setCurrentJob(applytingJob);
    console.log(applytingJob);
  }, [id]);

  const jonDescription = {
    company: "Company Name",
    role: "Role",
    startDate: "Start Date",
    endDate: "End Date",
    skills: "Skills",
  };

  const [experiences, setExperiences] = useState([jonDescription]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    skills: "",
  });

  useEffect(() => {
    console.log(experiences);
  }, [experiences]);

  const [cv, setCv] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCv(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !cv) {
      alert("Please fill in all required fields.");
      return;
    }

    console.log("Application Submitted:", {
      ...formData,
      cv,
    });

    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      experience: "",
      skills: "",
    });
    setCv(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {currentJob?.title}
        </h2>
        {submitted && (
          <div className="mb-4 text-green-600 text-center">
            Application submitted successfully!
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email address"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-gray-700 font-medium mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your phone number"
            />
          </div>

          {/* CV Upload */}
          <div>
            <label
              htmlFor="cv"
              className="block text-gray-700 font-medium mb-2"
            >
              Upload CV <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="cv"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Experience */}

          {experiences.map(
            ({ company, endDate, role, skills, startDate }, index) => (
              <div key={index} className="relative">
                <label
                  htmlFor="experience"
                  className="block text-gray-700  font-medium mb-2"
                >
                  Work Experience {index + 1}
                </label>
                <div className="flex flex-col justify-between  gap-2">
                  <input
                    type="text"
                    className=" bg-slate-200 h-[60px] rounded-xl px-6 py-6 w-full"
                    placeholder={company}
                  />
                  <input
                    type="text"
                    className="h-[30px] bg-slate-200 rounded-xl px-6 py-6 w-full"
                    placeholder={role}
                  />
                  <input
                    type="date"
                    className="h-[30px] bg-slate-200 rounded-xl px-6 py-6 w-full"
                    placeholder={startDate}
                  />
                  <input
                    type="date"
                    className="h-[30px] bg-slate-200 rounded-xl px-6 py-6 w-full"
                    placeholder={endDate}
                  />
                  <input
                    type="text"
                    className="h-[30px] bg-slate-200 rounded-xl px-6 py-6 w-full"
                    placeholder={skills}
                  />
                </div>
                <BiTrash
                  className="absolute right-3 text-2xl top-0"
                  onClick={() => {
                    if (experiences.length > 1) {
                      const newExperience = experiences.splice(index, 1);
                      setExperiences(newExperience);
                    } else {
                      alert("You must provide at least one job experience");
                    }
                  }}
                />
              </div>
            )
          )}
          <div className="w-full relative h-7">
            <BsPlus
              className="absolute right-0"
              onClick={() =>
                setExperiences((prev) => [...prev, jonDescription])
              }
            />
          </div>

          {/* Skills */}
          <div>
            <label
              htmlFor="skills"
              className="block text-gray-700 font-medium mb-2"
            >
              Skills
            </label>
            <textarea
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="List your skills separated by commas (e.g., JavaScript, React, Tailwind)"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold p-3 rounded-lg hover:bg-blue-600 transition"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Applynow;
