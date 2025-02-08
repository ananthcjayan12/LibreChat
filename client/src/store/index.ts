import * as artifacts from './artifacts';
import submission from './submission';
import isTemporary from './temporary';
import endpoints from './endpoints';
import families from './families';
import settings from './settings';
import prompts from './prompts';
import lang from './language';
import preset from './preset';
import search from './search';
import toast from './toast';
import misc from './misc';
import text from './text';
import user from './user';
export default {
  ...artifacts,
  ...families,
  ...endpoints,
  ...user,
  ...text,
  ...toast,
  ...submission,
  ...search,
  ...prompts,
  ...preset,
  ...lang,
  ...settings,
  ...misc,
  ...isTemporary,
};
