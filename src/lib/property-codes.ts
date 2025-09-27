
export function generatePropertyCode(sqft: number, type: 'Residential' | 'Commercial', id: number): string {
    // Generate exactly 8-digit property codes as per criteria
    const idPart = String(id).padStart(5, '0'); // Always 5 digits for ID
    
    if (type === 'Residential') {
        if (sqft < 1000) {
            return `RPL${idPart}`; // RPL00001 - RPL90000 (8 digits)
        } else if (sqft >= 1000 && sqft < 1500) {
            return `RPXL${String(id).padStart(4, '0')}`; // RPXL0001 - RPXL9000 (8 digits)
        } else if (sqft >= 1500 && sqft < 2000) {
            return `RPXXL${String(id).padStart(3, '0')}`; // RPXXL001 - RPXXL900 (8 digits)
        } else if (sqft >= 2000 && sqft < 3000) {
            return `RPXXLL${String(id).padStart(2, '0')}`; // RPXXLL01 - RPXXLL99 (8 digits)
        } else {
            // Above 3000 sq.ft residential goes to commercial range
            return `CPL${idPart}`; // CPL00001 (8 digits)
        }
    } else if (type === 'Commercial') {
        if (sqft >= 3000 && sqft < 3500) {
            return `CPL${idPart}`; // CPL00001 - CPL90000 (8 digits)
        } else if (sqft >= 3500 && sqft < 4000) {
            return `CPXL${String(id).padStart(4, '0')}`; // CPXL0001 - CPXL9000 (8 digits)
        } else if (sqft >= 4000 && sqft < 5000) {
            return `CPXXL${String(id).padStart(3, '0')}`; // CPXXL001 - CPXXL900 (8 digits)
        } else {
            // Above 5000 sq.ft
            return `CPXXLL${String(id).padStart(2, '0')}`; // CPXXLL01 - CPXXLL99 (8 digits)
        }
    }
    
    // Fallback to residential small plot
    return `RPL${idPart}`;
}
