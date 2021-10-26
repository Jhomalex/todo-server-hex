import moduleAlias from 'module-alias';
import path from 'path';

function aliasModule() {
	let src = path.join(__dirname, '..', '..', 'dist');
	const root = path.join(__dirname, '..', '..');

	if (process.env.NODE_ENV == 'test') {
		src = path.join(__dirname, '..', '..', 'src');
	}
	moduleAlias.addAliases({
		'@': src,
		'~': root,
	});
}

aliasModule();
