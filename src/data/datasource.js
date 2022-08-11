const list = JSON.parse(localStorage.getItem('elements'));
var listMetadata = [];
if(list){
  for (let i of list){
    // console.log(i);
    const data = {
      "Id" : i.id,
      
    }
    listMetadata.push(i.metadata);
  }
}
const dataSource = {
  blockData: [
    {
      "Id": 1,
      "Subject": "Not Available",
      "StartTime": "2021-08-02T04:30:00.000Z",
      "EndTime": "2021-08-02T06:30:00.000Z",
      "IsAllDay": false,
      "IsBlock": true,
      "EmployeeId": 1
    },
    {
      "Id": 2,
      "Subject": "Not Available",
      "StartTime": "2021-08-02T10:30:00.000Z",
      "EndTime": "2021-08-02T14:30:00.000Z",
      "IsAllDay": false,
      "IsBlock": true,
      "EmployeeId": 2
    },
    {
      "Id": 3,
      "Subject": "Not Available",
      "StartTime": "2021-08-02T06:30:00.000Z",
      "EndTime": "2021-08-02T08:30:00.000Z",
      "IsAllDay": false,
      "IsBlock": true,
      "EmployeeId": 3
    },
    {
      "Id": 4,
      "Subject": "Not Available",
      "StartTime": "2021-08-05T05:30:00.000Z",
      "EndTime": "2021-08-06T04:30:00.000Z",
      "IsAllDay": true,
      "IsBlock": true,
      "EmployeeId": 4
    },
    {
      "Id": 5,
      "Subject": "Not Available",
      "StartTime": "2021-08-11T05:30:00.000Z",
      "EndTime": "2021-08-13T04:30:00.000Z",
      "IsAllDay": false,
      "IsBlock": true,
      "EmployeeId": 5
    },
    {
      "Id": 6,
      "Subject": "Not Available",
      "StartTime": "2021-08-08T18:30:00.000Z",
      "EndTime": "2021-08-11T18:30:00.000Z",
      "IsAllDay": false,
      "IsBlock": true,
      "EmployeeId": 6
    },
    {
      "Id": 9,
      "Subject": "Client Meeting",
      "StartTime": "2021-08-04T02:30:00.000Z",
      "EndTime": "2021-08-05T05:00:00.000Z",
      "IsAllDay": false,
      "EmployeeId": 3
    },
    {
      "Id": 10,
      "Subject": "Conference",
      "StartTime": "2021-08-03T08:00:00.000Z",
      "EndTime": "2021-08-03T09:30:00.000Z",
      "IsAllDay": false,
      "EmployeeId": 4
    },
    {
      "Id": 11,
      "Subject": "Employee Recruitment",
      "StartTime": "2021-08-02T04:30:00.000Z",
      "EndTime": "2021-08-02T07:30:00.000Z",
      "IsAllDay": false,
      "EmployeeId": 5
    },
    {
      "Id": 12,
      "Subject": "Data Analyzing",
      "StartTime": "2021-08-02T09:30:00.000Z",
      "EndTime": "2021-08-02T11:30:00.000Z",
      "IsAllDay": false,
      "EmployeeId": 6
    },
    {
      "Id": 13,
      "Subject": "Content Writting",
      "StartTime": "2021-08-03T08:30:00.000Z",
      "EndTime": "2021-08-03T10:30:00.000Z",
      "IsAllDay": false,
      "EmployeeId": 1
    },
    {
      "Id": 14,
      "Subject": "Meeting",
      "StartTime": "2021-08-02T03:30:00.000Z",
      "EndTime": "2021-08-02T05:30:00.000Z",
      "IsAllDay": false,
      "EmployeeId": 4
    },
    {
      "Id": 15,
      "Subject": "Not Available",
      "StartTime": "2021-08-30T05:30:00.000Z",
      "EndTime": "2021-09-01T04:30:00.000Z",
      "IsAllDay": false,
      "IsBlock": true,
      "EmployeeId": 4
    },
    {
      "Id": 16,
      "Subject": "Not Available",
      "StartTime": "2021-08-12T18:30:00.000Z",
      "EndTime": "2021-08-15T18:30:00.000Z",
      "IsAllDay": false,
      "IsBlock": true,
      "EmployeeId": 3
    }
  ]
};

export default dataSource;
