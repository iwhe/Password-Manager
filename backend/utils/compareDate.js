const isDateExpired = (storedDate) => {
  const today = new Date(); // Current date
  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(today.getDate() - 10); // Subtract 10 days

  if (storedDate <= tenDaysAgo) {
    return true; //return true if date is before 10 days
  } else {
    return false;
  }
};

export default isDateExpired;
