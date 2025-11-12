import Toast from "react-native-toast-message";

export const AppToast = (text?: string, success: boolean = false) => {
  return Toast.show({
    type: "customToast",
    text1: success ? text : "Something went wrong",
    props: { toastType: success ? "success" : "error" },
  });
};
