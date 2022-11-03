export default {
  formatDaysLength(daysLength) {
    let daysNumber = Number(daysLength);
    const fullDays = daysLength - (daysNumber % 1);
    const hours = Math.floor(24 * (daysNumber % 1));

    if (fullDays === 0 && hours > 1) {
      return `$${hours} hours`;
    } else if (fullDays === 0 && hours === 1) {
      return `$${hours} hour`;
    }

    if (hours === 0 && fullDays > 1) {
      return `${fullDays} days`;
    } else if (hours === 0 && fullDays === 1) {
      return `${fullDays} day`;
    }

    if (fullDays > 1 && hours > 1) {
      return `${fullDays} days and ${hours} hours`;
    } else if (fullDays === 1 && hours === 1) {
      return `${fullDays} day and ${hours} hour`;
    } else if (fullDays > 1) {
      return `${fullDays} days and ${hours} hour`;
    } else {
      return `${fullDays} day and ${hours} hours`;
    }
  },
  calculateDiemBasis(daysLength) {
    let daysNumber = Number(daysLength);
    const fullDays = daysLength - (daysNumber % 1);
    daysNumber -= fullDays;
    const hours = 24 * (daysNumber % 1);
    if (hours >= 12) {
      return (fullDays + 1).toLocaleString("en-US", {
        maximumFractionDigits: 2,
      });
    } else if (hours >= 8) {
      return (fullDays + 0.5).toLocaleString("en-US", {
        maximumFractionDigits: 2,
      });
    } else {
      return (fullDays + 0.33).toLocaleString("en-US", {
        maximumFractionDigits: 2,
      });
    }
  },
};
