import { useState } from "react";
import { PiX } from "react-icons/pi";

interface IGigToEdit {
  title: string;
  description: string;
  by: string;
  mode: "Remote" | "On-site" | "Hybrid";
  pay: "Commission" | "Hourly" | "Fixed";
  eligibility: string;
  image: string;
  date: Date;
  location: string;
}

interface IEditJobAdvert {
  SetIsOpenEditGig: React.Dispatch<React.SetStateAction<boolean>>;
  Gig: IGigToEdit;
}

const EditJobAdvert = ({ SetIsOpenEditGig, Gig }: IEditJobAdvert) => {
    console.log(`Current Gig to Edit`, Gig)
  const [formData, setFormData] = useState({
    jobTitle: Gig.title,
    jobDescription: Gig.description,
    by: Gig.by,
    workmode: Gig.mode,
    remuneration: Gig.pay,
    image: Gig.image,
    date: new Date(),
    eligibility: Gig.eligibility,
    // location: location
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.jobTitle ||
      !formData.jobDescription ||
      !formData.remuneration ||
      !formData.workmode ||
      !formData.eligibility
    ) {
      alert("Please fill in all fields.");
      return;
    }

    console.log("Job Advert Submitted: ", formData);
    setSubmitted(true);

    // Reset form
    setFormData({
      jobTitle: "",
      jobDescription: "",
      by: "",
      workmode: "Remote",
      remuneration: "Hourly",
      image: "",
      date: new Date(),
      eligibility: "",
      //   location: ,
    });
  };

  return (
    <div className="min-h-screen  flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl">
        <div className="flex flex-row items-center mb-6 justify-between">
          <h2 className="text-2xl font-semibold ">
            Edit{" "}
            <span className="text-slate-400 font-extralight">{Gig.title}</span>
          </h2>
          <span className="text-3xl font-extrabold text-red-700">
            <PiX onClick={() => SetIsOpenEditGig((prev: boolean) => !prev)} />
          </span>
        </div>
        {submitted && (
          <div className="mb-4 text-green-600 text-center">
            Job advert edited successfully!
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Title */}
          <div>
            <label
              htmlFor="jobTitle"
              className="block text-gray-700 font-medium mb-2"
            >
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter the job title"
              required
            />
          </div>

          {/* Job Description */}
          <div>
            <label
              htmlFor="jobDescription"
              className="block text-gray-700 font-medium mb-2"
            >
              Job Description
            </label>
            <textarea
              id="jobDescription"
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Provide a detailed job description"
              required
            />
          </div>

          {/* Work Mode */}
          <div>
            <label
              htmlFor="WorkMode"
              className="block text-gray-700 font-medium mb-2"
            >
              Work Mode
            </label>
            <select
              id="workmode"
              name="workmode"
              value={formData.workmode}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">Select a mode of payment</option>
              <option value="Hourly">Remote</option>
              <option value="Weekly">On-Site</option>
              <option value="Monthly">Hybrid</option>
            </select>
          </div>

          {/* Mode of Payment */}
          <div>
            <label
              htmlFor="modeOfPayment"
              className="block text-gray-700 font-medium mb-2"
            >
              Mode of Payment
            </label>
            <select
              id="remuneration"
              name="remuneration"
              value={formData.remuneration}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">Select a mode of payment</option>
              <option value="Hourly">Hourly</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Commission">Commission</option>
            </select>
          </div>

          {/* Eligibility */}
          <div>
            <label
              htmlFor="eligibility"
              className="block text-gray-700 font-medium mb-2"
            >
              Eligibility
            </label>
            <textarea
              id="eligibility"
              name="eligibility"
              value={formData.eligibility}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="List the eligibility criteria (e.g., Bachelor's degree, 2 years experience)"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold p-3 rounded-lg hover:bg-blue-600 transition"
            >
              Submit Job Advert
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobAdvert;
