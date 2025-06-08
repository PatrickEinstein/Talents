import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FullUserDetails, IGigToEdit } from "../types";
import { BiTrash } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import { PiCaretLeft } from "react-icons/pi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = ({ fulluser }: { fulluser: FullUserDetails }) => {
  const navigate = useNavigate();
  const [currentJob, _] = useState<IGigToEdit | null>(null);

  const jobDescription = {
    "Company Name": "",
    Role: "",
    "Start Date": "",
    "End Date": "",
    Skills: "",
    Present: "false",
  };

  const [experiences, setExperiences] = useState([jobDescription]);
  const [cv, setCv] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experiences: [jobDescription],
  });

  useEffect(() => {
    try {
      setFormData((prev) => ({
        ...prev,
        name: `${fulluser?.firstName} ${fulluser?.lastName}`,
        email: fulluser?.email ?? "",
        phone: fulluser?.phone ?? "",
      }));
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  const [__, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCv(e.target.files[0]);
    }
  };

  const handleRemoveCv = () => {
    setCv(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !cv) {
      toast.error("Please fill in all required fields including CV."); // ✅
      return;
    }

    setSubmitted(true);
    setCv(null);

    toast.success("Profile updated successfully!"); 
  };

  const handleExperienceChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedExperiences = formData.experiences.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    setFormData((prev) => ({
      ...prev,
      experiences: updatedExperiences,
    }));
  };

  const handleAddExperience = () => {
    setExperiences((prev) => [...prev, jobDescription]);
    setFormData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, { ...jobDescription }],
    }));
  };

  const handleDeleteExperience = (index: number) => {
    if (experiences.length > 1) {
      const newExperience = experiences.filter((_, i) => i !== index);
      setExperiences(newExperience);
      setFormData((prev) => ({
        ...prev,
        experiences: prev.experiences.filter((_, i) => i !== index),
      }));
    } else {
      toast.warning("You must provide at least one job experience."); // ✅
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
        <PiCaretLeft
          className="text-xl text-slate-400 cursor-pointer"
          onClick={() => navigate(-1)}
        />

        <h2 className="text-2xl font-bold mb-6 text-center">
          {currentJob?.title || "Update Your Profile"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
        
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
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

        
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
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

       
          <div>
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
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

        
          <div>
            <label htmlFor="cv" className="block text-gray-700 font-medium mb-2">
              Upload CV <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="cv"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {cv && (
              <div className="mt-2 flex justify-between items-center bg-gray-100 p-2 rounded-md">
                <span className="text-sm text-gray-700">{cv.name}</span>
                <button
                  type="button"
                  className="text-sm text-red-500 hover:underline"
                  onClick={handleRemoveCv}
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Experience Section */}
          {formData.experiences.map((exp, index) => (
            <div key={index} className="relative border p-4 rounded-md bg-gray-50">
              <label className="block text-gray-700 font-medium mb-2">
                Work Experience {index + 1}
              </label>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                   className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Company Name"
                  value={exp["Company Name"]}
                  onChange={(e) =>
                    handleExperienceChange(index, "Company Name", e.target.value)
                  }
                />
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Role"
                  value={exp["Role"]}
                  onChange={(e) => handleExperienceChange(index, "Role", e.target.value)}
                />
                <div className="flex flex-col md:flex-row md:gap-4">
                  <div className="flex-1">
                    <label className="block text-sm text-gray-700 mb-1 ml-1">Start Date</label>
                    <input
                      type="date"
                       className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      value={exp["Start Date"]}
                      onChange={(e) =>
                        handleExperienceChange(index, "Start Date", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm text-gray-700 mb-1 ml-1">End Date</label>
                    <input
                      type="date"
                       className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      disabled={exp["Present"] === "true"}
                      value={
                        exp["Present"] === "true" ? "Present" : exp["End Date"]
                      }
                      onChange={(e) =>
                        handleExperienceChange(index, "End Date", e.target.value)
                      }
                    />
                  </div>
                </div>

                <label className="inline-flex items-center mt-1 text-sm text-gray-600 ml-1">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={exp["Present"] === "true"}
                    onChange={(e) =>
                      handleExperienceChange(
                        index,
                        "Present",
                        e.target.checked ? "true" : "false"
                      )
                    }
                  />
                  I am presently working here
                </label>

                <input
                  type="text"
                   className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Skills"
                  value={exp["Skills"]}
                  onChange={(e) =>
                    handleExperienceChange(index, "Skills", e.target.value)
                  }
                />
              </div>
              <BiTrash
                className="absolute right-3 top-3 text-xl text-red-500 cursor-pointer"
                onClick={() => handleDeleteExperience(index)}
              />
            </div>
          ))}

          
          <div className="w-full relative h-7">
            <BsPlus
              className="absolute right-0 text-2xl text-blue-600 cursor-pointer"
              onClick={handleAddExperience}
            />
          </div>

          
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold p-3 rounded-lg hover:bg-blue-600 transition"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>

 
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default ProfilePage;
