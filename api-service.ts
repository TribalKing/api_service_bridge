interface ApiResponse<T> {
  data: T;
}

class ApiService {
  private baseURL: string | undefined;
  private headers: Headers;

  constructor() {
    this.baseURL = 'process.env.NEXT_PUBLIC_PAXPORTAL_API_HOST';
    this.headers = new Headers();
    this.headers.append('Accept', 'application/json');

    // access token goes here, most likely process.env.ACCESS_TOKEN
    const accessToken = 'process.env.ACCESS_TOKEN';

    this.headers.append('Authorization', `Bearer ${accessToken}`);
  }

  async get<T>(url: string, companyId?: string): ApiResponse<T> {
    const headers = new Headers(this.headers);
    headers.append('company-id', companyId || '');

    const response = await fetch(`${this.baseURL}${url}`, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const responseData = await response.json();
    return responseData.data;
  }

  async post<T>(
    url: string,
    data: {
      [key: string]: unknown;
    },
    companyId?: string
  ): ApiResponse<T> {
    const headers = new Headers(this.headers);
    headers.append('Content-Type', 'application/json');
    headers.append('company-id', companyId || '');

    const response = await fetch(`${this.baseURL}${url}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const responseData = await response.json();
    return responseData.data;
  }

  async patch<T>(
    url: string,
    data: {
      [key: string]: unknown;
    },
    companyId?: string
  ): ApiResponse<T> {
    const headers = new Headers(this.headers);
    headers.append('Content-Type', 'application/json');
    headers.append('company-id', companyId || '');

    const response = await fetch(`${this.baseURL}${url}`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const responseData = await response.json();
    return responseData.data;
  }

  async upload<T>(url: string, file: File, companyId: string): ApiResponse<T> {
    const headers = new Headers(this.headers);
    headers.append('company-id', companyId);

    const fd = new FormData();
    fd.append('file', file);

    const response = await fetch(`${this.baseURL}${url}`, {
      method: 'POST',
      headers: headers,
      body: fd,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const responseData = await response.json();
    return responseData.data;
  }
}

export default ApiService;
