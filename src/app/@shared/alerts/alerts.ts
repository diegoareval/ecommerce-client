import { EMAIL_PATTERN } from '@admin/core/constants/regex';
import Swal from 'sweetalert2';

const swalBasicOptions = (title: string, html: string) => 
  Swal.mixin({
    title,
    html,
    focusConfirm: false,
    cancelButtonText: 'Cancelar',
    showCancelButton: true,
  })

  export async function userFormBasicDialog(title: string, html: string){
    return await swalBasicOptions(title, html).fire({
      title,
      html,
      focusConfirm: false,
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      preConfirm: () => {
        let error = ''
        const name = (document.getElementById('name') as HTMLInputElement).value;
        if (!name) {
          error += 'El Nombre es obligatorio </br>'
        }

        const lastname = (document.getElementById('lastname') as HTMLInputElement).value;
        if (!lastname) {
          error += 'El Apellido es obligatorio </br>'
        }

        const email = (document.getElementById('email') as HTMLInputElement).value;
        if (!email) {
          error += 'El Email es obligatorio </br>'
        }

        if(!EMAIL_PATTERN.test(email)){
          error += 'No tiene formato de correo electronico </br>'
        }

        const role = (document.getElementById('role') as HTMLInputElement).value;


        if(error!==''){
          Swal.showValidationMessage(error);
        return;
        }
        return{
          name,
          lastname,
          email,
          role,
          birthdate: new Date().toISOString()
        }
      },
    });
  }

export async function formBasicDialog(
  title: string,
  html: string,
  property: string
) {
  return await swalBasicOptions(title, html).fire({
    title,
    html,
    focusConfirm: false,
    cancelButtonText: 'Cancelar',
    showCancelButton: true,
    preConfirm: () => {
      const value = (document.getElementById('name') as HTMLInputElement).value;
      if (value) {
        return value;
      }
      Swal.showValidationMessage('Debes añadir un género');
      return;
    },
  });
}

export async function optionsWithDetails(title: string, html: string, width: number, confirmButtonText: string = '<i class="fas fa-edit"></i> Editar', cancelButtonText: string='<i class="fas fa-lock"></i> Bloquear') {
  return await Swal.fire({
    title,
    html,
    width: `${width}px`,
    showCancelButton: true,
    confirmButtonColor: '#6C757D',
    cancelButtonColor: '#DC3545',
    showCloseButton: true,
    confirmButtonText,
    cancelButtonText,
  }).then((result) => {
      console.log(result);
    if (result.value) {
        return true;
    }else if(result.dismiss.toString() ==='cancel'){
        return false;
    }
  });
}
