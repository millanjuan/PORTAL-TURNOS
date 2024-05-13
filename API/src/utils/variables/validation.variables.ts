export const authParams = {
  register: [
    "email",
    "username",
    "password",
    "firstname",
    "lastname",
    "identity",
    "typeidentity",
  ],
  login: ["username", "password"],
};

export const appointmentParams = {
  appointment: ["year", "month", "professionalId"],
  date: ["date", "professionalId"],
  schuddleOrCancel: ["appointmentId"],
};

export const professionalParams = {
  create: ["firstname", "lastname", "speciality"],
  update: ["professionalId", "data"],
  delete: ["professionalId"],
};

export const specialityParams = {
  create: ["data"],
  update: ["specialityId", "data"],
  delete: ["specialityId"],
};
