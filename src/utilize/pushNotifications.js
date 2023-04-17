import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

export const pushNotification = (message , type , title , placment) => {
  Store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: 'top',
    container: placment,
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 10000,
      onScreen: true,
    },
  });
  // Store.addNotification({
  //   title: title,
  //   message: message,
  //   type: type,
  //   insert: 'top',
  //   container: placment,
  //   animationIn: ["animate__animated", "animate__fadeIn"],
  //   animationOut: ["animate__animated", "animate__fadeOut"],
  //   dismiss: {
  //     duration: 10000,
  //     onScreen: true,
  //   },
  // });
};
