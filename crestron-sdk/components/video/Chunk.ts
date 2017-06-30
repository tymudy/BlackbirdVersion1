export class Chunk {
  id: number;
  data: any;
  streamed: boolean;

  constructor(data: any, id?: number) {
    this.id = id;
    this.data = data;
    this.streamed = false;
  }
}
