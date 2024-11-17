import { prisma } from "../../../database/prisma";

export async function createHangedManGame() {
	const words = [
		"apple",
		"banana",
		"cherry",
		"date",
		"elderberry",
		"fig",
		"grape",
		"honeydew",
		"kiwi",
		"lemon",
		"mango",
		"nectarine",
		"orange",
		"papaya",
		"quince",
		"raspberry",
		"strawberry",
		"tangerine",
		"watermelon",
	];

	const word = words[Math.floor(Math.random() * words.length)];

	await prisma.hangedManGame.updateMany({
		where: {
			isResolved: false,
		},
		data: {
			isResolved: true,
		},
	});

	await prisma.hangedManGame.create({
		data: {
			word: word,
			currentWordState: word
				.split("")
				.map(() => "_")
				.join(""),
		},
	});
}
