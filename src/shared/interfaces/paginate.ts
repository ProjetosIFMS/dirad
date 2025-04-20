import { Process } from '@prisma/client';

export interface ProcessPaginationResult {
  data: Process[];
  total: number;
  page: number;
  perPage: number;
}
