const exportedFunctions = {

getDatesInRange(startDate, endDate) {
   
    
    const dates = [];
  
    while (startDate < endDate) {
      let s = startDate.getDate().toString().length==1?'0':'';
      let x = startDate.getMonth().toString().length==1?'0':'';
      dates.push(`${startDate.getFullYear()}-${x}${startDate.getMonth()+1}-${s}${startDate.getDate()}`);
      startDate.setDate(startDate.getDate() + 1);
    }
  
    return dates;
  }

}

export default exportedFunctions;
