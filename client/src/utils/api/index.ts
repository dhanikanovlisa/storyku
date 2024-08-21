async function fetchApi(
    url: string,
    method: string,
    additionalHeaders: Record<string, string> = {},
    payload?: object
  ) {
    console.log("Masuk sini");
    try {
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...additionalHeaders,
      };
      
      console.log(headers);
      const options: RequestInit = {
        method,
        headers,
        body: payload ? JSON.stringify(payload) : undefined,
      };
  
      console.log(options);
  
      const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, options);
      console.log(`API Response [${method} ${url}]:`, response);
      const data = await response.json();
  
      if (!response.ok) {
        console.error(`API Error [${method} ${url}]:`, data);
        return { error: true, data };
      }
  
      return { error: false, data };
    } catch (error: unknown) {
      console.error(`Error in API request [${method} ${url}]:`, error);
      throw error;
    }
  }
  
  export async function GET(url = '', additionalHeaders: Record<string, string> = {}) {
    return fetchApi(url, 'GET', additionalHeaders);
  }
  
  export async function POST(
    url = '',
    additionalHeaders: Record<string, string> = {},
    payload: object
  ) {
    return fetchApi(url, 'POST', additionalHeaders, payload);
  }
  
  export async function PUT(
    url = '',
    additionalHeaders: Record<string, string> = {},
    payload: object
  ) {
    return fetchApi(url, 'PUT', additionalHeaders, payload);
  }
  
  export async function DELETE(url = '', additionalHeaders: Record<string, string> = {}) {
    return fetchApi(url, 'DELETE', additionalHeaders);
  }