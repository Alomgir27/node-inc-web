import * as React from "react";
import {
  ScheduleComponent,
  ResourcesDirective,
  ResourceDirective,
  ViewsDirective,
  ViewDirective,
  Inject,
  TimelineViews,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
import "../data/block-events.css";
import { extend } from "@syncfusion/ej2-base";
import { SampleBase } from "../common/sample-base.js";
import dataSource from "../data/datasource";
import { BASEURL, sendNetworkRequest } from "../http/http-request";
/**
 * schedule block events sample
 */
class BlockEvents extends SampleBase {
  constructor() {
    super(...arguments);
    this.data = extend([], dataSource.blockData, null, true);
    this.state = {
      // Get value from localStorage or use default
      employeeList: [],
    };

    // this.employeeData = [
    //   {
    //     Text: "Stephan R.",
    //     Id: 1,
    //     GroupId: 1,
    //   },
    //   {
    //     Text: "Lydia C.",
    //     Id: 2,
    //     GroupId: 2,
    //   },
    //   {
    //     Text: "Damien L.",
    //     Id: 3,
    //     GroupId: 1,
    //   },
    //   {
    //     Text: "Samuel C.",
    //     Id: 4,
    //     GroupId: 2,
    //   },
    //   {
    //     Text: "Kevin L.",
    //     Id: 5,
    //     GroupId: 1,
    //   },
    //   {
    //     Text: "Jade R.",
    //     Id: 6,
    //     GroupId: 2,
    //   },
    // ];
  }

  async getEmployeeData() {
    sendNetworkRequest(`${BASEURL}/core/employees`)
      .then((responseEmp) => {
        sendNetworkRequest(`${BASEURL}/invoice/service/owner/0`).then(
          (response) => {
            console.log("invoice data", response.data);
          }
        );
        let employeeData = [];
        responseEmp.data.map((e) => {
          const ef = {
            Text: e.human_identity_id.last_name,
            Id: 2,
            GroupId: 2,
          };
          employeeData.push(ef);
        });
        this.setState({ employeeList: employeeData });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async componentDidMount() {
    try {
      await this.getEmployeeData();
    } catch (err) {
      console.log(err.message);
    }
  }

  getEmployeeName(value) {
    return value.resourceData[value.resource.textField];
  }
  getEmployeeImage(value) {
    return this.getEmployeeName(value).toLowerCase();
  }
  getEmployeeDesignation(value) {
    return value.resourceData.Designation;
  }
  resourceHeaderTemplate(props) {
    return (
      <div className="template-wrap">
        <div className="employee-category">
          <div
            className={"employee-image " + this.getEmployeeImage(props)}
          ></div>
          <div className="employee-name">{this.getEmployeeName(props)}</div>
          <div className="employee-designation">
            {this.getEmployeeDesignation(props)}
          </div>
        </div>
      </div>
    );
  }

  eventTemplate(props) {
    return (
      <div className={"schedular-template-event " + props.status}>
        {props.withIcon && (
          <svg
            className="tick"
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.2466 7.46653C12.046 6.97341 12.046 6.42666 12.2466 5.94714L12.3134 5.78728C12.7413 4.77396 12.2466 3.60138 11.2299 3.17427L11.0826 3.10762C10.5878 2.90767 10.1997 2.5213 9.99906 2.02765L9.94577 1.89435C9.50484 0.881555 8.3414 0.401491 7.31172 0.814904L7.17797 0.868017C6.68323 1.06797 6.13468 1.06797 5.63994 0.868017L5.51978 0.814904C4.51671 0.401451 3.33965 0.894574 2.9118 1.90788L2.85852 2.01463C2.6579 2.50774 2.27026 2.89464 1.77499 3.0946L1.65483 3.14771C0.651243 3.57417 0.156517 4.74735 0.584372 5.76018L0.63766 5.87995C0.838273 6.37306 0.838273 6.91982 0.63766 7.39934L0.584372 7.54618C0.156503 8.5595 0.638181 9.73262 1.6679 10.1461L1.80164 10.1992C2.29638 10.3992 2.68455 10.7856 2.88517 11.2792L2.95204 11.4261C3.36633 12.4519 4.5433 12.932 5.55948 12.5185L5.70681 12.4519C6.20155 12.2519 6.7501 12.2519 7.24484 12.4519L7.365 12.505C8.38166 12.9314 9.55811 12.4383 9.98662 11.425L10.0399 11.3183C10.2405 10.8251 10.6282 10.4382 11.1234 10.2383L11.2305 10.1982C12.2602 9.77173 12.742 8.61216 12.3141 7.58519L12.2466 7.46653ZM5.88071 9.26612L3.27273 7.08021L4.07519 6.13355L5.73332 7.53323L8.66201 4.06735L9.61179 4.86717L5.88071 9.26612Z"
              fill="#C26666"
            />
          </svg>
        )}
        <div className={"subject"}>{props.Subject}</div>
        <div className="client-name">{props.ClientName}</div>

        <div className="progress">
          <div className="progress-bar" style={{ width: props.progress }}></div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="schedule-control-section">
        <div className="col-lg-12 control-section">
          <div className="control-wrapper drag-sample-wrapper">
            <div className="schedule-container">
              <ScheduleComponent
                cssClass="block-events"
                width="100%"
                height="415px"
                // height="650px"
                selectedDate={new Date(2021, 7, 2)}
                currentView="TimelineDay"
                resourceHeaderTemplate={this.resourceHeaderTemplate.bind(this)}
                eventSettings={{
                  dataSource: this.data,
                  template: this.eventTemplate.bind(this),
                }}
                group={{ enableCompactView: false, resources: ["Employee"] }}
              >
                <ResourcesDirective>
                  <ResourceDirective
                    field="EmployeeId"
                    title="Employees"
                    name="Employee"
                    allowMultiple={true}
                    // dataSource={this.employeeData}
                    dataSource={this.state.employeeList}
                    textField="Text"
                    idField="Id"
                  ></ResourceDirective>
                </ResourcesDirective>
                <ViewsDirective>
                  <ViewDirective
                    option="TimelineDay"
                    // startHour="11:00"
                    // endHour="18:00"
                  />
                </ViewsDirective>
                <Inject services={[TimelineViews, Resize, DragAndDrop]} />
              </ScheduleComponent>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BlockEvents;
