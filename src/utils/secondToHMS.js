const secondToHMS = (second) => {
  return new Date(second * 1000).toISOString().substr(11, 8)
};

export default secondToHMS;