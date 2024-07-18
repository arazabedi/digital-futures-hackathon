// const formatDate = (isoString: string) => {
//   const date = new Date(isoString);

//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   const day = date.getUTCDate();
//   const month = months[date.getUTCMonth()];
//   const year = date.getUTCFullYear();

//   const formattedDate = `${day < 10 ? "0" + day : day} ${month} ${year}`;

//   return formattedDate;
// };

const formatDate = (isoString: string) => {
	const date = new Date(isoString);

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

	const day = date.getUTCDate();
	const month = months[date.getUTCMonth()];
	const year = date.getUTCFullYear();
	const hours = date.getUTCHours();
	const minutes = date.getUTCMinutes();
	const seconds = date.getUTCSeconds();

	const formattedDate = `${day < 10 ? "0" + day : day} ${month} ${year} ${hours}:${minutes}:${seconds < 10 ? "0" + seconds : seconds} UTC`;

	return formattedDate;
};

export default formatDate
