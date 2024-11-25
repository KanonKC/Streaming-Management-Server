export function rankingToText(ranking: number) {
	if (ranking === 1) {
		return "🥇";
	} else if (ranking === 2) {
		return "🥈";
	} else if (ranking === 3) {
		return "🥉";
	} else {
		return `${ranking}th`;
	}
}