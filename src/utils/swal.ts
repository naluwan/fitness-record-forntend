import Swal from 'sweetalert2';

// sweet alert pop
export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
});

// sweet alert confirm pop
export const Confirm = async (title: string, text: string) => {
  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: '取消',
    confirmButtonText: '確認',
  });
  return result;
};
