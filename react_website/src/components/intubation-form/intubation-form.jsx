import React, { useState } from "react";
import { Form, Button, Box } from "react-bulma-components";
import Select from "react-select";

const ActiveTab = {
  Step1: 1, // age, sex
  Step2: 2, // patienttype, entry date, symptoms started, contact_other_covid
  Step3: 3, // pregnancy ?? if female
  Step4: 4, // lung: pneumonia, copd, asthma, tobacco
  Step5: 5, // immunosupressed, diabetes, renal_chronic
  Step6: 6, // heart: hypertension, cardiovascular, obesity
  Step7: 7,
};

const IntubationForm = () => {
  const { Field, Control, Label } = Form;
  const [activeTab, setActiveTab] = useState(1);
  const [age, setAge] = useState("");
  const [sex, setSex] = useState(-1);
  const [selectedPatientType, setSelectedPatientType] = useState("");
  const [symptomsStartDate, setSymptomsStartDate] = useState("");
  const [contactOtherCovid, setContactOtherCovid] = useState();
  const [pregnant, setPregnant] = useState(false);
  const [pneumonia, setPneumonia] = useState(false);
  const [copd, setCopd] = useState(false);
  const [asthma, setAsthma] = useState(false);
  const [tobacco, setTobacco] = useState(false);
  const [immunosupressed, setImmunosupressed] = useState(false);
  const [diabetes, setDiabetes] = useState(false);
  const [renalChronic, setRenalChronic] = useState(false);
  const [hypertension, setHypertension] = useState(false);
  const [cardiovascular, setCardiovascular] = useState(false);
  const [obesity, setObesity] = useState(false);
  const [otherDisease, setOtherDisease] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const getFieldsAsFormData = () => {
    return {
      instances: [
        {
          features: [
            parseInt(sex.value),
            parseInt(age),
            pneumonia ? 1 : 2,
            diabetes ? 1 : 2,
            immunosupressed ? 1 : 2,
            hypertension ? 1 : 2,
            otherDisease ? 1 : 2,
            cardiovascular ? 1 : 2,
            obesity ? 1 : 2,
          ],
        },
      ],
    };
  };

  const submit = () => {
    fetch(
      `${process.env.REACT_APP_URL}${process.env.REACT_APP_STAGE_NAME}/${process.env.REACT_APP_RESOURCE_NAME}`,
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(getFieldsAsFormData()),
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        setPrediction(data.predictions[0]);
        setActiveTab(activeTab + 1);
      });
  };

  return (
    <>
      {activeTab > 1 && activeTab < 7 ? (
        <Button className="is-text" onClick={() => setActiveTab(activeTab - 1)}>
          Back
        </Button>
      ) : activeTab === 7 ? (
        <Button
          className="is-text"
          onClick={() => {
            setAge();
            setAsthma();
            setCardiovascular();
            setContactOtherCovid();
            setCopd();
            setDiabetes();
            setHypertension();
            setObesity();
            setOtherDisease();
            setPneumonia();
            setPrediction();
            setPregnant();
            setRenalChronic();
            setSelectedPatientType();
            setSymptomsStartDate();
            setSex();
            setTobacco();
            setActiveTab(1);
          }}
        >
          New patient
        </Button>
      ) : null}
      <Box>
        {activeTab === ActiveTab.Step1 && (
          <>
            <Field>
              <Label>Age</Label>
              <Control>
                <input
                  className="input"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Patient's Age"
                />
              </Control>
            </Field>
            <Field>
              <Label>Sex</Label>
              <Control>
                <Select
                  value={sex}
                  onChange={setSex}
                  options={[
                    { value: "1", label: "Female" },
                    { value: "2", label: "Male" },
                  ]}
                />
              </Control>
            </Field>
          </>
        )}
        {activeTab === ActiveTab.Step2 && (
          <>
            {/* patienttype, symptoms started, contact_other_covid */}
            <Field>
              <Label>
                Has the patient been in contact with another individual that has
                has tested positive for Covid-19?
              </Label>
              <Control>
                <label className="radio">
                  <input
                    type="radio"
                    checked={contactOtherCovid}
                    onChange={() => setContactOtherCovid(true)}
                  />
                  Yes
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    checked={!contactOtherCovid}
                    onChange={() => setContactOtherCovid(false)}
                  />
                  No
                </label>
              </Control>
            </Field>
            <Field>
              <Label>Patient Type</Label>
              <Control>
                <Select
                  value={selectedPatientType}
                  onChange={setSelectedPatientType}
                  options={[
                    { value: "1", label: "Outpatient" },
                    { value: "2", label: "Inpatient" },
                  ]}
                />
              </Control>
            </Field>
            <Field>
              <Label>What date did the symptoms start?</Label>
              <Control>
                <input
                  type="date"
                  className="input"
                  value={symptomsStartDate}
                  onChange={(e) => setSymptomsStartDate(e.target.value)}
                />
              </Control>
            </Field>
          </>
        )}
        {activeTab === ActiveTab.Step3 && (
          <>
            {/* pregnancy ?? if female */}
            <Field>
              <Label>Is the patient pregnant?</Label>
              <Control>
                <label className="radio">
                  <input
                    type="radio"
                    checked={pregnant}
                    onChange={() => setPregnant(true)}
                  />
                  Yes
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    checked={!pregnant}
                    onChange={() => setPregnant(false)}
                  />
                  No
                </label>
              </Control>
            </Field>
          </>
        )}
        {activeTab === ActiveTab.Step4 && (
          <>
            {/* pneumonia, copd, asthma, tobacco */}
            <Field>
              <Label>Is the patient presenting symptoms of Pneumonia?</Label>
              <Control>
                <label className="radio">
                  <input
                    type="radio"
                    checked={pneumonia}
                    onChange={() => setPneumonia(true)}
                  />
                  Yes
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    checked={!pneumonia}
                    onChange={() => setPneumonia(false)}
                  />
                  No
                </label>
              </Control>
            </Field>
            <Field>
              <Label>Does the patient have COPD?</Label>
              <Control>
                <label className="radio">
                  <input
                    type="radio"
                    checked={copd}
                    onChange={() => setCopd(true)}
                  />
                  Yes
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    checked={!copd}
                    onChange={() => setCopd(false)}
                  />
                  No
                </label>
              </Control>
            </Field>
            <Field>
              <Label>Does the patient have Asthma?</Label>
              <Control>
                <label className="radio">
                  <input
                    type="radio"
                    checked={asthma}
                    onChange={() => setAsthma(true)}
                  />
                  Yes
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    checked={!asthma}
                    onChange={() => setAsthma(false)}
                  />
                  No
                </label>
              </Control>
            </Field>
            <Field>
              <Label>Is the patient a smoker?</Label>
              <Control>
                <label className="radio">
                  <input
                    type="radio"
                    checked={tobacco}
                    onChange={() => setTobacco(true)}
                  />
                  Yes
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    checked={!tobacco}
                    onChange={() => setTobacco(false)}
                  />
                  No
                </label>
              </Control>
            </Field>
          </>
        )}
        {activeTab === ActiveTab.Step5 && (
          <>
            {/* immunosupressed, diabetes, renal_chronic */}
            <Field>
              <Label>Does the patient have immunosuppression?</Label>
              <Control>
                <label className="radio">
                  <input
                    type="radio"
                    checked={immunosupressed}
                    onChange={() => setImmunosupressed(true)}
                  />
                  Yes
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    checked={!immunosupressed}
                    onChange={() => setImmunosupressed(false)}
                  />
                  No
                </label>
              </Control>
            </Field>
            <Field>
              <Label>Does the patient have diabetes?</Label>
              <Control>
                <label className="radio">
                  <input
                    type="radio"
                    checked={diabetes}
                    onChange={() => setDiabetes(true)}
                  />
                  Yes
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    checked={!diabetes}
                    onChange={() => setDiabetes(false)}
                  />
                  No
                </label>
              </Control>
            </Field>
            <Field>
              <Label>
                Does the patient have a diagnosis of chronic kidney failure?
              </Label>
              <Control>
                <label className="radio">
                  <input
                    type="radio"
                    checked={renalChronic}
                    onChange={() => setRenalChronic(true)}
                  />
                  Yes
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    checked={!renalChronic}
                    onChange={() => setRenalChronic(false)}
                  />
                  No
                </label>
              </Control>
            </Field>
          </>
        )}
        {activeTab === ActiveTab.Step6 && (
          <>
            {/* heart: hypertension, cardiovascular, obesity */}
            <Field>
              <Label>Does the patient have a diagnosis of hypertension?</Label>
              <Control>
                <label className="radio">
                  <input
                    type="radio"
                    checked={hypertension}
                    onChange={() => setHypertension(true)}
                  />
                  Yes
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    checked={!hypertension}
                    onChange={() => setHypertension(false)}
                  />
                  No
                </label>
              </Control>
            </Field>
            <Field>
              <Label>
                Does the patient have a diagnosis of cardiovascular disease?
              </Label>
              <Control>
                <label className="radio">
                  <input
                    type="radio"
                    checked={cardiovascular}
                    onChange={() => setCardiovascular(true)}
                  />
                  Yes
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    checked={!cardiovascular}
                    onChange={() => setCardiovascular(false)}
                  />
                  No
                </label>
              </Control>
            </Field>
            <Field>
              <Label>Does the patient have a diagnosis of obesity?</Label>
              <Control>
                <label className="radio">
                  <input
                    type="radio"
                    checked={obesity}
                    onChange={() => setObesity(true)}
                  />
                  Yes
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    checked={!obesity}
                    onChange={() => setObesity(false)}
                  />
                  No
                </label>
              </Control>
            </Field>
            <Field>
              <Label>Any other diseases?</Label>
              <Control>
                <label className="radio">
                  <input
                    type="radio"
                    checked={otherDisease}
                    onChange={() => setOtherDisease(true)}
                  />
                  Yes
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    checked={!otherDisease}
                    onChange={() => setOtherDisease(false)}
                  />
                  No
                </label>
              </Control>
            </Field>
          </>
        )}
        {activeTab === ActiveTab.Step7 && (
          <section className="hero">
            <div className="hero-body">
              <div className="container">
                <h1 className="title">
                  {prediction.predicted_label === 0
                    ? "Future Intubation Likely"
                    : "Future Intubation Unlikely"}
                </h1>
              </div>
            </div>
          </section>
        )}
      </Box>
      {activeTab < 6 && (
        <Button onClick={() => setActiveTab(activeTab + 1)}>Next</Button>
      )}
      {activeTab === 6 && (
        <Button onClick={() => submit()} fullwidth={true}>
          Get Likelihood of Intubation
        </Button>
      )}
    </>
  );
};

export default IntubationForm;
