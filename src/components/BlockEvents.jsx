import { render } from 'react-dom';
import * as React from 'react';
import { ScheduleComponent, ResourcesDirective, ResourceDirective, ViewsDirective, ViewDirective, Inject, TimelineViews, Resize, DragAndDrop, TimelineMonth, Day } from '@syncfusion/ej2-react-schedule';

import { SampleBase } from '../common/sample-base';
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import { BASEURL, sendNetworkRequest } from "../http/http-request";
import ModalAppointment from '../modals/ModalAppointment';
import axios from 'axios';
import moment from 'moment';
const tokens = JSON.parse(localStorage.getItem('tokens'));

/**
 * schedule block events sample
 */
export default class BlockEvents extends SampleBase {
    constructor() {
        super(...arguments);
        // this.data = extend([], dataSource.blockData, null, true);
        this.state = {
            employeeData: [],
            Colors: ['#F7F4F4','#F3F7F9', '#F0F1F7'],
            Status:['#ECA0A0', '#4ACBD3', '#1E55A9',],
            data: [],
            appointmentModalOpenState : false,
            Id: "",
            employeeList: [], 
            clientList : [],
            humanList : [],
            datalist : [],
    }

    }
    
    async getEmployeeData() {
        sendNetworkRequest(`${BASEURL}/core/employees`)
            .then((responseEmp) => {
            sendNetworkRequest(`${BASEURL}/invoice/date/${moment(this.props.Date).format('MM-DD-YYYY')}/service/owner`).then(
                (response) => {
                console.log("invoice data", response.data);
                let listdata = [];
                response.data.invoices.map((e, index) => {
                    // console.log(index + " " + "HELLLoo");
                    let value = {
                        "Id": e.id,
                        "Subject": e?.metadata?.name,
                        "StartTime": e?.metadata?.sdate, 
                        "EndTime": e?.metadata?.edate,
                        "Profile_name": e?.metadata?.profile_name,
                        "Client_name": e?.metadata?.client_name,
                        "IsAllDay": false,
                        "IsBlock": false,
                        "EmployeeId": e?.metadata?.assign,
                        "Note" : e?.metadata?.note,
                        "index" : index,
                    }
                    listdata.push(value);
                });
                // console.log(listdata);
                this.setState({data: listdata});
                }
            );
            console.log(responseEmp);
            let Data = [];
            responseEmp.data.map((e, index) => {
                // console.log(e);
            let value = {
                Text: e.human_identity_id.first_name,
                Id: e.human_identity_id.id,
                Color: this.state.Colors[index % 3],
                Designation: "",
            };
            // console.log(value);
                Data.push(value);
            }
            );

             this.setState({ employeeData: Data });
            })
            .catch((err) => {
            console.log(err);
            });
        }

        async componentWillReceiveProps() {
            try {
            await this.getEmployeeData();
            } catch (err) {
            console.log(err.message);
            }
        }
   async onDragStop(args) {
        await axios( {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${tokens.accessToken}`,
              refresh_token: tokens.refreshToken,
              idToken: tokens.idToken,
            },
            data: { metadata : { sdate: new Date(args.data.StartTime).toISOString(), edate: new Date(args.data.EndTime).toISOString(), assign : args.data.EmployeeId,}},
            url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/invoice/${args.data.Id}`,
          }).then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          })
    }
   async onPopupOpen(args){
        // console.log(args);
        args.cancel = true;
        console.log(args);
        if(args?.data?.Id){
        this.setState({Id : args.data.Id});
        this.setState({appointmentModalOpenState : true})
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
        return (<div className="template-wrap">
            <div className="employee-category">
                <div className={"employee-image " + this.getEmployeeImage(props)}>
                    <img
                    className="user-img"
                    src={"./assets/img/table-user-2.png"}
                    alt="add"
                    />
                </div>
                  <div className="employee-name">
                       {this.getEmployeeName(props)}</div>
            <div className="employee-designation">{this.getEmployeeDesignation(props)}</div>
        </div>
    </div>);
    }


    eventTemplate(props) {
        return (
            <div className={"schedular-template-event "}>
            <div className={"subject"}>{props.Subject}</div>
            <div className="client-name">{props.Profile_name}</div>
            <div className="progress mt-1 ">
            <div className="progress-bar mt-3" style={{ width: props.progress, backgroundColor: this.state.Status[props.index % 3], }}></div>
            </div>
        </div>
        );
      }
    
    render() {
        return (<><div className='schedule-control-section'>
                <div className='col-lg-12 control-section'>
                    <div className='control-wrapper drag-sample-wrapper'>
                        <div className="schedule-container">
                            <ScheduleComponent 
                            cssClass='block-events' 
                            width='100%' height='auto' 
                            selectedDate={new Date(moment(this.props.Date).format('YYYY'), moment(this.props.Date).format('MM') - 1, moment(this.props.Date).format('DD'))} 
                            currentView='TimelineDay' 
                            resourceHeaderTemplate={this.resourceHeaderTemplate.bind(this)}
                            eventSettings={{ dataSource: this.state.data , template: this.eventTemplate.bind(this),}}
                            group={{ enableCompactView: false, resources: ['Employee'] }}
                            dragStop={(this.onDragStop.bind(this))}
                            popupOpen={this.onPopupOpen.bind(this)}
                            >
                                <ResourcesDirective>
                                    <ResourceDirective 
                                    field='EmployeeId' 
                                    title='Employees' 
                                    name='Employee' 
                                    allowMultiple={true} 
                                    dataSource={this.state.employeeData}
                                    textField='Text' 
                                    idField='Id' 
                                    colorField='Color'
                                    >
                                    </ResourceDirective>
                                </ResourcesDirective>
                                <ViewsDirective>
                                    <ViewDirective option='Day'/>
                                    <ViewDirective option='TimelineDay'/>
                                    <ViewDirective option='TimelineMonth'/>
                                </ViewsDirective>
                                <Inject services={[Day, TimelineViews, TimelineMonth, Resize, DragAndDrop]}/>
                            </ScheduleComponent>
                        </div>
                    </div>
                </div>
            </div>
            <ModalAppointment
            isOpen={this.state.appointmentModalOpenState}
            employeeList={this.state.employeeList}
            clientList = {this.state.clientList}
            humanList={this.state.humanList}
            datalist={this.state.datalist}
            Id={this.state.Id}
            modalCloseHandler={() =>
                this.setState({appointmentModalOpenState: false })
            }
           />
           </>
            );
    }
}