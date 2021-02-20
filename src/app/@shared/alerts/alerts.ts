import Swal from 'sweetalert2';
export async function formBasicDialog(title: string, html: string, property: string){

    return await Swal.fire({
        title,
        html,
        focusConfirm: false,
        cancelButtonText: "Cancelar",
        showCancelButton: true,
        preConfirm: () => {
            const value = ((document.getElementById('name')) as HTMLInputElement).value
            if(value){
                return value;
            }
            Swal.showValidationMessage("Debes añadir un género");
            return;
        }
      });
}

export async function basicDetails(title: string, html: string, width: number) {
    Swal.fire({
        title,
        text: html,
        width: `${width}px`
    })
}