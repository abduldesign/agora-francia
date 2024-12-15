import { toast } from 'react-toastify';

export const handleApiSuccess = (data: any): void => {
  
  if(typeof data === 'object' &&  Object.keys(data).length > 0){
    const { message } = data;
    // Display a toast with the success message
    toast.success(message);
  }else{
    toast.success(data);
  }

};
