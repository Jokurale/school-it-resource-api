const password = "P@ssw0rd";

module.exports = {
  // Edit default users added during each migration reset
  defaultUsers: [
    {
      firstname: "Root",
      lastname: "Root",
      email: "root@school.it",
      login: "root",
      password,
      role: "administrator",
      dateOfBirth: "2021-12-12",
    },
    {
      firstname: "Administrator Name",
      lastname: "Administrator Surname",
      email: "admin@school.it",
      login: "admin",
      password,
      role: "administrator",
      dateOfBirth: "2021-12-12",
    },
    {
      firstname: "Headmaster Name",
      lastname: "Headmaster Surname",
      email: "headmaster@school.it",
      login: "headmaster",
      password,
      role: "headmaster",
      dateOfBirth: "2021-12-12",
    },
  ],
};
