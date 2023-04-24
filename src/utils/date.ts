const today = (type?: string) => {
  const now = new Date();
  const year = now.getFullYear();
  const year2 = year - 2000;
  const month = now.getMonth() + 1;
  const monthForm = month < 10 ? `0${month}` : `${month}`;
  const date = now.getDate();
  const dateForm = date < 10 ? `0${date}` : `${date}`;

  if (type === 'file') {
    return `${year2}${monthForm}${dateForm}`;
  }

  return `${year}. ${monthForm}. ${dateForm}`;
};

export default today;
