import { ROOT_DIR } from './constants';
import moduleAlias from 'module-alias';

moduleAlias.addAliases({
  '$': `${ROOT_DIR}/src`,
  '~': `${ROOT_DIR}/src/modules`,
});
