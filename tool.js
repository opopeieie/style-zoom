const fs = require('fs');
const path = require('path');
const dPath = process.argv[2];
const mu = process.argv[3];
if(!dPath || !mu) {
	throw Error('do not have dirName or mul param!');
}

const regs = ['px', 'em', 'rem', 'pt'];//选择要修改的样式后缀,随便加,
const fileSuffix = ['.css', '.html', '.scss']//选择要修改的文件后缀，随便加,less啥的


const changeCssMultiple = function(filePath, mul) {//mul缩小倍数
	const dirName = path.dirname(filePath);
	if((!fs.statSync(filePath).isFile()) && !fileSuffix.some(item => item === path.extname(filePath))) {
		console.error(`${filePath}is not a css file!!!`);
		return;
	}

	let baseName = '', currentFilePath = '';
	for(let j = 0, len = fileSuffix.length; j < len; j ++) {
		baseName = path.basename(`${filePath}`, fileSuffix[j])
		currentFilePath = `${dirName}/${baseName}`;
	}

	let file = fs.readFileSync(currentFilePath, 'utf8');



	for(let i = 0,len = regs.length; i< len; i ++) {
		file = file.replace(eval("/(([\\-\\+]?\\d*\\.\\d*|\\d))+"+regs[i]+"/gi"),function(item) {
			item = item.trim();
			let num = item.substring(0, item.indexOf(regs[i]));
			num = parseFloat(num);
			if(isNaN(parseFloat(num))) return item;
			num *= mul;
			return `${num}${regs[i]}`
		})
	}

	fs.writeFileSync(currentFilePath, file);
}

const runChange = function(dirPath, mul) {
	const stat = fs.statSync(dirPath)
	if(stat.isDirectory()) {
		const files = fs.readdirSync(dirPath);
		for(const i in files) {
			const realPath = `${dirPath}/${files[i]}`;
			if(fileSuffix.some(item => item === path.extname(realPath))){
				changeCssMultiple(realPath, mul);
			}else {
				if(fs.statSync(realPath).isDirectory()) {
					runChange(realPath, mul);
				} else {
					console.error(`${realPath} is not a html or css file~`);
				}
			}
		}
	}
}

runChange(dPath, mu);
