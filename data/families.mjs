import Airtable from '../utils/airtable.js';
import * as fs from 'fs';
import { WritableStream } from 'node:stream/web';
import dotenv from 'dotenv';
import { mimeType } from '../utils/files.js';
dotenv.config();

const airtable = new Airtable(
	process.env.VITE_AIRTABLE_TOKEN,
	process.env.VITE_AIRTABLE_SPACE
);

const downloadFile = async (link, filename = 'download') => {
	const response = await fetch(link);
	const body = await response.body;
	const download_write_stream = fs.createWriteStream(
		`./public/img/${filename}`
	);
	const stream = new WritableStream({
		write(chunk) {
			download_write_stream.write(chunk);
		},
	});
	await body.pipeTo(stream);
};

const getFamilies = async () => {
	const allTables = Promise.all([
		airtable.get('people'),
		airtable.get('families'),
	]);
	const tables = await allTables;

	const people = tables[0];
	const families = tables[1];

	const mapPeople = (family) => {
		const leaderIds = [...family.fields.leaders];

		// Download the family image, because Airtable times-out their image URLs
		if (family.fields.photo) {
			const url = family.fields.photo[0].thumbnails.large.url;
			const fileType = mimeType[family.fields.photo[0].type];
			family.fields.photo[0].local = `${family.id}.${fileType}`;
			downloadFile(url, `${family.id}.${fileType}`);
		}

		// Map people into the family leaders
		family.fields.leaders = family.fields.leaders.map((id) =>
			people.find((p) => p.id == id)
		);

		// Map people into the family members
		family.fields.members = family.fields.members.map((id) =>
			people.find((p) => p.id == id)
		);

		// remove leaders from member and call that kids
		family.fields.kids = family.fields.members.filter(
			(m) => !leaderIds.includes(m.id)
		);

		// create a searchIndex for searching in the UI.
		family.searchIndex = [
			...family.fields.members.map((l) => l.fields.firstName.toLowerCase()),
			family.fields.name.toLowerCase(),
			family.fields.address.toLowerCase(),
			family.fields.city.toLowerCase(),
			family.fields.state.toLowerCase(),
			family.fields.zip.toLowerCase(),
			...family.fields.leaders.map((l) => l.fields.email?.toLowerCase()),
			...family.fields.leaders.map((l) => l.fields.phone?.toLowerCase()),
		];
		return family;
	};

	// Sort the families from Airtable by last name
	const sortedFamilies = families.sort((a, b) =>
		a.fields.name.localeCompare(b.fields.name)
	);

	// map over the arry to do some tidying
	const mappedFamilies = sortedFamilies.map(mapPeople);

	// write the file locally so we don't have to keep hitting the airtable API
	fs.writeFileSync('./data/families.json', JSON.stringify(mappedFamilies));
	return mappedFamilies;
};

getFamilies();
export default getFamilies;
