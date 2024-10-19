export type GenericResponse<T> = {
  [x: string]: any;
  statusCode: number;
  message: string;
  data: T;
  error?: {
    data: {
      message: string;
    };
  };
};
export interface IPaginationState {
  pageNumber: number;
  recordsPerPage: number;
}
export type IPagination = {
  totalPages: number;
  recordsPerPage: number;
  totalRecords: number;
  currentPage: number;
  next?: {
    currentPage: number;
    totalRecords: number;
    recordsPage: number;
    totalPages: number;
  };
};
