import TinyXLSX from './src/index.js';
import tap from 'tap';
import XLSX from 'xlsx';
import fs from 'fs';

let data1 = [
	{ title: 'Test1' , data: [
		['foo', 'bar'], ['noo', 'bar'], [9],
		[1, 2, 3],
		[3, 4]] },
	{ title: 'Boo?' , data: [[1, 2], [3, 4]] },
	{ title: 'Another sheet', data: [[1, 2], ['Total', 4]]  }
];

let data2 = [
	{ title: 'blah', data: [[1, 2, 3]] }
];

let loadXLSX = filename => {
	let workbook = XLSX.readFile(filename);
	return workbook.SheetNames.map(title => ({
		title,
		data: XLSX.utils.sheet_to_json(workbook.Sheets[title], { header: 1 })
	}));
};

tap.test('it should generate a valid spreadsheet', async t => {
	for (let data of [data1, data2]) {
		let result = TinyXLSX.generate(data);
		fs.writeFileSync('tmp.xlsx', result);
		let worksheets = loadXLSX('tmp.xlsx');
		t.match(data, worksheets);
		fs.unlinkSync('tmp.xlsx');
	}
});
