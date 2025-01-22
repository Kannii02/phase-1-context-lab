function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }

  function createEmployeeRecords(employeeDataArray) {
    return employeeDataArray.map(createEmployeeRecord);
  }

  function createTimeInEvent(dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    this.timeInEvents.push({ type: "TimeIn", hour: parseInt(hour), date });
    return this;
  }

  function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    this.timeOutEvents.push({ type: "TimeOut", hour: parseInt(hour), date });
    return this;
  }

  function hoursWorkedOnDate(date) {
    let timeIn = this.timeInEvents.find(event => event.date === date);
    let timeOut = this.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }

  function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
  }

  const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(e => e.date);
    const payable = eligibleDates.reduce((memo, d) => {
        return memo + wagesEarnedOnDate.call(this, d);
    }, 0); 
    return payable;
};

  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
  }

  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employee) => {
      return total + allWagesFor.call(employee);
    }, 0);
  }

  module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    findEmployeeByFirstName,
    calculatePayroll
  };

  if (require.main === module) {
    let employees = createEmployeeRecords([
      ["John", "Doe", "Engineer", 25],
      ["Jane", "Smith", "Manager", 40]
    ]);
  
    console.log("Adding Time In Event:", createTimeInEvent.call(employees[0], "2024-01-20 0800"));
    console.log("Adding Time Out Event:", createTimeOutEvent.call(employees[0], "2024-01-20 1700"));
    console.log("Hours Worked:", hoursWorkedOnDate.call(employees[0], "2024-01-20"));
    console.log("Wages Earned:", wagesEarnedOnDate.call(employees[0], "2024-01-20"));
    console.log("All Wages:", allWagesFor.call(employees[0]));
    console.log("Total Payroll:", calculatePayroll(employees));
  }

