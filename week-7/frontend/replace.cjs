const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            replaceInDir(fullPath);
        } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('http://localhost:5000')) {
                const newContent = content.replace(/http:\/\/localhost:5000/g, 'https://blogapp-x0mm.onrender.com');
                fs.writeFileSync(fullPath, newContent);
                console.log('Updated ' + fullPath);
            }
        }
    }
}

replaceInDir(path.join(__dirname, 'src'));
console.log('Done.');
