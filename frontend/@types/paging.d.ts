declare global {
  interface Paging {
    total_page?: number;
    count?: number;
    limit?: number;
    current_page?: number;
  }
}
export {};
