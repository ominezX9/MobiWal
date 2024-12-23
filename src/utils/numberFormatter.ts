const NumberFormatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export const formatNumber = (val: number) => { 
    return NumberFormatter.format(val)
}