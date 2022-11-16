export type IColumns = {
  field: string;
  text: string;
  type: {
    name: 'date' | 'enum' | 'text' | 'currency';
    format?: string;
    enum?: { [key: string]: string };
  };
  highlightRowColor?: {
    color: 'red' | 'green';
    matchValues: (string | number)[];
  }[];
}[];
