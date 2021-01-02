import { TYPE_ALERT } from './values.config';
import Swal from 'sweetalert2';

export function basicAlert(icon = TYPE_ALERT.SUCCESS, title: string = ''){
    Swal.fire({
        title,
        icon,
        confirmButtonText: 'X',
        toast: true,
        position: "bottom-end"
      })
}