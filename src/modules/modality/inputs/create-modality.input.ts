export type CreateModalityInput = {
  id?: string;
  name: string;
  process: { connect: { id: string } };
};
