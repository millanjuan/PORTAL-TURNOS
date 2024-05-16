export const authParams = {
  register: [
    "email",
    "password",
    "firstname",
    "lastname",
    "identity",
    "typeidentity",
    "birthdate",
  ],
  login: ["email", "password"],
};

export const appointmentParams = {
  appointment: ["year", "month", "professionalId"],
  date: ["date", "professionalId"],
  schuddleOrCancel: ["appointmentId"],
};

export const professionalParams = {
  create: ["firstname", "lastname", "image", "speciality"],
  update: ["professionalId", "data"],
  delete: ["professionalId"],
  bySpeciality: ["id"],
};

export const specialityParams = {
  create: ["name", "image"],
  update: ["specialityId", "data"],
  delete: ["specialityId"],
};
