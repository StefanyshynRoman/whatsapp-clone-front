import {HttpErrorResponse} from '@angular/common/http'; // Import HttpErrorResponse

export type StatusNotification = 'OK' | 'ERROR' | 'INIT';

export class State<T, V = HttpErrorResponse> {
  value?: T;
  error?: V | HttpErrorResponse; // Allow error to be V or HttpErrorResponse
  status: StatusNotification;

  constructor(status: StatusNotification, value?: T, error?: V | HttpErrorResponse) {
    this.value = value;
    this.error = error;
    this.status = status;
  }

  static Builder<T = any, V = HttpErrorResponse>() {
    return new StateBuilder<T, V>();
  }
}

class StateBuilder<T, V = HttpErrorResponse> {
  private status: StatusNotification = 'INIT';
  private value?: T;
  private error?: V | HttpErrorResponse; // Allow error to be V or HttpErrorResponse

  public forSuccess(value: T): State<T, V> {
    this.value = value;
    return new State<T, V>('OK', this.value, this.error);
  }

  public forSuccessEmpty(): State<T, V> {
    return new State<T, V>('OK', this.value, this.error);
  }

  public forError(error: V | HttpErrorResponse = new HttpErrorResponse({ error: 'Unknown Error' }), value?: T): State<T, V> {
    this.value = value;
    this.error = error;
    return new State<T, V>('ERROR', this.value, this.error);
  }

  public forInit(): State<T, V> {
    return new State<T, V>('INIT', this.value, this.error);
  }
}import {HttpParams} from "@angular/common/http";

export interface Pagination {
  page: number;
  size: number;
  sort: string[];
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Page<T> {
  content: T[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  sort: Sort;
  number: number;
  size: number;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}


export const createPaginationOption = (req: Pagination): HttpParams => {
  let params = new HttpParams();
  params = params.append("page", req.page).append("size", req.size);

  req.sort.forEach(value => {
    params = params.append("sort", value);
  });

  return params;
};
