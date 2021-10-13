const colors = [
  "rgba(94, 92, 230, 1)",
  "rgba(255, 55, 95, 1)",
  "rgba(255, 214, 10, 1)",
  "rgba(191, 90, 242, 1)",
  "rgba(90, 200, 250, 1)",
  "rgba(255, 55, 95, 1)",
];

export const getNextColor = (index) => {
  if (index >= colors.length) {
    return colors[index % 6];
  } else {
    return colors[index];
  }
};

export const getUserColor = (employeeList, currentEmployeeId) => {
  let userColor = "rgba(0, 0, 0, 1)";

  employeeList.map((employee) => {
    if (employee.employeeId === currentEmployeeId) {
      userColor = employee.color;
    }
  });

  return userColor;
};
