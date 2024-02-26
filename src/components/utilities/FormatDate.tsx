export default function formatDate(dateString: string) {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const dateParts = dateString.split("-");
    const year = parseInt(dateParts[0]);
    const monthIndex = parseInt(dateParts[1]) - 1;
    const day = parseInt(dateParts[2]);

    const formattedDate = `${day} ${months[monthIndex]} ${year}`;
    return formattedDate;
}
