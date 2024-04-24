import tap from 'tap';
import XLSX from 'xlsx';
import fs from 'node:fs';
import { generate } from './src/index.ts';

const data1 = [
  { title: 'Test1', data: [['foo', 'bar'], ['noo', 'bar'], [9], [1, 2, 3], [3, 4]] },
  {
    title: 'Boo?',
    data: [
      [1, 2],
      [3, 4],
    ],
  },
  {
    title: 'Another sheet',
    data: [
      [1, 2],
      ['Total', 4],
    ],
  },
];

const data2 = [{ title: 'blah', data: [[1, 2, 3]] }];

const loadXLSX = (filename: string) => {
  const workbook = XLSX.readFile(filename);
  return workbook.SheetNames.map((title) => ({
    title,
    data: XLSX.utils.sheet_to_json(workbook.Sheets[title], { header: 1 }),
  }));
};

tap.test('it should generate a valid spreadsheet', (t) => {
  for (const data of [data1, data2]) {
    const result = generate(data);
    fs.writeFileSync('tmp.xlsx', result);
    const worksheets = loadXLSX('tmp.xlsx');
    t.match(data, worksheets);
    fs.unlinkSync('tmp.xlsx');
  }

  t.end();
});
