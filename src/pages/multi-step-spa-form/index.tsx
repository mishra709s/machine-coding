import { useState } from 'react'
import styles from './multi-step-spa-form.module.css'

const MultiStepSPAForm = () => {
  const [steps, setSteps] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  const handleNext = () => {
    setSteps((ps) => ps + 1)
  }

  const handleBack = () => {
    setSteps((ps) => ps - 1)
  }

  console.log(formData)

  if (isSubmitted) {
    return (
      <div className={styles.app}>
        <div className={styles.formContainer}>
          <h2>Submitted!</h2>
          <p>
            <strong>Name:</strong>
            {formData.name}
          </p>
          <p>
            <strong>Email:</strong>
            {formData.email}
          </p>
          <p>
            <strong>DOB:</strong>
            {formData.dob}
          </p>
          <p>
            <strong>Password:</strong>
            {formData.password}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.app}>
      <h1>Step Sign Up Form</h1>

      <div className={styles.formContainer}>
        <div className={styles.backBtnContainer}>
          {steps > 0 ? (
            <button onClick={handleBack} className={styles.backBtn}>
              Back
            </button>
          ) : null}
        </div>
        <div>
          {steps === 0 ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter your name"
              onChange={handleChange}
            />
          ) : null}
          {steps === 1 ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Enter your email"
              onChange={handleChange}
            />
          ) : null}
          {steps === 2 ? (
            <input
              type="date"
              name="dob"
              value={formData.dob}
              placeholder="Enter your DOB"
              onChange={handleChange}
            />
          ) : null}
          {steps === 3 ? (
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Enter your password"
              onChange={handleChange}
            />
          ) : null}
        </div>

        <div className={styles.buttonGroup}>
          {steps < 3 ? <button onClick={handleNext}>Next</button> : null}
          {steps === 3 ? <button onClick={handleSubmit}>Submit</button> : null}
        </div>
      </div>
    </div>
  )
}

export default MultiStepSPAForm
