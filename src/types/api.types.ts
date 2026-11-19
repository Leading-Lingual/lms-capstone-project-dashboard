export interface ApiMeta { requestId: string }
export interface ApiResponse<T> { data: T; meta: ApiMeta }
export interface ApiErrorBody {
  error: { code: string; message: string; fields?: Array<{ path: string; message: string }> };
  meta: ApiMeta;
}
export interface PaginationParams { page?: number; limit?: number }
export interface PaginatedData<T> { items: T[]; page: number; limit: number }
