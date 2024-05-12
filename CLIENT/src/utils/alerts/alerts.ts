import Swal from "sweetalert2";

export const signUpErrorAlert = (message: string) => {
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
