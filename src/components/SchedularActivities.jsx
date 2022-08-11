import * as React from "react";
import clsx from "clsx";
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
/**
 * schedule block events sample
 */
class BlockEvents extends SampleBase {
  constructor() {
    super(...arguments);
    this.data = extend([], dataSource.courseScheduleData, null, true);
    this.employeeData = [
      {
        Text: "Sunday",
        Id: 1,
        GroupId: 1,
      },
      {
        Text: "Monday",
        Id: 2,
        GroupId: 2,
      },
      {
        Text: "Cégep",
        faded: true,
        Id: 3,
        GroupId: 1,
      },
      {
        Text: "Polyvalente",
        faded: true,
        Id: 4,
        GroupId: 1,
      },
      {
        Text: "Wenesday",
        Id: 5,
        GroupId: 1,
      },
      {
        Text: "Thursday",
        Id: 6,
        GroupId: 2,
      },
      {
        Text: "Cégep",
        faded: true,
        Id: 7,
        GroupId: 1,
      },
      {
        Text: "Friday",
        Id: 8,
        GroupId: 1,
      },
      {
        Text: "Cap-Jeunesse",
        faded: true,
        Id: 9,
        GroupId: 2,
      },
    ];
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
          <div className={clsx("employee-name", { dim: props.dim })}>
            {this.getEmployeeName(props)}
          </div>
        </div>
      </div>
    );
  }

  eventTemplate(props) {
    return (
      <div className={"schedular-template-course " + props.status}>
        <div className={"course-name"}>{props.courseName}</div>
        <div className="additional">{props.additionalInfo}</div>
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
                    dataSource={this.employeeData}
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
