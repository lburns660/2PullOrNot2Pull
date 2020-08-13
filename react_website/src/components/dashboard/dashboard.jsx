import React from "react";

const Dashboard = () => {
  return (
    <>
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <div class="title">Example Dashboard</div>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <button type="button" class="button is-small">
              Monday July 10th to Sunday July 17th 2020
            </button>
          </div>
        </div>
      </div>
      <div className="columns is-multiline">
        <div className="column">
          <div className="box">
            <div className="heading">% Patients Expected Intubated (week)</div>
            <div class="title">3%</div>
            <div className="heading">
              No. Patients Expected Intubated (week)
            </div>
            <div class="title">2</div>
          </div>
        </div>
        <div className="column">
          <div className="box">
            <div className="heading">% Patients ICU Covid-19</div>
            <div class="title">7%</div>
            <div className="heading">% Patients ICU Covid-19</div>
            <div class="title">6</div>
          </div>
        </div>
        <div className="column">
          <div className="box">
            <div className="heading">No. Inpatients (Week)</div>
            <div class="title">48</div>
            <div className="heading">No. Outpatients (Week)</div>
            <div class="title">176</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
