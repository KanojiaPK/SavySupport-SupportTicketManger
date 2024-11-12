import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CustomerForm.css";

const CustomerForm = () => {
  const navigate = useNavigate();

  const [features, setFeatures] = useState([
    "Feature 1",
    "Feature 2",
    "Feature 3",
  ]);
  const [selectedFeatures, setSelectedFeatures] = useState({});
  const [newFeature, setNewFeature] = useState("");
  const [showFeatureInput, setShowFeatureInput] = useState(false);

  const [problemTypes, setProblemTypes] = useState([
    "Type 1",
    "Type 2",
    "Type 3",
  ]);
  const [selectedProblemTypes, setSelectedProblemTypes] = useState({});
  const [newProblemType, setNewProblemType] = useState("");
  const [showProblemTypeInput, setShowProblemTypeInput] = useState(false);

  const [images, setImages] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData?._id || null;
    setUserId(userId);
  }, []);

  const toggleFeatureButton = (feature) => {
    setSelectedFeatures((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }));
  };

  const addFeature = () => {
    if (newFeature && !features.includes(newFeature)) {
      setFeatures([...features, newFeature]);
      setNewFeature("");
      setShowFeatureInput(false);
    }
  };

  const toggleProblemTypeButton = (problemType) => {
    setSelectedProblemTypes((prev) => ({
      ...prev,
      [problemType]: !prev[problemType],
    }));
  };

  const addProblemType = () => {
    if (newProblemType && !problemTypes.includes(newProblemType)) {
      setProblemTypes([...problemTypes, newProblemType]);
      setNewProblemType("");
      setShowProblemTypeInput(false);
    }
  };

  return (
    <div>
      <h1>Any place in your app!</h1>
      <Formik
        initialValues={{
          title: "",
          explainproblem: "",
          typeoffeature: "",
          typeofproblem: "",
          status: [],
          images: [],
          priority: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            errors.title = "Required";
          }
          if (!values.explainproblem) {
            errors.explainproblem = "Required";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const formData = {
              title: values.title,
              explainproblem: values.explainproblem,
              typeoffeature: Object.keys(selectedFeatures)
                .filter((feature) => selectedFeatures[feature])
                .join(", "),
              typeofproblem: Object.keys(selectedProblemTypes)
                .filter((problemType) => selectedProblemTypes[problemType])
                .join(", "),
              priority: values.priority,
              owner: userId,
              images: Array.from(images).map((file) => file.name),
            };

            const response = await axios.post(
              "http://localhost:8003/api/v1/tickets/add-tickets",
              formData
            );
            // alert(JSON.stringify(response.data, null, 2));

            if (Object.keys(response.data).length !== 0) {
              // Redirect to 'ticketsubmitted' route using navigate
              navigate("/customermain/ticketsubmitted");
            }
          } catch (error) {
            console.error("Error submitting form", error);
            alert("Error submitting form");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-bold text-white"
              >
                Write a Descriptive Title
              </label>
              <Field
                type="text"
                name="title"
                id="title"
                className="w-full px-3 py-2 border rounded-md bg-[#e1d2d256] text-white"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="explainproblem"
                className="block mb-2 text-sm font-bold text-white"
              >
                Explain Your Problem
              </label>
              <Field
                as="textarea"
                name="explainproblem"
                id="explainproblem"
                rows="5"
                onChange={(e) => {
                  setNewFeature(e.target.value);
                  setFieldValue("explainproblem", e.target.value); // Update field value
                }}
                className="w-full px-3 py-2 rounded-md bg-[#e1d2d256] text-white shadow-lg"
              />
              <ErrorMessage
                name="explainproblem"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="images"
                className="block mb-2 text-sm font-bold text-white"
              >
                Upload Image
              </label>
              <input
                type="file"
                name="images"
                id="images"
                multiple
                onChange={(e) => setImages(e.target.files)}
                accept="image/*"
                className={`text-white border rounded-md ${
                  images.length > 0 ? "bg-[#be185d95]" : "bg-[#e1d2d256]"
                }`}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="typeoffeature"
                className="block mb-2 text-sm font-bold text-white"
              >
                What is the feature related to this problem?
              </label>
              <div className="flex flex-row">
                <div className="flex flex-wrap mb-2">
                  {features.map((feature, index) => (
                    <button
                      type="button"
                      key={index}
                      className={`px-2 py-1 mr-2 mb-2 rounded-lg text-white ${
                        selectedFeatures[feature]
                          ? "bg-[#be185d95]"
                          : "bg-[#E1D2D290]"
                      }`}
                      onClick={() => toggleFeatureButton(feature)}
                    >
                      {feature}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setShowFeatureInput(!showFeatureInput)}
                  className="px-2 py-1 mb-4 text-white rounded-lg"
                  style={{ backgroundColor: "rgb(225 210 210 / 35%)" }}
                >
                  {showFeatureInput ? "Cancel" : "Add Feature"}
                </button>
              </div>
              {showFeatureInput && (
                <div className="flex mb-4">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    className="px-2 py-1 mr-2 border rounded-md"
                    placeholder="Add new feature"
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-2 py-1 text-white rounded"
                    style={{ backgroundColor: "rgb(225 210 210 / 35%)" }}
                  >
                    Add
                  </button>
                </div>
              )}
              <ErrorMessage
                name="typeoffeature"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="typeofproblem"
                className="block mb-2 text-sm font-bold text-white"
              >
                What type of problem?
              </label>

              <div className="flex flex-row">
                <div className="flex flex-wrap mb-2">
                  {problemTypes.map((problemType, index) => (
                    <button
                      type="button"
                      key={index}
                      className={`px-2 py-1 mr-2 mb-2 rounded-lg text-white ${
                        selectedProblemTypes[problemType]
                          ? "bg-[#be185d95]"
                          : "bg-[#E1D2D290]"
                      }`}
                      onClick={() => toggleProblemTypeButton(problemType)}
                    >
                      {problemType}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setShowProblemTypeInput(!showProblemTypeInput)}
                  className="px-2 py-1 mb-4 text-white rounded-lg"
                  style={{ backgroundColor: "rgb(225 210 210 / 35%)" }}
                >
                  {showProblemTypeInput ? "Cancel" : "Add Type"}
                </button>
              </div>
              {showProblemTypeInput && (
                <div className="flex mb-4">
                  <input
                    type="text"
                    value={newProblemType}
                    onChange={(e) => setNewProblemType(e.target.value)}
                    className="px-2 py-1 mr-2 border rounded-md"
                    placeholder="Add new type of problem"
                  />
                  <button
                    type="button"
                    onClick={addProblemType}
                    className="px-2 py-1 text-white rounded-lg"
                    style={{ backgroundColor: "rgb(225 210 210 / 35%)" }}
                  >
                    Add
                  </button>
                </div>
              )}
              <ErrorMessage
                name="typeofproblem"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="priority"
                className="flex flex-row items-center mb-2 text-sm font-bold text-white"
              >
                Priority{" "}
                <lord-icon
                  src="https://cdn.lordicon.com/usownftb.json"
                  trigger="hover"
                  stroke="bold"
                  state="hover-oscillate"
                  colors="primary:#dd335c,secondary:#dd335c"
                  style={{ width: "45px", height: "30px" }}
                ></lord-icon>
              </label>

              <div className="flex flex-col flex-wrap mb-2">
                {["Low", "Medium", "High"].map((option, index) => (
                  <label key={index} className="mb-2 mr-4">
                    <Field
                      type="radio"
                      name="priority"
                      value={option}
                      className="mr-1"
                    />
                    <span
                      className={`text-white ${
                        values.priority === option ? "priority-selected" : ""
                      }`}
                    >
                      {option}
                    </span>
                  </label>
                ))}
              </div>
              <ErrorMessage
                name="priority"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="status"
                className="block mb-2 text-sm font-bold text-white"
              >
                To help us understand how it affects you, check all that apply
              </label>
              <div className="flex flex-col flex-wrap mb-2 text-white">
                {[
                  "Affects the primary functionality of the product",
                  "Prevents completion of tasks",
                  "No reasonable workaround available",
                  "Product unusable unless fixed",
                ].map((option, index) => (
                  <label key={index} className="mb-2 mr-4">
                    <Field
                      type="checkbox"
                      name="status"
                      value={option}
                      className="mr-1"
                    />
                    <span
                      className={`text-white ${
                        values.status.includes(option) ? "checkboxescolors" : ""
                      }`}
                    >
                      {option}
                    </span>
                  </label>
                ))}
              </div>
              <ErrorMessage
                name="status"
                component="div"
                className="text-red-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CustomerForm;
