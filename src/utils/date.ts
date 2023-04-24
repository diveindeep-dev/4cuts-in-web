const today = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const monthForm = month < 10 && `0${month}`;
  const date = now.getDate();

  return `${year}. ${monthForm}. ${date}`;
};

export default today;
