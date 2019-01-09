export class Todo
{
  id?: number;
  name: string;
  description?: string;
  image?: string;
  complete? = false;
  constructor(values: { [p in keyof Todo] } = { name: '' }) { Object.assign(this, values); }
}
