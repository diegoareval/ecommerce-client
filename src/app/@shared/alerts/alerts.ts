import Swal from 'sweetalert2';
export async function formBasicDialog(
  title: string,
  html: string,
  property: string
) {
  return await Swal.fire({
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
    text: html,
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
