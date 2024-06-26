import Swal from "sweetalert2";

export const errorAlert = (message: string) => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
    confirmButtonText: "OK",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.close();
    }
  });
};

export const successAlert = (message: string) => {
  Swal.fire({
    icon: "success",
    title: "Success!",
    text: message,
    confirmButtonText: "OK",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.close();
    }
  });
};

export const tryAgainAlert = () => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: "Error processing request, please try again.",
    confirmButtonText: "OK",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.close();
    }
  });
};

export const updateSwal = () => {
  Swal.fire({
    title: "Success!",
    text: "Data successfuly updated.",
    icon: "success",
    showCancelButton: false,
    confirmButtonText: "Ok",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.reload();
    }
  });
};
