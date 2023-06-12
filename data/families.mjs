import Airtable from '../utils/airtable.js';
import * as fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const airtable = new Airtable(
	process.env.VITE_AIRTABLE_TOKEN,
	process.env.VITE_AIRTABLE_SPACE
);

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
		family.fields.leaders = family.fields.leaders.map((id) =>
			people.find((p) => p.id == id)
		);

		family.fields.members = family.fields.members.map((id) =>
			people.find((p) => p.id == id)
		);

		family.fields.kids = family.fields.members.filter(
			(m) => !leaderIds.includes(m.id)
		);
		return family;
	};
	const sortedFamilies = families.sort((a, b) =>
		a.fields.name.localeCompare(b.fields.name)
	);
	const mappedFamilies = sortedFamilies.map(mapPeople);
	fs.writeFileSync('./data/families.json', JSON.stringify(mappedFamilies));
	return mappedFamilies;
};
getFamilies();
export default getFamilies;
