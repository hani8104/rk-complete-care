const fs = require('fs');
let code = fs.readFileSync('client/src/pages/Admin.jsx', 'utf8');

// Remove the orphaned )\r\n}\r\n at lines 1068-1069 (before </div > </main >)
// The pattern is: "}\r\n)\r\n}\r\n                </div >"
// From the file: line 1067 = "}", line 1068 = ")", line 1069 = "}", line 1070 = "                </div >"

const orphan = '}\r\n)\r\n}\r\n                </div >\r\n            </main >';
const fixed = '}\r\n                </div >\r\n            </main >';

if (!code.includes(orphan)) {
    console.error('Pattern not found, trying alternate...');
    // Show what's around </div >
    const idx = code.indexOf('</div >\r\n            </main >');
    console.log('Context:', JSON.stringify(code.substring(idx - 40, idx + 30)));
    process.exit(1);
}

code = code.replace(orphan, fixed);

// Also fix the settings tab - it's missing its closing ) }
// Line 877 has just whitespace before the Patient Stories tab
const badClose = '        </form>\r\n    \r\n\r\n{/* Patient Stories Tab */}';
const goodClose = '        </form>\r\n    )\r\n}\r\n\r\n{/* Patient Stories Tab */}';

if (!code.includes(badClose)) {
    console.error('Bad close not found');
    const idx = code.indexOf('{/* Patient Stories Tab */}');
    console.log('Context before stories tab:', JSON.stringify(code.substring(idx - 60, idx)));
    process.exit(1);
}

code = code.replace(badClose, goodClose);
fs.writeFileSync('client/src/pages/Admin.jsx', code, 'utf8');
console.log('Done! Lines:', code.split('\n').length);
