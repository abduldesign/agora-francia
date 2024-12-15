interface QueryParams {
  [key: string]: string | number | undefined;
}

export function generateQueryParams(params: QueryParams): string {
  // Check if params is empty
  if (Object.keys(params).length === 0) {
      return "";
  }

  // Construct the query string
  const queryString = Object.entries(params)
      .filter(([_, value]) => value !== undefined) // Exclude undefined values
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
      .join('&');

  // Combine with the base URL
  const fullUrl = `?${queryString}`;

  return fullUrl;
}

