import { CustomerType } from '@/app/types/Customer';

export const auth = () => {
  return new Promise<CustomerType | { message: string }>(async (resolve, reject) => {

    const apiUrl = `http://localhost:8080`
    const token = window.localStorage.getItem('token')

    const response = await fetch(`${apiUrl}/api/customers/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const res = await response.json();

    if (response.ok) {
      resolve(res);
    } else {
      reject(res);
    }
  });
}