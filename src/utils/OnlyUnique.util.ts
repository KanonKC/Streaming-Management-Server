export function onlyUnique(value: string | null, index: number, array: (string | null)[]) {
	return array.indexOf(value) === index;
}
