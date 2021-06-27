const useUtil = () => {
  /**
   * Trim number showing only 2 decimals
   * @param {*} number
   * @returns
   */
  const trimTwoDecimals = (number) => {
    return number.toFixed(2);
  };

  /**
   * Format numbers to USD currency
   * @param {*} currency 
   * @returns number is USD currency
   */
  const currencyDollarFormatter = (currency) => {
    if(!currency) return 0;
    return `$${currency.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  }


  /**
   * Substract current date minus 7 days
   * @returns date in unix timestamp format
   */
  const getWeekAgoUnixTimestamp = () => {
    let d = new Date();
    d.setDate(d.getDate() - 7);
    return d.getTime()/1000|0;
  }


  return {
    trimTwoDecimals,
    currencyDollarFormatter,
    getWeekAgoUnixTimestamp
  };
};

export default useUtil;
