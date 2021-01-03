import { TYPE_ALERT } from './values.config';
import Swal from 'sweetalert2';

export function basicAlert(icon = TYPE_ALERT.SUCCESS, title: string = '', timer = 3000){
    Swal.fire({
        title,
        icon,
        timer,
        timerProgressBar: true,
        showConfirmButton: false,
        toast: true,
        position: "bottom-end",
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      })
}