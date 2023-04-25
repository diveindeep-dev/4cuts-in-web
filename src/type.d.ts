interface Cuts {
  first: string;
  second: string;
  third: string;
  fourth: string;
}

interface Custom {
  title: string;
  folder: string;
  tag: { title: string };
  color: { back: string; font: string; frame: string };
}

interface Code {
  [key: string]: Custom;
}
