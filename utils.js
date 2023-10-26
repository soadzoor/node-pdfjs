export const convertBase64ToUint8 = (base64) => {
	let base64Marker= ";base64,";
	const base64Index = base64.indexOf(base64Marker) + base64Marker.length;
	const strExpectBase64Marker = base64.substring(base64Index);
	const raw = atob(strExpectBase64Marker);
	const rawLength = raw.length;
	const array = new Uint8Array(new ArrayBuffer(rawLength));

	for (let i = 0; i<rawLength ; i++) {
		array[i] = raw.charCodeAt(i);
	}

	return array;
};