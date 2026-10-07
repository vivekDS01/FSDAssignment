import { useState } from "react";
import "./UserForm.css";

const emptyForm = {
  name: "",
  email: "",
  age: "",
  gender: "",
  course: "",
  subscribe: false,
  message: "",
};

function UserForm() {
  const [formData, setFormData] = useState(emptyForm);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function handleReset() {
    setFormData(emptyForm);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <h2>User Details</h2>

        <label htmlFor="name">Name</label>
        <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} />

        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} />

        <label htmlFor="age">Age</label>
        <input id="age" type="number" name="age" value={formData.age} onChange={handleChange} />

        <label>Gender</label>
        <div className="radio-row">
          <label>
            <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} />
            Male
          </label>
          <label>
            <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} />
            Female
          </label>
          <label>
            <input type="radio" name="gender" value="Other" checked={formData.gender === "Other"} onChange={handleChange} />
            Other
          </label>
        </div>

        <label htmlFor="course">Course</label>
        <select id="course" name="course" value={formData.course} onChange={handleChange}>
          <option value="">Select a course</option>
          <option value="Web Development">Web Development</option>
          <option value="Data Science">Data Science</option>
          <option value="Cyber Security">Cyber Security</option>
        </select>

        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows="3" value={formData.message} onChange={handleChange} />


        <button type="button" onClick={handleReset}>Clear form</button>
      </form>

      <div className="preview">
        <h2>Live Preview</h2>
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Age:</strong> {formData.age}</p>
        <p><strong>Gender:</strong> {formData.gender}</p>
        <p><strong>Course:</strong> {formData.course}</p>
        <p><strong>Message:</strong> {formData.message}</p>
        
      </div>
    </div>
  );
}

export default UserForm;